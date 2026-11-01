import {existsSync} from 'node:fs';
import {defineConfig,devices} from '@playwright/test';
export default defineConfig({testDir:'./tests/e2e',use:{baseURL:'http://127.0.0.1:3100',...devices['Desktop Chrome'],launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE??(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined)}},webServer:{command:'npm run start -- --port 3100',url:'http://127.0.0.1:3100/api/health',reuseExistingServer:false,timeout:60000}});
