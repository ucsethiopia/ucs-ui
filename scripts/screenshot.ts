import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:3000");
await page.screenshot({ path: "screenshots/dashboard.png", fullPage: false });
await browser.close();
