import { randomBytes } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';
if (existsSync('.env')) { console.log('Existing .env preserved'); } else {
  const pass=randomBytes(24).toString('hex');
  const secret=randomBytes(32).toString('hex');
  writeFileSync('.env',`APP_ENV=development\nPOSTGRES_USER=site152\nPOSTGRES_PASSWORD=${pass}\nDATABASE_URL=postgresql://site152:${pass}@127.0.0.1:54329/site152_dev?schema=public\nTEST_DATABASE_URL=postgresql://site152:${pass}@127.0.0.1:54329/site152_test?schema=public\nBETTER_AUTH_SECRET=${secret}\nSMTP_HOST=127.0.0.1\nSMTP_PORT=1025\nREAL_REQUESTS_ENABLED=false\nINFRASTRUCTURE_APPROVED=false\nNEXT_TELEMETRY_DISABLED=1\n`,{mode:0o600,flag:'wx'});
  console.log('Local configuration created');
}
