import 'dotenv/config';
import {database,localUrl} from '../src/lib/database';
async function main(){if(process.env.APP_ENV==='production')throw Error('Local checks forbidden in production');for(const [name,url] of [['site152_dev',process.env.DATABASE_URL],['site152_test',process.env.TEST_DATABASE_URL]] as const){const db=database(localUrl(url,name));try{await db.siteSetting.count();console.log(`${name}: schema available`)}finally{await db.$disconnect()}}}
main().catch(()=>{console.error('Database check failed');process.exitCode=1});
