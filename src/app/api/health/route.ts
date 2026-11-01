import {database} from '@/lib/database';
export const dynamic='force-dynamic';
export async function GET(){if(!process.env.DATABASE_URL)return Response.json({status:'unavailable'},{status:503}); const db=database(process.env.DATABASE_URL);try{await db.siteSetting.count();return Response.json({status:'ok',intakeEnabled:false},{headers:{'Cache-Control':'private, no-store'}})}catch{return Response.json({status:'unavailable'},{status:503})}finally{await db.$disconnect()}}
