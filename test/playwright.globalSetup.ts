import { chromium } from '@playwright/test';

require('dotenv').config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.context().addCookies([
    {
      name: 'sanitySession',
      value: process.env.SANITY_PLAYWRIGHT_TEST_TOKEN,
      secure: true,
      path: '/',
      httpOnly: true,
      sameSite: 'None',
      domain: `.${process.env.SANITY_PROJECT_ID}.api.sanity.io`,
    },
  ]);

  await page.context().storageState({ path: 'state.json' });
  await browser.close();
}

export default globalSetup;
