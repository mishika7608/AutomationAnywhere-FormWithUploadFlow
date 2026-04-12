const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class LoginPage extends BasePage{

  constructor(page) {
    super(page);
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Log in' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}

module.exports = { LoginPage };