const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class FormPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async createForm(name) {
    await this.page.getByRole('heading', { name: 'Automation' })
      .getByLabel('Create').click();
    await this.page.getByRole('button', { name: 'Form' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page.getByRole('button', { name: 'Create & edit' }).click();
    await this.page.waitForTimeout(2000);
    console.log(`✅ Form "${name}" created`);
  }

  async drag(source, target) {
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
    if (!sourceBox || !targetBox) throw new Error('Element not visible for drag');
    await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 25 });
    await this.page.mouse.up();
  }

  async dragAndDropElements() {
    const frame = this.page.frameLocator('iframe');
    const textBox = frame.getByRole('button', { name: /Text Box/i });
    const fileUpload = frame.getByRole('button', { name: /select file|file upload/i });
    const canvas = frame.locator('[class*="canvas"]').first();
    await expect(textBox).toBeVisible({ timeout: 10000 });
    await expect(fileUpload).toBeVisible({ timeout: 10000 });
    await expect(canvas).toBeVisible({ timeout: 15000 });
    await this.drag(textBox, canvas);
    console.log('✅ Textbox dragged to canvas');
    await this.drag(fileUpload, canvas);
    console.log('✅ File Upload dragged to canvas');
  }

  async saveForm() {
    const frame = this.page.frameLocator('iframe');
    const saveBtn = frame.locator('button').filter({ hasText: /^Save$/ }).first();
    await expect(saveBtn).toBeVisible({ timeout: 10000 });
    await saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Form saved');
  }

  async fillTextboxInRunningForm(text) {
    await this.page.screenshot({ path: 'test-results/running-form.png' });
    console.log('Current URL:', this.page.url());
    const textbox = this.page.locator('input[type="text"], textarea').first();
    await expect(textbox).toBeVisible({ timeout: 15000 });
    await textbox.fill(text);
    console.log(`✅ Textbox filled with: ${text}`);
  }


  async uploadFileInRunningForm() {
    // Pause here for manual file upload
    console.log('⏸️ MANUAL STEP: Please upload the file manually, then resume');
    await this.page.pause();
    console.log('✅ Manual file upload done - resumed');
  }

  async submitRunningForm() {
    const submitBtn = this.page.getByRole('button', { name: /submit/i });
    await expect(submitBtn).toBeVisible({ timeout: 10000 });
    await submitBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Form submitted');
  }

  async verifyFormSubmitted() {
    const success = this.page.locator('text=/success|completed|submitted/i').first();
    await expect(success).toBeVisible({ timeout: 15000 });
    console.log('✅ Form submission verified');
  }
}

module.exports = { FormPage };







