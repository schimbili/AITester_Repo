# Test Cases: VWO Login Feature (Negative Scenarios)

| Field | Value |
|-------|-------|
| **Version** | 1.1.0 (Validated via Playwright) |
| **Author** | Antigravity AI |
| **Date** | 2026-03-19 |
| **Total Test Cases** | 5 |

---

## Test Cases

### TC-001: Login with Empty Credentials
| Field | Description |
|-------|-------------|
| **TC ID** | TC-001 |
| **Title** | Verify login with empty email and password fields. |
| **Preconditions** | Application is reachable at https://app.vwo.com/#/login. |
| **Steps** | 1. Navigate to the login page.<br>2. Clear both the Email and Password fields.<br>3. Click the "Sign In" button. |
| **Expected Result** | Application displays: "Your email, password, IP address or location did not match". |
| **Priority** | High |
| **Category** | Negative |
| **Spec File** | login_negative.spec.js |

### TC-002: Login with Chinese Characters
| Field | Description |
|-------|-------------|
| **TC ID** | TC-002 |
| **Title** | Verify login with Chinese characters in input fields. |
| **Preconditions** | Application is reachable at https://app.vwo.com/#/login. |
| **Steps** | 1. Navigate to the login page.<br>2. Enter "测试账号@vwo.com" in the Email ID field.<br>3. Enter "我的密码123" in the Password field.<br>4. Click the "Sign In" button. |
| **Expected Result** | Application displays: "Your email, password, IP address or location did not match". May trigger reCAPTCHA after multiple attempts. |
| **Priority** | Medium |
| **Category** | Negative |
| **Spec File** | login_negative.spec.js |

### TC-003: Login with Arabic Characters
| Field | Description |
|-------|-------------|
| **TC ID** | TC-003 |
| **Title** | Verify login with Arabic characters (RTL) in input fields. |
| **Preconditions** | Application is reachable at https://app.vwo.com/#/login. |
| **Steps** | 1. Navigate to the login page.<br>2. Enter "مستخدم@vwo.com" in the Email ID field.<br>3. Enter "كلمة_سر_خاطئة" in the Password field.<br>4. Click the "Sign In" button. |
| **Expected Result** | Application displays: "Your email, password, IP address or location did not match". May trigger reCAPTCHA after multiple attempts. |
| **Priority** | Medium |
| **Category** | Negative |
| **Spec File** | login_negative.spec.js |

### TC-004: Login with Invalid Characters and SQL Injection Snippets
| Field | Description |
|-------|-------------|
| **TC ID** | TC-004 |
| **Title** | Verify login with invalid format and special characters in password. |
| **Preconditions** | Application is reachable at https://app.vwo.com/#/login. |
| **Steps** | 1. Navigate to the login page.<br>2. Enter "invalid-user-!@#$%" in the Email ID field.<br>3. Enter "admin' OR 1=1;--" in the Password field.<br>4. Click the "Sign In" button. |
| **Expected Result** | Application gracefully handles special characters and displays the credential mismatch error message. |
| **Priority** | High |
| **Category** | Negative |
| **Spec File** | login_negative.spec.js |

### TC-005: Login with Spanish Characters
| Field | Description |
|-------|-------------|
| **TC ID** | TC-005 |
| **Title** | Verify login with Spanish characters (accented/n with tilde). |
| **Preconditions** | Application is reachable at https://app.vwo.com/#/login. |
| **Steps** | 1. Navigate to the login page.<br>2. Enter "niño.español@vwo.com" in the Email ID field.<br>3. Enter "contraseña_segura_123" in the Password field.<br>4. Click the "Sign In" button. |
| **Expected Result** | Application displays: "Your email, password, IP address or location did not match". |
| **Priority** | Medium |
| **Category** | Negative |
| **Spec File** | login_negative.spec.js |

---

## Summary

| Priority | Count |
|----------|-------|
| High | 2 |
| Medium | 3 |
| Low | 0 |
| **Total** | **5** |

| Category | Count |
|----------|-------|
| Smoke | 0 |
| Functional | 0 |
| Negative | 5 |
