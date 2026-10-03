export const defaultSettings = {
  brand:'Sure60', tagline:'A little guidance. A big future.', logo_url:'', hero_image:'/students.jpg',
  address:'Karnal Campus, Karnal, Haryana', phone:'', email:'', instagram:'', youtube:'', facebook:'', telegram:'',
  announcement:'A fresh start. A focused you. Explore our new learning batches.', admin_enabled:true,
  hero_slides:[
    {eyebrow:'BIG DREAMS. THE RIGHT DIRECTION.',title:'Your ambition.\nOur guidance.',highlight:'Your success.',description:'Build your tomorrow with focused classes, smarter practice, and mentors who believe in you. Your next chapter starts at Sure60.'},
    {eyebrow:'PREPARE BETTER. GO FURTHER.',title:'Small steps.\nConsistent effort.',highlight:'Bigger results.',description:'Turn practice into progress. Challenge yourself with timed mock tests and see exactly where you stand.'},
    {eyebrow:'YOUR CLASSROOM. ANYWHERE.',title:'Learn your way.\nAt your pace.',highlight:'Every day.',description:'Subject-wise video lessons and helpful study notes, all together in your own learning space.'}
  ]
};
export const demoBatches=[
  {id:'ssc',name:'SSC Complete Foundation',category:'SSC Exams',subtitle:'One strong foundation. Every SSC opportunity.',description:'Build your concepts for CGL, CHSL and MTS with structured lessons and guided practice.',subjects:['Quantitative Aptitude','Reasoning','English','General Awareness'],badge:'POPULAR CHOICE',color:'peach',icon:'target',format:'Live + Recorded',language:'Hindi + English',image_url:'',enabled:true},
  {id:'cet',name:'Haryana CET Foundation',category:'State Exams',subtitle:'Your state. Your dream. Your preparation.',description:'A focused preparation path for Haryana CET with Haryana GK, reasoning and more.',subjects:['Haryana GK','Mathematics','Reasoning','Hindi'],badge:'NEW BATCH',color:'mint',icon:'landmark',format:'Live + Recorded',language:'Hindi + English',image_url:'',enabled:true},
  {id:'bank',name:'Banking & Insurance',category:'Banking',subtitle:'Get ready for your next big opportunity.',description:'Prepare for banking and insurance exams with clear concepts and regular practice.',subjects:['Quantitative Aptitude','Reasoning','English','Banking Awareness'],badge:'BUILD YOUR FUTURE',color:'lavender',icon:'building',format:'Recorded Classes',language:'Hindi + English',image_url:'',enabled:true}
];
export const demoTests=[
  {id:'weekly',title:'All India Open Mock Test',category:'SSC & Banking',duration_minutes:10,total_questions:5,marks_per_question:2,negative_marks:0.5,enabled:true,description:'A small challenge. A step closer to your goal.',label:'FREE MOCK TEST'},
  {id:'cet-test',title:'Haryana CET • Practice Sprint',category:'Haryana CET',duration_minutes:5,total_questions:5,marks_per_question:1,negative_marks:0,enabled:true,description:'Test your basics and find your focus.',label:'PRACTICE TEST'}
];
export const demoQuestions=[
 {id:'q1',position:1,question:'If a number is increased by 20% and then decreased by 20%, what is the net percentage change?',options:['No change','4% decrease','4% increase','2% decrease'],answer:1},
 {id:'q2',position:2,question:'Which city is the administrative capital of Haryana?',options:['Karnal','Gurugram','Chandigarh','Faridabad'],answer:2},
 {id:'q3',position:3,question:'Find the next number in the series: 2, 6, 12, 20, 30, ?',options:['40','42','44','48'],answer:1},
 {id:'q4',position:4,question:'Choose the synonym of “Diligent”.',options:['Careless','Hardworking','Indifferent','Impatient'],answer:1},
 {id:'q5',position:5,question:'A train travels 180 km in 3 hours. What is its average speed?',options:['50 km/h','55 km/h','60 km/h','65 km/h'],answer:2}
];
export const demoLessons=[
 {id:'l1',batch_id:'ssc',subject:'Quantitative Aptitude',title:'Percentages — build your basics',topic:'Foundation • Lesson 01',duration:'32 min',youtube_url:'',pdf_url:'',position:1},
 {id:'l2',batch_id:'ssc',subject:'Reasoning',title:'Number series and patterns',topic:'Logical Reasoning • Lesson 01',duration:'28 min',youtube_url:'',pdf_url:'',position:2},
 {id:'l3',batch_id:'cet',subject:'Haryana GK',title:'An introduction to Haryana',topic:'State GK • Lesson 01',duration:'35 min',youtube_url:'',pdf_url:'',position:1}
];
export const demoRanks=[{rank:1,name:'Ananya Sharma',username:'S60-1024',right_count:5,wrong_count:0,score:10},{rank:2,name:'Rahul Verma',username:'S60-1042',right_count:4,wrong_count:1,score:7.5},{rank:3,name:'Priya Singh',username:'S60-1086',right_count:3,wrong_count:1,score:5.5}];
