const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
});
module.exports = defineConfig({
  // ... your existing config ...
  use: {
    browserName: 'chromium',
    launchOptions: {
      args: ['--disable-notifications', '--disable-popup-blocking'],
    },
    permissions: ['notifications'],
    contextOptions: {
      permissions: ['clipboard-read', 'clipboard-write'],
    },
  },
});