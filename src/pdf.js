// Extracts text from PDFs. Text-based pages use pdf.js; scanned/image pages
// automatically fall back to OCR (Tesseract.js, English + Hindi).
let pdfjsPromise;
async function loadPdfjs(){
 if(!pdfjsPromise)pdfjsPromise=import('pdfjs-dist').then(p=>{p.GlobalWorkerOptions.workerSrc=new URL('pdfjs-dist/build/pdf.worker.min.mjs',import.meta.url).toString();return p});
 return pdfjsPromise;
}
let workerPromise;
async function ocrWorker(onProgress){
 if(!workerPromise)workerPromise=import('tesseract.js').then(({createWorker})=>createWorker(['eng','hin'],1,{logger:m=>m.status==='recognizing text'&&onProgress?.(m.progress)}));
 return workerPromise;
}
function pageText(items){let text='',lastY=null;for(const item of items){if(!('str' in item))continue;const y=item.transform[5];if(lastY!==null&&Math.abs(lastY-y)>3)text+='\n';text+=item.str+(item.hasEOL?'\n':' ');lastY=y}return text}
async function ocrCanvas(canvas,onProgress){const w=await ocrWorker(onProgress);const {data}=await w.recognize(canvas);return data.text}
export async function ocrImage(file,onStatus){if(!file.type.startsWith('image/'))throw Error('Choose an image file.');onStatus?.('Running OCR on image…');const w=await ocrWorker(p=>onStatus?.(`OCR ${Math.round(p*100)}%`));const {data}=await w.recognize(file);return data.text}
export async function pdfText(file,onStatus=()=>{},forceOcr=false){
 if(!file)throw Error('Choose a PDF file.');
 if(file.type.startsWith('image/'))return ocrImage(file,onStatus);
 if(file.type!=='application/pdf'&&!/\.pdf$/i.test(file.name))throw Error('Choose a PDF or image file.');
 if(file.size>25*1024*1024)throw Error('PDF must be smaller than 25 MB.');
 const pdfjs=await loadPdfjs();
 const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
 try{
  if(pdf.numPages>100)throw Error('Please use a PDF of 100 pages or fewer.');
  let text='';
  for(let n=1;n<=pdf.numPages;n++){
   onStatus(`Reading page ${n}/${pdf.numPages}…`);
   const page=await pdf.getPage(n);
   let t=forceOcr?'':pageText((await page.getTextContent()).items);
   if(t.replace(/\s/g,'').length<20){ // scanned page → OCR
    const viewport=page.getViewport({scale:2.2});
    const canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
    await page.render({canvasContext:ctx,viewport}).promise;
    t=await ocrCanvas(canvas,p=>onStatus(`OCR page ${n}/${pdf.numPages} · ${Math.round(p*100)}%`));
    canvas.width=canvas.height=0;
   }
   text+=t+'\n';
  }
  if(text.trim().length<5)throw Error('No readable text found, even with OCR. Please type questions manually.');
  return cleanOcr(text);
 }finally{await pdf.destroy()}
}
// Normalise common OCR quirks so the question parser understands them.
export function cleanOcr(t){return t.replace(/\r/g,'').replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/^\s*\(([A-Da-d1-4])\)\s*/gm,'$1) ').replace(/^\s*([A-Da-d])\s*[.:]\s+/gm,'$1) ').replace(/^\s*Q\.?\s*(\d+)\s*[.):-]?\s*/gim,'$1. ').replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n')}
