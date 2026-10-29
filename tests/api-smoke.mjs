import assert from 'node:assert/strict';
import {lessons} from '../app/lessons.ts';
assert.equal(lessons.length,6);
for(const l of lessons){assert.equal(l.questions.length,2);assert(l.short&&l.example&&l.thought);for(const q of l.questions){assert.equal(q.options.length,4);assert(q.correct>=0&&q.correct<4);assert(q.why)}}
const base='http://127.0.0.1:5173';
async function request(method,body,auth={},expected=200){const r=await fetch(base+'/api/classroom',{method,headers:{Origin:base,'Content-Type':'application/json',...auth},...(body?{body:JSON.stringify(body)}:{})});const d=await r.json();assert.equal(r.status,expected,JSON.stringify(d));return d;}
const teacher={Cookie:'__sites_local_auth=1'};
await request('GET',null,{},401);
await request('POST',{action:'create',title:'unauthorized'}, {},401);
const c=await request('POST',{action:'create',title:'Disposable API test'},teacher);
try{
 const s=await request('POST',{action:'join',code:c.code,number:1,name:'Test Student'});
 await request('POST',{action:'join',code:c.code,number:1,name:'Duplicate'}, {},409);
 const auth={Authorization:'Bearer '+s.token};
 await request('POST',{action:'submit',lesson:0,data:{}},auth,400);
 const answer={answers:[1,3],short:'A',thought:'B',practice:'',first:{answers:[0,0],short:'Original'}};
 await request('POST',{action:'submit',lesson:0,data:answer},auth);
 let r=await fetch(base+'/api/classroom?classId='+c.id,{headers:teacher});let detail=await r.json();
 assert.equal(detail.students.length,1);assert.equal(detail.submissions.length,1);
 assert.equal(JSON.parse(detail.submissions[0].data).first.short,'Original');
 r=await fetch(base+'/api/classroom?classId='+c.id);assert.equal(r.status,401);
 await request('POST',{action:'toggle',classId:c.id,open:false},teacher);
 await request('POST',{action:'submit',lesson:1,data:answer},auth,400);
 await request('POST',{action:'join',code:c.code,number:2,name:'Closed'}, {},400);
 await request('POST',{action:'toggle',classId:c.id,open:true},teacher);
 const reset=await request('POST',{action:'reset',classId:c.id,studentId:detail.students[0].id},teacher);
 await request('POST',{action:'submit',lesson:1,data:answer},auth,401);
 const restored=await fetch(base+'/api/classroom?mode=student',{headers:{Authorization:'Bearer '+reset.recovery}});const data=await restored.json();assert.equal(data.submissions.length,1);assert.equal(data.student.number,1);
 await request('POST',{action:'submit',lesson:0,data:{...answer,short:'Updated'}},{Authorization:'Bearer '+reset.recovery});
 r=await fetch(base+'/api/classroom?classId='+c.id,{headers:teacher});detail=await r.json();assert.equal(detail.submissions.length,1);assert.equal(JSON.parse(detail.submissions[0].data).short,'Updated');
 const bad=await fetch(base+'/api/classroom',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json',...teacher},body:JSON.stringify({action:'delete',classId:c.id})});assert.equal(bad.status,403);
 console.log('PASS: 6 lesson contracts; authentication; class creation; join; duplicate prevention; validation; submission; teacher read; closure; token recovery; update; origin protection');
}finally{await request('POST',{action:'delete',classId:c.id},teacher);}

