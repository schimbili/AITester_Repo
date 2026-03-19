// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests', // Points to our new VWO tests folder
  timeout: 30000,
  retries: 0,
  workers: 1,

  use: {
    baseURL: 'https://app.vwo.com',
    headless: true, // Headless by default
    screenshot: 'on', // Take screenshots for all tests to provide evidence
    trace: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
});
