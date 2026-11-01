import {test,expect} from '@playwright/test';
test('page renders and intake is closed',async({page,request})=>{await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('152-ФЗ');expect((await request.get('/api/health')).status()).toBe(200);expect((await request.post('/api/requests')).status()).toBe(503)});
