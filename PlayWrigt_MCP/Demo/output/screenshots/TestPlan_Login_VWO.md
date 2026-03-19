# Test Plan: VWO Login Feature

| Field | Value |
|-------|-------|
| **Version** | 1.0.0 |
| **Author** | Antigravity AI |
| **Date** | 2026-03-19 |
| **Environment** | Production (https://app.vwo.com/#/login) |
| **Browser** | Chrome, Firefox, Safari (via Playwright) |

---

## 1. Introduction

This test plan describes the testing approach for the **VWO Login Feature**. It outlines the scope, test strategy, resources, schedule, and deliverables for the testing effort, focusing specifically on the primary user entry point.

## 2. Objectives

- Verify core login functionality for registered users.
- Ensure proper error handling for invalid credentials.
- Validate UI elements visibility and layout consistency.
- Confirm "Remember me" and navigation links ("Forgot Password", "Free Trial") correctly route users or behave as intended.

## 3. Scope

### In Scope
- Functional testing of Email and Password input fields.
- Validation of "Sign in" button behavior.
- UI validation: Logo, "Sign in with Google", "Sign in using SSO", "Sign in with Passkey".
- Error message display for failed login attempts.
- Presence of "Terms" and "Privacy Policy" links.

### Out of Scope
- Backend performance testing under high load.
- End-to-end flow of external providers (Google, SSO, Passkey).
- Email delivery functionality for "Forgot Password".
- Full registration process for "Start a FREE TRIAL".

## 4. Test Strategy

### Test Approach
- **Automation Tool:** Playwright with @playwright/test
- **Test Type:** Functional UI and Negative testing
- **Browser:** Chromium, Firefox, WebKit
- **Environment:** https://app.vwo.com

### Test Levels
- **Smoke Testing:** Primary successful login path.
- **Functional Testing:** Field validations, "Remember me" persistence.
- **Negative Testing:** Empty fields, invalid email formats, incorrect password, blocked location/IP messaging.

## 5. Test Environment

| Component | Details |
|-----------|---------|
| Application URL | https://app.vwo.com/#/login |
| Browser | Chromium, Firefox, WebKit |
| OS | Windows 11 (Runner) |
| Framework | Playwright v1.58+ |
| Reporter | HTML + JSON |

## 6. Entry Criteria

- Application `app.vwo.com` is reachable.
- Test browser instances are installed.
- Valid and invalid test credentials are provided.
- Test plan is approved.

## 7. Exit Criteria

- All critical login scenarios executed successfully.
- No high-priority bugs related to credential validation.
- All UI elements match the approved design (per screenshots).
- All failed tests have associated logs and screenshots.

## 8. Test Cases Summary

| TC ID | Description | Expected Result |
|-------|-------------|-----------------|
| TC001 | Verify "Sign In" with valid credentials | User is redirected to the dashboard. |
| TC002 | Verify "Sign In" with invalid credentials | Error message "Your email, password, IP address or location did not match" is displayed. |
| TC003 | Verify mandatory field errors | "Enter email ID" or "Enter password" validation triggers if left blank. |
| TC004 | Verify link to "Forgot Password?" | Redirects user to the password reset page. |
| TC005 | Verify visibility of Social Logins | Google, SSO, and Passkey buttons are visible and enabled. |
| TC006 | Verify "Start a FREE TRIAL" link | Redirects user to the registration/signup page. |
| TC007 | Verify "Remember me" checkbox | Selection state is maintained during browser session. |

## 9. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| IP/Location blocking | High | Use VPN or white-listed accounts if location-based security is strict. |
| Captcha Appearance | High | Use test accounts with Captcha disabled or implement Playwright bypass. |
| Browser mismatch | Medium | Test across all three major rendering engines. |

## 10. Schedule

| Phase | Duration |
|-------|----------|
| Test Case Design | 0.5 Day |
| Test Execution (Auto) | Ongoing |
| Reporting | Automated |

## 11. Deliverables

- [x] Test Plan (this document)
- [ ] Automated Test Script (Playwright)
- [ ] Execution Report (HTML)
- [ ] Screenshots/Trace files on failure
