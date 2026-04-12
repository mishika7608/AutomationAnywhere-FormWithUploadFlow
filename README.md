# Automation Assignment – Use Case 2: Form with Upload Flow

## Overview

This project automates the **Form Creation with File Upload Flow** for the Automation Anywhere Community Edition platform using **Playwright** (UI Testing) with the **Page Object Model (POM)** design pattern.

The automation covers:
- Login to the AA portal
- Creating a Form with Textbox and File Upload elements
- Creating a Process and linking the Form to it
- Running the Process and interacting with the live Form
- File upload (manual step) and form submission

---

## Framework and Tools Used

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | UI test automation framework |
| Node.js (v18+) | JavaScript runtime |
| npm | Package manager |
| Page Object Model (POM) | Design pattern for organizing UI elements and actions |

---

## Project Structure

```
ATask2/
├── pages/
│   ├── base.page.js          # Base class with common methods
│   ├── login.page.js         # Login page actions and selectors
│   ├── dashboard.page.js     # Dashboard, Process creation and deployment
│   └── form.page.js          # Form creation, drag-drop and submission
├── test-data/
│   └── sample.pdf            # Sample file used for upload
├── tests/
│   └── form-upload.spec.js   # Main test file for Use Case 2
├── package.json              # Project dependencies
├── playwright.config.js      # Playwright configuration
└── README.md                 # This file
```

---

## Setup Instructions

### Prerequisites
- Node.js v18 or above
- npm installed
- Google Chrome browser
- Internet access to reach `community.cloud.automationanywhere.digital`
- A registered account on [Automation Anywhere Community Edition](https://www.automationanywhere.com/products/enterprise/community-edition)

### Step 1 — Install dependencies

```bash
cd ATask2
npm install
```

### Step 2 — Install Playwright browsers

```bash
npx playwright install
```

### Step 3 — Add test data file

Place a file named `sample.pdf` (or any supported file) inside the `test-data/` folder. This file will be used for the manual upload step.

---

## Configuration

Open `tests/form-upload.spec.js` and update the credentials at the top:

```js
const USERNAME  = 'your-email@example.com';
const PASSWORD  = 'your-plain-text-password';
```

---

## Execution Instructions

### Run the test

```bash
npx playwright test tests/form-upload.spec.js --headed
```

### Run in debug mode (recommended for first run)

```bash
npx playwright test tests/form-upload.spec.js --debug
```

---

## Test Flow — Step by Step

| Step | Description | Mode |
|---|---|---|
| 1 | Login to AA portal | Automated |
| 2 | Navigate to Automation | Automated |
| 3 | Create a new Form | Automated |
| 4 | Drag & Drop Textbox and File Upload elements onto canvas | Automated |
| 5 | Save the Form | Automated |
| 6 | Navigate back to Automation | Automated |
| 7 | Create a new Process | Automated |
| 8 | Add Form node to Process canvas | Automated |
| 9 | Choose the created Form from right panel | Automated |
| 10 | Add submit button to Form node | Automated |
| 11 | Fill Request title on Start node | Automated |
| 12 | Save the Process | Automated |
| 13 | Run the Process | Automated |
| 14 | Fill Textbox in the running Form | Automated |
| 15 | Upload a file | **Manual** — see note below |
| 16 | Submit the Form | Automated |
| 17 | Verify form submission | Automated |

---

## Manual Upload Step

At **Step 15**, the test will automatically **pause** and open the Playwright Inspector. At this point:

1. The running form will be visible in the browser
2. Manually click **"browse"** in the "Select a file" section
3. Select your file from your local system
4. Once the file is selected, click **Resume** in the Playwright Inspector toolbar to continue the test

This step is manual because the AA portal's file upload uses a native OS file dialog which cannot be automated via standard browser automation.

---

## Assertions Covered

- UI element visibility (Textbox, File Upload control on canvas)
- Form creation and confirmation
- Process creation and form linking
- Form submission behavior
- Post-submission status verification

---

## Environment Notes

- Form and Process names are generated dynamically using `Date.now()` to avoid duplicate name errors on repeated runs
- The test runs in **headed mode** (visible browser) by default
- Default test timeout is set to **120 seconds** in `playwright.config.js` to accommodate the full flow
- The browser permission popup ("Allow / Block") that appears during Process creation is handled automatically
- The "Set input variable" confirmation dialog is handled in a new browser tab automatically
