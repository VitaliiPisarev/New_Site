import 'dotenv/config';
import pg from 'pg';
import {spawnSync} from 'node:child_process';
import {localUrl} from '../src/lib/database';
async function main(){
 if(process.env.APP_ENV==='production') throw Error('Development migration is prohibited in production');
 const dev=localUrl(process.env.DATABASE_URL,'site152_dev');
 const test=localUrl(process.env.TEST_DATABASE_URL,'site152_test');
 const u=new URL(dev);u.pathname='/postgres';
 const client=new pg.Client({connectionString:u.toString()});await client.connect();
 try{const found=await client.query('SELECT 1 FROM pg_database WHERE datname=$1',['site152_test']);if(!found.rowCount)await client.query('CREATE DATABASE "site152_test"')}finally{await client.end()}
 for(const url of [dev,test]){const result=spawnSync('node_modules/.bin/prisma',['migrate','deploy'],{stdio:'inherit',env:{...process.env,DATABASE_URL:url}});if(result.status!==0)throw Error('Migration failed')}
}
main().catch(()=>{console.error('Local database setup failed');process.exitCode=1});
