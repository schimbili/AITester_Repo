# Execution Report: VWO Login Negative Scenarios

| Field | Value |
|-------|-------|
| **Project** | VWO Login Feature |
| **Execution Date** | 2026-03-19 |
| **Executor** | Antigravity AI (via Playwright MCP) |
| **Environment** | https://app.vwo.com/#/login |
| **Total Test Cases** | 5 |
| **Passed** | 5 |
| **Failed** | 0 |
| **Bugs Found** | 0 |

---

## Execution Summary

| TC ID | Scenario | Result | Evidence |
|-------|----------|--------|----------|
| TC-001 | Empty Login | PASSED | [Screenshot](Execution_Screenshots/TC-001_EmptyLogin_Error.png) |
| TC-002 | Chinese Login | PASSED | [Screenshot](Execution_Screenshots/TC-002_ChineseLogin.png) |
| TC-003 | Arabic (RTL) Login | PASSED | [Screenshot](Execution_Screenshots/TC-003_ArabicLogin.png) |
| TC-004 | Special Characters/Injection | PASSED | [Screenshot](Execution_Screenshots/TC-004_SpecialChars.png) |
| TC-005 | Spanish characters | PASSED | [Screenshot](Execution_Screenshots/TC-005_SpanishLogin.png) |

---

## Detailed Observations

### TC-001: Empty Login
- **Action**: Clicked "Sign In" with blank fields.
- **Outcome**: The application correctly identified missing credentials and displayed the generic error message.
- **Result**: PASSED

### TC-002: Chinese Login
- **Action**: Entered Chinese characters in Email/Password.
- **Outcome**: The application displayed the credential mismatch error and triggered a **reCAPTCHA** challenge, indicating automated/suspicious pattern detection.
- **Result**: PASSED

### TC-003: Arabic Login
- **Action**: Entered Arabic (RTL) characters.
- **Outcome**: Successfully handled the input direction and displayed the mismatch error with **reCAPTCHA**.
- **Result**: PASSED

### TC-004: Special Characters / SQL Injection
- **Action**: Entered `admin' OR 1=1;--` and invalid email format.
- **Outcome**: Server returned a `403 Forbidden` status in the network logs, effectively blocking the suspicious payload. The UI remained responsive and secure.
- **Result**: PASSED

### TC-005: Spanish Login
- **Action**: Entered Spanish accented characters.
- **Outcome**: Handled special characters correctly and displayed the mismatch error with **reCAPTCHA**.
- **Result**: PASSED

---

## Conclusion
The VWO login page demonstrates robust handling of negative scenarios, including:
1.  Consistent error messaging for varied invalid inputs.
2.  Dynamic security triggers (reCAPTCHA) to prevent brute-force or scripted attacks.
3.  Server-side protection against suspicious character sequences.

**All 5 negative test cases have been validated as PASSED.**
