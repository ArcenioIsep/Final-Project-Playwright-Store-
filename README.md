# 📦 Final Project — Playwright Store  
### Brief Description

This project delivers an end-to-end automated test suite for the **Store Module** of the application:

> https://playground-drab-six.vercel.app/store

The tests validate the complete purchase flow — **Inventory → Catalog → Cart → Payments → Orders** — ensuring that key functionalities behave as expected.  
The project follows a clean, minimalistic, and professional structure using Playwright, with separation of concerns (POM, data files, modular test specs).

tests/
  store/
    inventory.spec.ts
    catalog.spec.ts
    cart.spec.ts
    payments.spec.ts
    orders.spec.ts
    e2e-store-flow.spec.ts
  data/
    products.data.ts
  pages/
    inventory.page.ts
    catalog.page.ts
    cart.page.ts
    payments.page.ts
    orders.page.ts

playwright.config.ts
README.md


---

# ✅ Task Checklist (Project To-Do)

## 🔧 Setup
- [ ] Create GitHub repo  
- [ ] Install dependencies (`npm install`)  
- [ ] Install Playwright browsers (`npx playwright install`)  
- [ ] Configure `playwright.config.ts`  
- [ ] Set `baseURL` for easy navigation  
- [ ] Confirm test runner works (`npx playwright test`)  

---

## 🧩 Module Test Development

### **1. Inventory**
- [ ] Create InventoryPage (POM)
- [ ] Test: create new product  
- [ ] Test: increase quantity  
- [ ] Test: decrease quantity  
- [ ] Test: quantity never goes below zero  

### **2. Catalog**
- [ ] Create CatalogPage (POM)
- [ ] Test: products appear  
- [ ] Test: add to cart  
- [ ] Test: stock decreases  
- [ ] Test: Out of Stock disabled  

### **3. Cart**
- [ ] Create CartPage (POM)
- [ ] Test: items appear  
- [ ] Test: subtotal and total  
- [ ] Test: go to Payments button  

### **4. Payments**
- [ ] Create PaymentsPage (POM)
- [ ] Test: payment summary  
- [ ] Test: select payment method  
- [ ] Test: block payment without method  
- [ ] Test: confirm payment leads to Orders  

### **5. Orders**
- [ ] Create OrdersPage (POM)
- [ ] Test: order list  
- [ ] Test: order details (date, total, items)  

---

## 🔁 E2E Flow
- [ ] Create product  
- [ ] Validate in catalog  
- [ ] Add to cart  
- [ ] Validate totals  
- [ ] Proceed to payment  
- [ ] Pay  
- [ ] Validate order created  

---

## 📝 Documentation
- [ ] Finalize README.md  
- [ ] Add instructions on running tests  
- [ ] Add project structure description  
- [ ] Add checklist of tasks  
- [ ] Keep everything clean, simple, minimalistic  

---


