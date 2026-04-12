# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\form-upload.spec.js >> Use Case 2 - Form Creation with Upload Flow
- Location: tests\form-upload.spec.js:12:1

# Error details

```
Error: expect.toBeVisible: Target page, context or browser has been closed
```

# Test source

```ts
  1   | const { expect } = require('@playwright/test');
  2   | const { BasePage } = require('./base.page');
  3   | 
  4   | class FormPage extends BasePage {
  5   |   constructor(page) {
  6   |     super(page);
  7   |   }
  8   | 
  9   |   async createForm(name) {
  10  |     await this.page.getByRole('heading', { name: 'Automation' })
  11  |       .getByLabel('Create').click();
  12  |     await this.page.getByRole('button', { name: 'Form' }).click();
  13  |     await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
  14  |     await this.page.getByRole('button', { name: 'Create & edit' }).click();
  15  |     await this.page.waitForTimeout(2000);
  16  |     console.log(`✅ Form "${name}" created`);
  17  |   }
  18  | 
  19  |   async drag(source, target) {
  20  |     const sourceBox = await source.boundingBox();
  21  |     const targetBox = await target.boundingBox();
  22  |     if (!sourceBox || !targetBox) throw new Error('Element not visible for drag');
  23  |     await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  24  |     await this.page.mouse.down();
  25  |     await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 25 });
  26  |     await this.page.mouse.up();
  27  |   }
  28  | 
  29  |   async dragAndDropElements() {
  30  |     const frame = this.page.frameLocator('iframe');
  31  |     const textBox = frame.getByRole('button', { name: /Text Box/i });
  32  |     const fileUpload = frame.getByRole('button', { name: /select file|file upload/i });
  33  |     const canvas = frame.locator('[class*="canvas"]').first();
  34  |     await expect(textBox).toBeVisible({ timeout: 10000 });
  35  |     await expect(fileUpload).toBeVisible({ timeout: 10000 });
  36  |     await expect(canvas).toBeVisible({ timeout: 15000 });
  37  |     await this.drag(textBox, canvas);
  38  |     console.log('✅ Textbox dragged to canvas');
  39  |     await this.drag(fileUpload, canvas);
  40  |     console.log('✅ File Upload dragged to canvas');
  41  |   }
  42  | 
  43  |   async saveForm() {
  44  |     const frame = this.page.frameLocator('iframe');
  45  |     const saveBtn = frame.locator('button').filter({ hasText: /^Save$/ }).first();
  46  |     await expect(saveBtn).toBeVisible({ timeout: 10000 });
  47  |     await saveBtn.click();
  48  |     await this.page.waitForTimeout(2000);
  49  |     console.log('✅ Form saved');
  50  |   }
  51  | 
  52  |   async fillTextboxInRunningForm(text) {
  53  |     await this.page.screenshot({ path: 'test-results/running-form.png' });
  54  |     console.log('Current URL:', this.page.url());
  55  |     const textbox = this.page.locator('input[type="text"], textarea').first();
  56  |     await expect(textbox).toBeVisible({ timeout: 15000 });
  57  |     await textbox.fill(text);
  58  |     console.log(`✅ Textbox filled with: ${text}`);
  59  |   }
  60  | 
  61  |   // async uploadFileInRunningForm(filePath) {
  62  |   //   await this.page.screenshot({ path: 'test-results/running-form-upload.png' });
  63  |   //   console.log('Current URL upload:', this.page.url());
  64  |   //   const fileInput = this.page.locator('input[type="file"]');
  65  |   //   if (await fileInput.count() > 0) {
  66  |   //     await fileInput.setInputFiles(filePath);
  67  |   //     console.log(`✅ File set via input: ${filePath}`);
  68  |   //   } else {
  69  |   //     const [fileChooser] = await Promise.all([
  70  |   //       this.page.waitForEvent('filechooser'),
  71  |   //       this.page.getByText('browse').click(),
  72  |   //     ]);
  73  |   //     await fileChooser.setFiles(filePath);
  74  |   //     console.log(`✅ File set via filechooser: ${filePath}`);
  75  |   //   }
  76  |   //   await this.page.waitForTimeout(1000);
  77  |   // }
  78  | 
  79  |   async uploadFileInRunningForm() {
  80  |     // Pause here for manual file upload
  81  |     console.log('⏸️ MANUAL STEP: Please upload the file manually, then resume');
  82  |     await this.page.pause();
  83  |     console.log('✅ Manual file upload done - resumed');
  84  |   }
  85  | 
  86  |   async submitRunningForm() {
  87  |     const submitBtn = this.page.getByRole('button', { name: /submit/i });
> 88  |     await expect(submitBtn).toBeVisible({ timeout: 10000 });
      |                             ^ Error: expect.toBeVisible: Target page, context or browser has been closed
  89  |     await submitBtn.click();
  90  |     await this.page.waitForTimeout(2000);
  91  |     console.log('✅ Form submitted');
  92  |   }
  93  | 
  94  |   async verifyFormSubmitted() {
  95  |     const success = this.page.locator('text=/success|completed|submitted/i').first();
  96  |     await expect(success).toBeVisible({ timeout: 15000 });
  97  |     console.log('✅ Form submission verified');
  98  |   }
  99  | }
  100 | 
  101 | module.exports = { FormPage };
  102 | 
  103 | 
  104 | 
  105 | // const { expect } = require('@playwright/test');
  106 | // const { BasePage } = require('./base.page');
  107 | 
  108 | // class FormPage extends BasePage {
  109 | //   constructor(page) {
  110 | //     super(page);
  111 | //   }
  112 | 
  113 | //   async createForm(name) {
  114 | //     await this.page.getByRole('heading', { name: 'Automation' })
  115 | //       .getByLabel('Create').click();
  116 | //     await this.page.getByRole('button', { name: 'Form' }).click();
  117 | //     await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
  118 | //     await this.page.getByRole('button', { name: 'Create & edit' }).click();
  119 | //     await this.page.waitForTimeout(2000);
  120 | //     console.log(`✅ Form "${name}" created`);
  121 | //   }
  122 | 
  123 | //   async drag(source, target) {
  124 | //     const sourceBox = await source.boundingBox();
  125 | //     const targetBox = await target.boundingBox();
  126 | //     if (!sourceBox || !targetBox) throw new Error('Element not visible for drag');
  127 | //     await this.page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
  128 | //     await this.page.mouse.down();
  129 | //     await this.page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 25 });
  130 | //     await this.page.mouse.up();
  131 | //   }
  132 | 
  133 | //   async dragAndDropElements() {
  134 | //     const frame = this.page.frameLocator('iframe');
  135 | //     const textBox = frame.getByRole('button', { name: /Text Box/i });
  136 | //     const fileUpload = frame.getByRole('button', { name: /select file|file upload/i });
  137 | //     const canvas = frame.locator('[class*="canvas"]').first();
  138 | 
  139 | //     await expect(textBox).toBeVisible({ timeout: 10000 });
  140 | //     await expect(fileUpload).toBeVisible({ timeout: 10000 });
  141 | //     await expect(canvas).toBeVisible({ timeout: 15000 });
  142 | 
  143 | //     await this.drag(textBox, canvas);
  144 | //     console.log('✅ Textbox dragged to canvas');
  145 | //     await this.drag(fileUpload, canvas);
  146 | //     console.log('✅ File Upload dragged to canvas');
  147 | //   }
  148 | 
  149 | //   async saveForm() {
  150 | //     const frame = this.page.frameLocator('iframe');
  151 | //     const saveBtn = frame.locator('button').filter({ hasText: /^Save$/ }).first();
  152 | //     await expect(saveBtn).toBeVisible({ timeout: 10000 });
  153 | //     await saveBtn.click();
  154 | //     await this.page.waitForTimeout(2000);
  155 | //     console.log('✅ Form saved');
  156 | //   }
  157 | 
  158 | //   async fillTextboxInRunningForm(text) {
  159 | //     // After process runs, form opens in a new view
  160 | //     const textbox = this.page.locator('input[type="text"], textarea').first();
  161 | //     await expect(textbox).toBeVisible({ timeout: 15000 });
  162 | //     await textbox.fill(text);
  163 | //     console.log(`✅ Textbox filled with: ${text}`);
  164 | //   }
  165 | 
  166 | //   async uploadFileInRunningForm(filePath) {
  167 | //     // Click browse link to trigger file input
  168 | //     const browseLink = this.page.getByText('browse');
  169 | //     await expect(browseLink).toBeVisible({ timeout: 15000 });
  170 | 
  171 | //     // Set file on the hidden file input
  172 | //     const fileInput = this.page.locator('input[type="file"]');
  173 | //     await fileInput.setInputFiles(filePath);
  174 | //     await this.page.waitForTimeout(1000);
  175 | //     console.log(`✅ File uploaded: ${filePath}`);
  176 | //   }
  177 | 
  178 | //   async submitRunningForm() {
  179 | //     const submitBtn = this.page.getByRole('button', { name: /submit/i });
  180 | //     await expect(submitBtn).toBeVisible({ timeout: 10000 });
  181 | //     await submitBtn.click();
  182 | //     await this.page.waitForTimeout(2000);
  183 | //     console.log('✅ Form submitted');
  184 | //   }
  185 | 
  186 | //   async verifyFormSubmitted() {
  187 | //     // After submit, check for success state
  188 | //     const success = this.page.locator('text=/success|completed|submitted/i').first();
```