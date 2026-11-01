import 'dotenv/config';
import {database,localUrl} from '../src/lib/database';
async function main(){
 if(!process.argv.includes('--check'))throw Error('Доставка уведомлений будет реализована на этапе 3.');
 if(process.env.APP_ENV==='production')throw Error('Local check forbidden in production');
 const db=database(localUrl(process.env.DATABASE_URL,'site152_dev'));
 try{await db.notificationJob.count();console.log('Схема очереди доступна; письма не отправлены.')}finally{await db.$disconnect()}
}
main().catch((e:unknown)=>{console.error(e instanceof Error?e.message:'Ошибка проверки worker');process.exitCode=1});
