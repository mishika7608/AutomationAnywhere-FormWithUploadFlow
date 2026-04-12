const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { DashboardPage } = require('../pages/dashboard.page');
const { FormPage } = require('../pages/form.page');

const BASE_URL     = 'https://community.cloud.automationanywhere.digital';
const USERNAME     = 'csds23040@glbitm.ac.in';
const PASSWORD     = 'Aconite#30';
const FORM_NAME    = `TestForm_${Date.now()}`;
const PROCESS_NAME = `TestProcess_${Date.now()}`;

test('Use Case 2 - Form Creation with Upload Flow', async ({ page, context }) => {
// test('Use Case 2 - Form Creation with Upload Flow', async ({ page }) => {
  const login     = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const form      = new FormPage(page);

  console.log('\n📌 STEP 1: Login');
  await login.navigate(BASE_URL);
  await login.login(USERNAME, PASSWORD);
  await page.waitForURL(/dashboard|home|automation/i, { timeout: 15000 });
  console.log('✅ Logged in successfully');

  console.log('\n📌 STEP 2: Navigate to Automation');
  await dashboard.navigateToAutomation();

  console.log('\n📌 STEP 3: Create Form');
  await form.createForm(FORM_NAME);

  console.log('\n📌 STEP 4: Drag & Drop Elements');
  await form.dragAndDropElements();

  console.log('\n📌 STEP 5: Save Form');
  await form.saveForm();

  console.log('\n📌 STEP 6: Go back to Automation');
  await dashboard.navigateToAutomation();

  console.log('\n📌 STEP 7: Create Process');
  await dashboard.createProcess(PROCESS_NAME);

  console.log('\n📌 STEP 8: Add Form node to canvas');
  await dashboard.addFormNodeToCanvas();

  console.log('\n📌 STEP 9: Choose Form from right panel');
  await dashboard.chooseFormFromRightPanel(FORM_NAME);

  console.log('\n📌 STEP 10: Add submit button');
  await dashboard.addSubmitButton();

  console.log('\n📌 STEP 11: Fill Start node details');
  await dashboard.fillStartNodeDetails('Test Request');

  console.log('\n📌 STEP 12: Save Process');
  await dashboard.saveProcess();

  // ── STEP 13: Run Process ──────────────────────────────────────────────
console.log('\n📌 STEP 13: Run Process');
const runningPage = await dashboard.deployProcess(context);

// ── STEP 14: Fill Textbox in running form ─────────────────────────────
console.log('\n📌 STEP 14: Fill Textbox in running form');
const runningForm = new FormPage(runningPage);
await runningForm.fillTextboxInRunningForm('Sample Input Text');

// ── STEP 15: Upload file ──────────────────────────────────────────────
console.log('\n📌 STEP 15: Upload file');
await runningForm.uploadFileInRunningForm('test-data/sample.pdf');

// ── STEP 16: Submit form ──────────────────────────────────────────────
console.log('\n📌 STEP 16: Submit form');
await runningForm.submitRunningForm();

// ── STEP 17: Verify submission ────────────────────────────────────────
console.log('\n📌 STEP 17: Verify submission');
await runningForm.verifyFormSubmitted();

  // console.log('\n📌 STEP 13: Run Process');
  // await dashboard.deployProcess();

  // console.log('\n📌 STEP 14: Fill Textbox in running form');
  // await form.fillTextboxInRunningForm('Sample Input Text');

  // console.log('\n📌 STEP 15: Upload file');
  // await form.uploadFileInRunningForm('test-data/sample.pdf');

  // console.log('\n📌 STEP 16: Submit form');
  // await form.submitRunningForm();

  // console.log('\n📌 STEP 17: Verify submission');
  // await form.verifyFormSubmitted();

  console.log('\n🎉 Use Case 2 completed successfully!');
});



// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../pages/login.page');
// const { DashboardPage } = require('../pages/dashboard.page');
// const { FormPage } = require('../pages/form.page');

// const BASE_URL     = 'https://community.cloud.automationanywhere.digital';
// const USERNAME     = 'csds23040@glbitm.ac.in';
// const PASSWORD     = 'Aconite#30';
// const FORM_NAME    = `TestForm_${Date.now()}`;
// const PROCESS_NAME = `TestProcess_${Date.now()}`;

// test('Use Case 2 - Form Creation with Upload Flow', async ({ page }) => {

//   const login     = new LoginPage(page);
//   const dashboard = new DashboardPage(page);
//   const form      = new FormPage(page);

//   // ── STEP 1: Login ─────────────────────────────────────────────────────
//   console.log('\n📌 STEP 1: Login');
//   await login.navigate(BASE_URL);
//   await login.login(USERNAME, PASSWORD);
//   await page.waitForURL(/dashboard|home|automation/i, { timeout: 15000 });
//   console.log('✅ Logged in successfully');

//   // ── STEP 2: Navigate to Automation ───────────────────────────────────
//   console.log('\n📌 STEP 2: Navigate to Automation');
//   await dashboard.navigateToAutomation();
//   console.log('✅ Automation page loaded');

//   // ── STEP 3: Create Form ───────────────────────────────────────────────
//   console.log('\n📌 STEP 3: Create Form');
//   await form.createForm(FORM_NAME);

//   // ── STEP 4: Drag & Drop Textbox and File Upload onto canvas ──────────
//   console.log('\n📌 STEP 4: Drag & Drop Elements');
//   await form.dragAndDropElements();

//   // ── STEP 5: Save the Form ─────────────────────────────────────────────
//   console.log('\n📌 STEP 5: Save Form');
//   await form.saveForm();

//   // ── STEP 6: Go back to Automation ────────────────────────────────────
//   console.log('\n📌 STEP 6: Go back to Automation');
//   await dashboard.navigateToAutomation();

//   // ── STEP 7: Create Process ────────────────────────────────────────────
//   console.log('\n📌 STEP 7: Create Process');
//   await dashboard.createProcess(PROCESS_NAME);

//   // ── STEP 8: Add Form node to canvas ──────────────────────────────────
//   console.log('\n📌 STEP 8: Add Form node to canvas');
//   await dashboard.addFormNodeToCanvas();

//   // ── STEP 9: Choose our form from right panel ──────────────────────────
//   console.log('\n📌 STEP 9: Choose Form from right panel');
//   await dashboard.chooseFormFromRightPanel(FORM_NAME);

//   // ── STEP 10: Add submit button to Form node ───────────────────────────
//   console.log('\n📌 STEP 10: Add submit button');
//   await dashboard.addSubmitButton();

//   // ── STEP 11: Fill Start node Request title ────────────────────────────
//   console.log('\n📌 STEP 11: Fill Start node details');
//   await dashboard.fillStartNodeDetails('Test Request');

//   // ── STEP 12: Save the Process ─────────────────────────────────────────
//   console.log('\n📌 STEP 12: Save Process');
//   await dashboard.saveProcess();

//   // ── STEP 13: Run Process + Confirm input variable dialog ─────────────
//   console.log('\n📌 STEP 13: Run Process');
//   await dashboard.deployProcess();

//   // ── STEP 14: Fill Textbox in running form ─────────────────────────────
//   console.log('\n📌 STEP 14: Fill Textbox in running form');
//   await form.fillTextboxInRunningForm('Sample Input Text');

//   // ── STEP 15: Upload file in running form ──────────────────────────────
//   console.log('\n📌 STEP 15: Upload file');
//   await form.uploadFileInRunningForm('test-data/sample.pdf');

//   // ── STEP 16: Submit form ──────────────────────────────────────────────
//   console.log('\n📌 STEP 16: Submit form');
//   await form.submitRunningForm();

//   // ── STEP 17: Verify submission ────────────────────────────────────────
//   console.log('\n📌 STEP 17: Verify form submitted');
//   await form.verifyFormSubmitted();

//   console.log('\n🎉 Use Case 2 completed successfully!');
// });





