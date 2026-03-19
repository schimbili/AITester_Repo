# Test Cases: The Internet - Herokuapp

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Author** | QA Automation Team |
| **Date** | 2026-03-19 |
| **Total Test Cases** | 10 |

---

## Test Case Format

Each test case follows this structure:

| Field | Description |
|-------|-------------|
| **TC ID** | Unique identifier (TC-001, TC-002, ...) |
| **Title** | Brief description of what is tested |
| **Preconditions** | What must be true before the test |
| **Steps** | Step-by-step instructions |
| **Expected Result** | What should happen |
| **Priority** | High / Medium / Low |
| **Category** | Smoke / Functional / Negative |
| **Spec File** | Corresponding Playwright spec file |

---

## Test Cases

### TC-001: Homepage Loads Correctly

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Smoke |
| **Spec File** | `01_homepage.spec.js` |

**Preconditions:** Browser is open, internet is accessible

**Steps:**
1. Navigate to homepage
2. Wait for page to load
3. Check page title
4. Verify heading is visible

**Expected Result:** Page loads with correct title "The Internet" and heading "Welcome to the-internet"

---

### TC-002: Navigation Links Work

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Smoke |
| **Spec File** | `02_navigation.spec.js` |

**Preconditions:** Homepage is loaded

**Steps:**
1. Navigate to homepage
2. Verify links are present
3. Click "Form Authentication" link
4. Verify login page loads

**Expected Result:** Links navigate to correct pages

---

### TC-003: Input Fields Accept Text

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `03_search.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to /inputs
2. Locate number input
3. Type "42"
4. Verify value

**Expected Result:** Input field accepts and displays "42"

---

### TC-004: Form Authentication Page

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Functional |
| **Spec File** | `04_form_submit.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to /login
2. Verify form heading
3. Check username field
4. Check password field
5. Check login button

**Expected Result:** Login form has all required fields

---

### TC-005: Valid Login Succeeds

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Functional |
| **Spec File** | `05_login_valid.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to /login
2. Enter "tomsmith"
3. Enter "SuperSecretPassword!"
4. Click Login
5. Verify success message

**Expected Result:** User logs in, sees "You logged into a secure area!"

---

### TC-006: Invalid Login Shows Error

| Field | Value |
|-------|-------|
| **Priority** | High |
| **Category** | Negative |
| **Spec File** | `06_login_invalid.spec.js` |

**Preconditions:** Login page is accessible

**Steps:**
1. Navigate to /login
2. Enter "invaliduser"
3. Enter "invalidpass"
4. Click Login
5. Verify error message

**Expected Result:** Error "Your username is invalid!" appears

---

### TC-007: Broken Link Detection [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `07_broken_link.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to /broken_images
2. Find broken image
3. Assert image returns 200

**Expected Result:** INTENTIONAL FAILURE - broken image returns 404 not 200

---

### TC-008: Page Title Verification [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `08_wrong_title.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to homepage
2. Assert title is "Wrong Title That Does Not Exist"

**Expected Result:** INTENTIONAL FAILURE - actual title is "The Internet"

---

### TC-009: Timeout Handling [EXPECTED FAIL]

| Field | Value |
|-------|-------|
| **Priority** | Low |
| **Category** | Negative |
| **Spec File** | `09_timeout_page.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to /dynamic_loading/1
2. Wait for non-existent element with 1ms timeout

**Expected Result:** INTENTIONAL FAILURE - timeout waiting for element

---

### TC-010: Visual Elements Present

| Field | Value |
|-------|-------|
| **Priority** | Medium |
| **Category** | Functional |
| **Spec File** | `10_visual_check.spec.js` |

**Preconditions:** Application is accessible

**Steps:**
1. Navigate to homepage
2. Verify heading
3. Verify sub-heading
4. Verify link list
5. Verify footer

**Expected Result:** All key visual elements are present

---


---

## Summary

| Priority | Count |
|----------|-------|
| High | 5 |
| Medium | 4 |
| Low | 1 |
| **Total** | **10** |

| Category | Count |
|----------|-------|
| Smoke | 2 |
| Functional | 6 |
| Negative | 2 |
