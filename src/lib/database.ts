import {PrismaPg} from '@prisma/adapter-pg';
import {PrismaClient} from '../generated/prisma/client';
export function database(url:string){return new PrismaClient({adapter:new PrismaPg({connectionString:url,max:5,connectionTimeoutMillis:3000}),log:[]})}
export function localUrl(raw:string|undefined,name:'site152_dev'|'site152_test'){
  if(!raw) throw Error('Database URL missing');
  const u=new URL(raw);
  if(!['postgres:','postgresql:'].includes(u.protocol)||!['127.0.0.1','localhost','[::1]'].includes(u.hostname)||u.pathname!==`/${name}`||[...u.searchParams.keys()].some(k=>k!=='schema')||(u.searchParams.has('schema')&&u.searchParams.get('schema')!=='public')) throw Error('Unsafe database URL');
  return raw;
}
