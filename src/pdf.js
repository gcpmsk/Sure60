export async function pdfText(file){
 if(!file||file.type!=='application/pdf')throw Error('Choose a PDF file.');
 if(file.size>15*1024*1024)throw Error('PDF must be smaller than 15 MB.');
 const pdfjs=await import('pdfjs-dist');
 pdfjs.GlobalWorkerOptions.workerSrc=new URL('pdfjs-dist/build/pdf.worker.min.mjs',import.meta.url).toString();
 const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
 try{if(pdf.numPages>100)throw Error('Please use a PDF of 100 pages or fewer.');let text='';for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n);const {items}=await page.getTextContent();let lastY=null;for(const item of items){if(!('str' in item))continue;const y=item.transform[5];if(lastY!==null&&Math.abs(lastY-y)>3)text+='\n';text+=item.str+(item.hasEOL?'\n':' ');lastY=y;}text+='\n'}if(text.trim().length<5)throw Error('This PDF contains scanned images. Run OCR first, or paste/type questions manually.');return text;}finally{await pdf.destroy()}
}
