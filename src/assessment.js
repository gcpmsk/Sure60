// Text PDF import deliberately supports a predictable, reviewable format.
export function parseQuestions(text){
 const normalized=text.replace(/\r/g,'').replace(/\u00a0/g,' ');
 const blocks=normalized.split(/(?:^|\n)\s*(?:Q\s*)?(\d+)\s*[.)]\s+/i);
 const questions=[];
 for(let i=1;i<blocks.length;i+=2){
  const position=Number(blocks[i]);const content=blocks[i+1]||'';
  const segments=content.split(/(?:^|\n)\s*\(?([A-Da-d])\s*[.)]\s*/);
  if(segments.length!==9)throw Error(`Question ${position}: expected exactly four options A), B), C), D), each on its own line.`);
  const options=[];for(let j=1;j<segments.length;j+=2){if(segments[j].toUpperCase()!=='ABCD'[options.length])throw Error(`Question ${position}: options must be A, B, C, D in order.`);options.push(segments[j+1].trim())}
  if(!segments[0].trim()||options.some(o=>!o))throw Error(`Question ${position}: text and all options are required.`);
  questions.push({position,question:segments[0].trim(),options});
 }
 if(!questions.length)throw Error('No formatted questions found. Use a text-based PDF or paste the supported format. Scanned images require OCR first.');
 if(new Set(questions.map(q=>q.position)).size!==questions.length)throw Error('Duplicate question numbers found.');
 return questions;
}
export function parseAnswers(text){const answers={};for(const m of text.matchAll(/(?:^|[\s,;])(?:Q\s*)?(\d+)\s*[.\-):=]\s*([A-D])(?=$|[\s,;])/gi)){if(Object.hasOwn(answers,m[1]))throw Error(`Duplicate answer for question ${m[1]}.`);answers[Number(m[1])]='ABCD'.indexOf(m[2].toUpperCase())}if(!Object.keys(answers).length)throw Error('No answers found. Use one answer per line, e.g. 1. B');return answers;}
export function validateAssessment(questions,answers){if(questions.length<1||questions.length>300)throw Error('A test must contain 1–300 questions.');for(const q of questions)if(!Number.isInteger(answers[q.position])||answers[q.position]<0||answers[q.position]>3)throw Error(`Missing answer for question ${q.position}.`);if(Object.keys(answers).length!==questions.length)throw Error('Question count and answer count must match.');return true;}
export function grade(questions,answers,correct,marks,negative){let right_count=0,wrong_count=0;for(const q of questions){if(!Object.hasOwn(answers,q.id))continue;if(answers[q.id]===correct[q.position])right_count++;else wrong_count++;}return {right_count,wrong_count,score:right_count*marks-wrong_count*negative,unanswered:questions.length-right_count-wrong_count};}
