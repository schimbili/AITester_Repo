// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('VWO Negative Login Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to VWO login page before each test
    await page.goto('https://app.vwo.com/#/login');
  });

  test('TC-001: Login with Empty Credentials', async ({ page }) => {
    // Click Sign In with both fields blank
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Verify the central error message is visible
    const errorMsg = page.locator('.js-notification-box-container');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Your email, password, IP address or location did not match');
  });

  test('TC-002: Login with Chinese Characters', async ({ page }) => {
    // Fill with Chinese characters
    await page.getByRole('textbox', { name: 'Email address' }).fill('测试账号@vwo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('我的密码123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Verify error and potential reCAPTCHA indicator (just checking error for now)
    const errorMsg = page.locator('.js-notification-box-container');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Your email, password, IP address or location did not match');
  });

  test('TC-003: Login with Arabic Characters (RTL)', async ({ page }) => {
    // Fill with Arabic characters
    await page.getByRole('textbox', { name: 'Email address' }).fill('مستخدم@vwo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('كلمة_السر');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Verify error
    const errorMsg = page.locator('.js-notification-box-container');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Your email, password, IP address or location did not match');
  });

  test('TC-004: Login with SQL Injection Snippets', async ({ page }) => {
    // Fill with injection snippets
    await page.getByRole('textbox', { name: 'Email address' }).fill('invalid-user-!@#$%.com');
    await page.getByRole('textbox', { name: 'Password' }).fill("admin' OR 1=1;--");
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Application should not log in and should reject the input safely
    const errorMsg = page.locator('.js-notification-box-container');
    await expect(errorMsg).toBeVisible();
  });

  test('TC-005: Login with Spanish Characters', async ({ page }) => {
    // Fill with Spanish accented characters
    await page.getByRole('textbox', { name: 'Email address' }).fill('niño.español@vwo.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('contraseña_segura_123');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Verify error
    const errorMsg = page.locator('.js-notification-box-container');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Your email, password, IP address or location did not match');
  });

});
