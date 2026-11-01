import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/audit/",
  "/site/",
  "/rkn/",
  "/about/",
  "/faq/",
  "/contacts/",
  "/demo/",
  "/privacy/",
  "/consent/",
  "/cookies/",
];
test("all public pages render and unknown page returns 404", async ({
  page,
}) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  const response = await page.goto("/not-a-real-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "На главную" })).toBeVisible();
});
test("form validates and never reports a false success", async ({ page }) => {
  await page.goto("/contacts/");
  await page.getByRole("button", { name: "Отправить запрос" }).click();
  await expect(
    page.getByText("Укажите корректный домен или адрес сайта без пароля."),
  ).toBeVisible();
  await expect(page.locator('[name="website"]')).toBeFocused();
  await page.locator('[name="website"]').fill("пример.рф");
  await page.locator('[name="contact"]').fill("test@example.test");
  await page.locator('[name="consent"]').check();
  await page.getByRole("button", { name: "Отправить запрос" }).click();
  await expect(
    page.getByText(
      "Приём обращений пока не подключён. Данные не отправлены и не сохранены.",
    ),
  ).toBeVisible();
  await expect(page.locator('[name="website"]')).toHaveValue("пример.рф");
});
test("demo stays separate and sends no request", async ({ page }) => {
  let submissions = 0;
  page.on("request", (req) => {
    if (req.url().includes("/api/requests")) submissions++;
  });
  await page.goto("/demo/");
  const before = await page.evaluate(() => JSON.stringify(localStorage));
  await page.getByRole("button", { name: "Разрешить", exact: true }).click();
  await page.getByRole("button", { name: "Показать действие" }).click();
  await expect(
    page.getByText("Это учебный пример. Заявка не отправлена."),
  ).toBeVisible();
  expect(await page.evaluate(() => JSON.stringify(localStorage))).toBe(before);
  expect(submissions).toBe(0);
});
test("mobile menu closes on Escape and layouts fit the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const button = page.locator(".menu-toggle");
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `viewport ${width}`,
    ).toBeTruthy();
  }
});
test("without JavaScript pages remain readable and form does not put values in the URL", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto("http://127.0.0.1:3100/contacts/");
  await expect(
    page
      .getByRole("navigation", { name: "Основная навигация" })
      .getByRole("link", { name: "FAQ" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByText("Для проверки формы нужен JavaScript.", { exact: false }),
  ).toBeVisible();
  await page.locator('[name="website"]').fill("example.test");
  await Promise.all([
    page.waitForURL("**/api/requests"),
    page.getByRole("button", { name: "Отправить запрос" }).click(),
  ]);
  expect(new URL(page.url()).search).toBe("");
  await context.close();
});

test("main page remains within viewport at 200% zoom", async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => {
      document.body.style.zoom = "2";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `zoom viewport ${width}`,
    ).toBeTruthy();
  }
});

test('decorative motion respects reduced-motion preference', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-art')).toHaveCSS('animation-name', 'card-float');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-art')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.hero-tag .dot')).toHaveCSS('animation-name', 'none');
});
