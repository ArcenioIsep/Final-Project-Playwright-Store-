# 🏪 Playwright Store Automation — Warm‑Up Project

## 🎯 Short Description
This repository contains an **end‑to‑end automation project using Playwright**, focused **only on the Store module** of the training application.  
The goal is to practice real-world UI automation by covering the full store lifecycle:

**Inventory → Catalog → Cart → Payments → Orders**

This warm‑up prepares you for real industry automation practices through clean structure, reusable components, and organized test flows.

👉 Target application: https://playground-drab-six.vercel.app/store

---

# 🚀 Project Overview

This project teaches you how to design and execute automated UI tests for the Store module using:

- UI automation with Playwright  
- Form handling & validations  
- Stock management logic  
- Cart totals & price calculations  
- Payment flow validations  
- Order confirmation verifications  
- Page Object Model (POM) structure  
- Test data separation  
- Clean, readable test specs  

The Store section represents a mini e‑commerce workflow, allowing you to train real QA automation skills.

---

# 🧩 Tools & Technologies

| Tool | Purpose |
|------|---------|
| **Playwright** | Main automation framework |
| **Node.js** | Runtime to execute Playwright |
| **VS Code** | IDE + Playwright Test Runner |
| **Git / GitHub** | Version control + board management |
| **ESLint / Prettier** *(optional)* | Code cleanliness & consistent formatting |

---

# 📁 Project Structure (Recommended)

```
store-automation/
│
├── tests/
│   ├── store/
│   │   ├── inventory.spec.ts
│   │   ├── catalog.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── payments.spec.ts
│   │   ├── orders.spec.ts
│   │   └── e2e-store-flow.spec.ts
│   │
│   ├── pages/
│   │   ├── inventory.page.ts
│   │   ├── catalog.page.ts
│   │   ├── cart.page.ts
│   │   ├── payments.page.ts
│   │   └── orders.page.ts
│   │
│   └── data/
│       └── products.data.ts
│
├── playwright.config.ts
└── README.md
```

---

# ⚙️ Playwright Configuration Overview

Your configuration will include:

- Base URL for the store module  
- Parallel test execution  
- HTML reports  
- Traces on retry  
- Screenshots on failure  

Example (simplified):

```js
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  fullyParallel: true,

  use: {
    baseURL: 'https://playground-drab-six.vercel.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});
```

---

# 🧠 Page Object Model (POM)

Each store section has its own Page Object, allowing:

- Cleaner selectors  
- Reusable actions  
- Better readability  
- Clear separation between test logic and UI interactions  

Example:

```ts
await catalog.addProductToCart("Laptop Test");
await cart.verifyTotal(20);
```

---

# 🧪 What Will Be Automated

### **1. Inventory**
- Add new products  
- Increase stock  
- Decrease stock  
- Validate quantity cannot go below 0  

### **2. Catalog**
- Product visibility  
- Add to cart  
- Out‑of‑stock behavior  

### **3. Cart**
- List items  
- Validate subtotal & total  
- Navigate to Payments  

### **4. Payments**
- Payment method selection  
- Summary validation  
- Confirm payment  

### **5. Orders**
- Orders list  
- Order details (items, total, date)  

### **6. Full E2E Flow**
- Create product  
- Add to cart  
- Checkout  
- Confirm order  
- Validate in orders page  

---

# ▶️ Running the Tests

Run all tests:
```
npx playwright test
```

Run in UI mode:
```
npx playwright test --ui
```

Show the report:
```
npx playwright show-report
```

---

# 📜 License
Open and free for personal learning and development.

