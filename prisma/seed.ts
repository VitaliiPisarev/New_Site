import 'dotenv/config';
import {createHash} from 'node:crypto';
import {database,localUrl} from '../src/lib/database';
import {DocumentType} from '../src/generated/prisma/enums';
async function main(){if(process.env.APP_ENV==='production')throw Error('Production seed forbidden');const db=database(localUrl(process.env.DATABASE_URL,'site152_dev'));try{
await db.siteSetting.upsert({where:{key:'site'},update:{},create:{key:'site',value:{title:'Черновик сайта по 152-ФЗ',draft:true}}});
for(const [code,title] of [['audit','Аудит'],['site','Сайт'],['rkn','Сайт и РКН']])await db.servicePackage.upsert({where:{code},update:{},create:{code,title,content:{draft:true}}});
for(const type of [DocumentType.PRIVACY,DocumentType.CONSENT,DocumentType.COOKIES]){const text=`Учебный черновик ${type}. Не утверждён.`;await db.documentVersion.upsert({where:{type_version:{type,version:'draft-1'}},update:{},create:{type,version:'draft-1',ownerLabel:'Учебный оператор',text,contentHash:createHash('sha256').update(text).digest('hex')}})}
console.log('Draft data prepared');}finally{await db.$disconnect()}}
main().catch(()=>{console.error('Seed failed');process.exitCode=1});
