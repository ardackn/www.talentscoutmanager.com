const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('https://readdy.cc/preview/c2013886-bbb8-447b-96ce-6112c99a26ca/7764356/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'readdy_screenshot.png', fullPage: true });
  await browser.close();
})();
