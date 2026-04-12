const { expect } = require('@playwright/test');
const { BasePage } = require('./base.page');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.automationMenu = page.getByRole('link', { name: 'Automation', exact: true });
  }

  async navigateToAutomation() {
    await this.automationMenu.waitFor({ state: 'visible', timeout: 15000 });
    await this.automationMenu.click();
  }

  async createProcess(processName) {
    await this.page.getByRole('heading', { name: 'Automation' })
      .getByLabel('Create').click();
    await this.page.getByRole('button', { name: 'Process' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(processName);
    await this.page.getByRole('button', { name: /Create|Next/i }).click();
    await this.page.waitForTimeout(2000);
    console.log(`✅ Process "${processName}" created`);
  }

  async addFormNodeToCanvas() {
    await this.page.waitForTimeout(1500);
    try {
      const allowBtn = this.page.getByRole('button', { name: 'Allow' });
      if (await allowBtn.isVisible({ timeout: 2000 })) {
        await allowBtn.click();
        console.log('✅ Permission popup dismissed');
      }
    } catch (e) {}
    await this.page.locator('.react-flow__handle.react-flow__handle-bottom').first().hover();
    await this.page.waitForTimeout(800);
    await this.page.locator('.rio-icon.rio-icon--icon_plus').first().click();
    await this.page.waitForTimeout(1000);
    await this.page.getByRole('dialog').getByRole('button', { name: ' Form' }).click();
    await this.page.waitForTimeout(1500);
    console.log('✅ Form node added to canvas');
  }

  async chooseFormFromRightPanel(formName) {
    const formNode = this.page.locator('.react-flow__node')
      .filter({ hasText: /form/i }).first();
    if (await formNode.isVisible({ timeout: 2000 }).catch(() => false)) {
      await formNode.click({ force: true });
      await this.page.waitForTimeout(1000);
    }
    const chooseBtn = this.page.locator('button').filter({ hasText: /Choose/i }).first();
    await expect(chooseBtn).toBeVisible({ timeout: 10000 });
    await chooseBtn.click();
    await this.page.waitForTimeout(1500);
    console.log('✅ Choose button clicked');
    const dialogSearchBox = this.page.locator('input').last();
    await expect(dialogSearchBox).toBeVisible({ timeout: 10000 });
    await dialogSearchBox.fill(formName);
    await this.page.waitForTimeout(1500);
    const formCard = this.page.getByText(formName).first();
    await expect(formCard).toBeVisible({ timeout: 10000 });
    await formCard.click();
    await this.page.waitForTimeout(1000);
    const chooseConfirmBtn = this.page.getByRole('dialog').getByRole('button', { name: 'Choose' });
    await expect(chooseConfirmBtn).toBeVisible({ timeout: 10000 });
    await chooseConfirmBtn.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Form selection confirmed');
  }

  async addSubmitButton() {
    const formNode = this.page.locator('.react-flow__node')
      .filter({ hasText: /form/i }).first();
    await formNode.click({ force: true });
    await this.page.waitForTimeout(1000);
    const addBtn = this.page.getByRole('button', { name: 'Add button' });
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();
    await this.page.waitForTimeout(1000);
    console.log('✅ Add button clicked');
    const labelInput = this.page.locator('input[placeholder="Required"]').last();
    await expect(labelInput).toBeVisible({ timeout: 5000 });
    await labelInput.fill('submit');
    await this.page.waitForTimeout(500);
    const addConfirmBtn = this.page.getByRole('dialog').getByRole('button', { name: 'Add' });
    await expect(addConfirmBtn).toBeVisible({ timeout: 5000 });
    await addConfirmBtn.click();
    await this.page.waitForTimeout(500);
    console.log('✅ Submit button added');
  }

  async fillStartNodeDetails(requestTitle) {
    const startNode = this.page.locator('.react-flow__node')
      .filter({ hasText: /start/i }).first();
    await expect(startNode).toBeVisible({ timeout: 10000 });
    await startNode.click({ force: true });
    await this.page.waitForTimeout(1000);
    console.log('✅ Start node clicked');
    const requestTitleField = this.page.locator('[contenteditable="true"]')
      .or(this.page.locator('input[placeholder="Required"]')).first();
    await expect(requestTitleField).toBeVisible({ timeout: 10000 });
    await requestTitleField.click();
    await requestTitleField.fill(requestTitle);
    console.log(`✅ Request title filled: ${requestTitle}`);
  }

  async saveProcess() {
    const saveBtn = this.page.getByRole('button', { name: 'Save' }).first();
    await expect(saveBtn).toBeVisible({ timeout: 10000 });
    await saveBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('✅ Process saved');
  }

  // async deployProcess() {
  //   const runBtn = this.page.getByRole('button', { name: /^Run$/i }).first();
  //   await expect(runBtn).toBeVisible({ timeout: 10000 });
  //   await runBtn.click();
  //   await this.page.waitForTimeout(2000);
  //   console.log('✅ Run clicked');
  //   const confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
  //   if (await confirmBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  //     await confirmBtn.click();
  //     await this.page.waitForTimeout(2000);
  //     console.log('✅ Confirm clicked');
  //   } else {
  //     console.log('ℹ️ No input variable dialog');
  //   }
  // }
async deployProcess(context) {
  // Listen for new tab BEFORE clicking Run
  const newPagePromise = context.waitForEvent('page');

  const runBtn = this.page.getByRole('button', { name: /^Run$/i }).first();
  await expect(runBtn).toBeVisible({ timeout: 10000 });
  await runBtn.click();
  console.log('✅ Run clicked');

  // Get the new tab that opened
  const newPage = await newPagePromise;
  await newPage.waitForLoadState('domcontentloaded');
  console.log('✅ New tab URL:', newPage.url());

  // Click Confirm on the new tab
  const confirmBtn = newPage.getByRole('button', { name: 'Confirm' });
  await expect(confirmBtn).toBeVisible({ timeout: 10000 });
  await confirmBtn.click();
  await newPage.waitForTimeout(2000);
  console.log('✅ Confirm clicked on new tab');

  return newPage;
}
}

module.exports = { DashboardPage };



// const { expect } = require('@playwright/test');
// const { BasePage } = require('./base.page');

// class DashboardPage extends BasePage {
//   constructor(page) {
//     super(page);
//     this.automationMenu = page.getByRole('link', { name: 'Automation', exact: true });
//   }

//   async navigateToAutomation() {
//     await this.automationMenu.waitFor({ state: 'visible', timeout: 15000 });
//     await this.automationMenu.click();
//   }

//   async createProcess(processName) {
//     await this.page.getByRole('heading', { name: 'Automation' })
//       .getByLabel('Create').click();
//     await this.page.getByRole('button', { name: 'Process' }).click();
//     await this.page.getByRole('textbox', { name: 'Name' }).fill(processName);
//     await this.page.getByRole('button', { name: /Create|Next/i }).click();
//     await this.page.waitForTimeout(2000);
//     console.log(`✅ Process "${processName}" created`);
//   }

//   async addFormNodeToCanvas() {
//     // Dismiss permission popup if present
//     await this.page.waitForTimeout(1500);
//     try {
//       const allowBtn = this.page.getByRole('button', { name: 'Allow' });
//       if (await allowBtn.isVisible({ timeout: 2000 })) {
//         await allowBtn.click();
//         console.log('✅ Permission popup dismissed');
//       }
//     } catch (e) {}

//     // Hover Start node bottom handle → click + → select Form
//     await this.page.locator('.react-flow__handle.react-flow__handle-bottom').first().hover();
//     await this.page.waitForTimeout(800);
//     await this.page.locator('.rio-icon.rio-icon--icon_plus').first().click();
//     await this.page.waitForTimeout(1000);
//     await this.page.getByRole('dialog').getByRole('button', { name: ' Form' }).click();
//     await this.page.waitForTimeout(1500);
//     console.log('✅ Form node added to canvas');
//   }

//   async chooseFormFromRightPanel(formName) {
//     // Click Form node first to ensure right panel shows Form details
//     const formNode = this.page.locator('.react-flow__node')
//       .filter({ hasText: /form/i }).first();
//     if (await formNode.isVisible({ timeout: 2000 }).catch(() => false)) {
//       await formNode.click({ force: true });
//       await this.page.waitForTimeout(1000);
//     }

//     // Click Choose button on right panel
//     const chooseBtn = this.page.locator('button').filter({ hasText: /Choose/i }).first();
//     await expect(chooseBtn).toBeVisible({ timeout: 10000 });
//     await chooseBtn.click();
//     await this.page.waitForTimeout(1500);
//     console.log('✅ Choose button clicked');

//     // Type form name in the Find a Form dialog search box
//     const dialogSearchBox = this.page.locator('input').last();
//     await expect(dialogSearchBox).toBeVisible({ timeout: 10000 });
//     await dialogSearchBox.fill(formName);
//     await this.page.waitForTimeout(1500);
//     console.log(`✅ Typed "${formName}" in Find a Form dialog`);

//     // Click the form card that appears
//     const formCard = this.page.getByText(formName).first();
//     await expect(formCard).toBeVisible({ timeout: 10000 });
//     await formCard.click();
//     await this.page.waitForTimeout(1000);
//     console.log('✅ Form card selected');

//     // Click Choose to confirm
//     const chooseConfirmBtn = this.page.getByRole('dialog')
//       .getByRole('button', { name: 'Choose' });
//     await expect(chooseConfirmBtn).toBeVisible({ timeout: 10000 });
//     await chooseConfirmBtn.click();
//     await this.page.waitForTimeout(1000);
//     console.log('✅ Form selection confirmed');
//   }

//   async addSubmitButton() {
//     // Click Form node to select it
//     const formNode = this.page.locator('.react-flow__node')
//       .filter({ hasText: /form/i }).first();
//     await formNode.click({ force: true });
//     await this.page.waitForTimeout(1000);

//     // Click Add button in right panel
//     const addBtn = this.page.getByRole('button', { name: 'Add button' });
//     await expect(addBtn).toBeVisible({ timeout: 10000 });
//     await addBtn.click();
//     await this.page.waitForTimeout(1000);
//     console.log('✅ Add button clicked');

//     await this.page.waitForTimeout(1000);
//     await this.page.screenshot({ path: 'test-results/add-button-dialog.png' });

//   // Debug all inputs visible
//   const allInputs = await this.page.locator('input').all();
//   for (const input of allInputs) {
//     const placeholder = await input.getAttribute('placeholder').catch(() => '');
//     const value = await input.inputValue().catch(() => '');
//     console.log('Input - placeholder:', placeholder, 'value:', value);
//   }

//     // Type label "submit" for the button
//     // const labelInput = this.page.locator('input[placeholder*="label"], input[placeholder*="Label"]')
//     //   .or(this.page.locator('td input').last());
//     // await expect(labelInput).toBeVisible({ timeout: 5000 });
//     // await labelInput.fill('submit');
//     // await this.page.waitForTimeout(500);
//     // console.log('✅ Submit button label set');

//     // Label field has placeholder "Required" - target the last one (not the form path input)
//   const labelInput = this.page.locator('input[placeholder="Required"]').last();
//   await expect(labelInput).toBeVisible({ timeout: 5000 });
//   await labelInput.fill('submit');
//   await this.page.waitForTimeout(500);
//   console.log('✅ Submit button label set');

//   // Click Add button in the dialog to confirm
//   const addConfirmBtn = this.page.getByRole('dialog').getByRole('button', { name: 'Add' });
//   await expect(addConfirmBtn).toBeVisible({ timeout: 5000 });
//   await addConfirmBtn.click();
//   await this.page.waitForTimeout(500);
//   console.log('✅ Action button dialog confirmed');
//   }

//   async fillStartNodeDetails(requestTitle) {
//   // Click Start node using force to bypass react-flow pane intercept
//   const startNode = this.page.locator('.react-flow__node')
//     .filter({ hasText: /start/i }).first();
//   await expect(startNode).toBeVisible({ timeout: 10000 });
//   await startNode.click({ force: true });
//   await this.page.waitForTimeout(1000);
//   console.log('✅ Start node clicked');

//   // Debug - print all inputs to find Request title field
//   const allInputs = await this.page.locator('input, textarea, .ql-editor, [contenteditable="true"]').all();
//   for (const input of allInputs) {
//     const placeholder = await input.getAttribute('placeholder').catch(() => '');
//     const tag = await input.evaluate(el => el.tagName).catch(() => '');
//     console.log('Field - tag:', tag, 'placeholder:', placeholder);
//   }

//   // Request title is a contenteditable or input with placeholder "Required"
//   const requestTitleField = this.page.locator('[contenteditable="true"]')
//     .or(this.page.locator('input[placeholder="Required"]'))
//     .first();
//   await expect(requestTitleField).toBeVisible({ timeout: 10000 });
//   await requestTitleField.click();
//   await requestTitleField.fill(requestTitle);
//   console.log(`✅ Request title filled: ${requestTitle}`);
// }

//   async saveProcess() {
//     const saveBtn = this.page.getByRole('button', { name: 'Save' }).first();
//     await expect(saveBtn).toBeVisible({ timeout: 10000 });
//     await saveBtn.click();
//     await this.page.waitForTimeout(2000);
//     console.log('✅ Process saved');
//   }


//   async deployProcess() {
//   const runBtn = this.page.getByRole('button', { name: /^Run$/i }).first();
//   await expect(runBtn).toBeVisible({ timeout: 10000 });
//   await runBtn.click();
//   await this.page.waitForTimeout(2000);
//   console.log('✅ Run clicked');

//   // "Set input variable" dialog may or may not appear - handle both cases
//   const confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
//   if (await confirmBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
//     await confirmBtn.click();
//     await this.page.waitForTimeout(2000);
//     console.log('✅ Confirm clicked on Set input variable dialog');
//   } else {
//     console.log('ℹ️ No input variable dialog - continuing');
//   }
// }
//   // async deployProcess() {
//   //   const runBtn = this.page.getByRole('button', { name: /^Run$/i }).first();
//   //   await expect(runBtn).toBeVisible({ timeout: 10000 });
//   //   await runBtn.click();
//   //   await this.page.waitForTimeout(1500);
//   //   console.log('✅ Run clicked');

//   //   // Handle "Set input variable" dialog - click Confirm
//   //   const confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
//   //   await expect(confirmBtn).toBeVisible({ timeout: 10000 });
//   //   await confirmBtn.click();
//   //   await this.page.waitForTimeout(2000);
//   //   console.log('✅ Confirm clicked on Set input variable dialog');
//   // }
// }

// module.exports = { DashboardPage };



