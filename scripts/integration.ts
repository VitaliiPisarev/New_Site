import 'dotenv/config';
import {randomUUID,createHash} from 'node:crypto';
import {database,localUrl} from '../src/lib/database';
async function main(){if(process.env.APP_ENV==='production')throw Error('Production tests forbidden');const db=database(localUrl(process.env.TEST_DATABASE_URL,'site152_test'));const token=randomUUID();try{
 const data={websiteUrl:'https://example.test',contactMethod:'email',contact:'fictional@example.test',serviceCode:'general',formId:'test',sourcePage:'/',attemptToken:token,payloadHash:createHash('sha256').update('test').digest('hex')};
 const results=await Promise.allSettled([db.request.create({data}),db.request.create({data})]);
 if(results.filter(r=>r.status==='fulfilled').length!==1||await db.request.count({where:{attemptToken:token}})!==1)throw Error('Uniqueness check failed');
 await db.request.deleteMany({where:{attemptToken:token}});console.log('PostgreSQL concurrent attempt uniqueness passed');
}finally{await db.$disconnect()}}
main().catch(()=>{console.error('Integration test failed');process.exitCode=1});
