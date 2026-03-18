# VWO Comprehensive Test Cases

**ROLE:** Senior QA Engineer (10+ years experience)
**PRD Version:** VWO Digital Experience Optimization Platform Context

---

| TID | Category | Description | Pre-conditions | Steps | Expected | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Functional | Create and launch a basic A/B Test with two variants. | User is logged in to app.vwo.com and has a website tagged with VWO JS snippet. | 1. Navigate to Experimentation > A/B Test. 2. Create a new test. 3. Define Control and Variant 1. 4. Set Goal. 5. Launch test. | Test state changes to "Running" and visitors see variants. | High |
| **TC-02** | Functional | Verify SmartStats reporting for a running experiment. | Experiment has been running with at least 1000 visitors. | 1. Open the Summary report for the experiment. 2. Check the Bayesian statistics/SmartStats section. | Report displays conversion rates, improvement, and probability to beat control. | High |
| **TC-03** | Functional | Heatmap data capture for click events. | Heatmap is enabled for the target page. | 1. Interact with the target page (click several elements). 2. Wait for data sync. 3. View Heatmap in VWO dashboard. | Clicks are visually represented as "hot spots" on the page elements. | Medium |
| **TC-04** | Functional | Session Recording PII masking validation. | Session Recording is enabled; privacy masking is active for input fields. | 1. Navigate to a page with a form. 2. Enter sensitive data (e.g., password). 3. View the recording in VWO. | Form input fields are masked (represented by asterisks or blocks) in the playback. | High |
| **TC-05** | Negative | Login attempt with invalid password. | User has a valid registered email. | 1. Go to Login page. 2. Enter valid email. 3. Enter incorrect password. 4. Click Sign in. | Error message "Your email, password, IP address or location did not match" is displayed. | High |
| **TC-06** | Boundary | Traffic Allocation set to 0% for a variant. | A/B Test setup in draft mode. | 1. Set Traffic Allocation for Var-A to 0%. 2. Launch test. 3. Browse the page as a visitor. | No visitor should ever see Var-A; 100% traffic goes to other active variants/control. | Medium |
| **TC-07** | Boundary | Traffic Allocation set to 100% for a single variant. | A/B Test setup with Control and one Variant. | 1. Set Variant traffic to 100%. 2. Launch test. 3. Browse the page. | All visitors see the Variant; Control receives 0 traffic. | Medium |
| **TC-08** | Edge | Overlapping experiments on the same URL. | Two different experiments targeting the same URL are active. | 1. Launch Exp-A on URL-1. 2. Launch Exp-B on URL-1. 3. Access URL-1 as a new visitor. | Platform correctly handles priorities or serves appropriate variants without conflict. | Low |
| **TC-09** | Functional | Real-time Targeting based on Geo-location (Country). | Targeting rule set to "Country == United Kingdom". | 1. Configure experiment with UK targeting. 2. Access page from a UK IP. 3. Access page from a USA IP. | UK visitor sees the experiment; USA visitor sees the original page (Control). | High |
| **TC-10** | Negative | Role-Based Access Control (RBAC) - Viewer attempting to edit. | User account assigned with "Viewer" role. | 1. Login as Viewer. 2. Navigate to an active experiment. 3. Attempt to click "Edit" or "Pause". | Edit/Pause buttons are disabled or an "Access Denied" message appears. | Medium |
| **TC-11** | Functional | Integration: Data push to Google Analytics. | VWO-GA integration is enabled in settings. | 1. Trigger an experiment variation as a visitor. 2. Check GA4 real-time events. | VWO Experiment/Variation ID is visible in the GA event parameters. | High |
| **TC-12** | Performance | Dashboard Load Time validation. | Dashboard contains multiple active campaigns and charts. | 1. Clear browser cache. 2. Login to VWO. 3. Navigate to the main Dashboard. | Dashboard components and charts load within 2 seconds. | Medium |
| **TC-13** | Functional | Split URL redirection logic. | Split URL test configured with redirect from Page-A to Page-B. | 1. Access Page-A. 2. Observe redirection. | 50% of visitors (if set) are redirected to Page-B automatically without a visible delay. | High |
| **TC-14** | Negative | JS Snippet missing on target page. | Website URL is defined in VWO but snippet is not installed. | 1. Launch a test for the URL. 2. Access the URL. | No error in the console, but the experiment does not trigger/render. | Medium |
| **TC-15** | Functional | Experiment Scheduling (Auto-start). | Experiment scheduled to start 5 minutes into the future. | 1. Set schedule. 2. Wait for the time. 3. Check status. | Experiment status automatically shifts from "Scheduled" to "Running". | Medium |
| **TC-16** | Edge | Multiple segmentation conditions (AND logic). | Rule: Region == "Asia" AND Device == "Mobile". | 1. Access from Mobile in Asia. 2. Access from Desktop in Asia. | Only Scenario 1 (Mobile+Asia) triggers the experiment. | Medium |
| **TC-17** | Functional | Two-Factor Authentication (2FA) verification. | 2FA is enabled for the account. | 1. Enter valid email/password. 2. Prompted for OTP. 3. Enter valid OTP. | User is redirected to Dashboard only after valid OTP entry. | High |
| **TC-18** | Boundary | Maximum character limit for Campaign Name. | Creating a new campaign. | 1. Enter a name with [NEEDS CLARIFICATION: Max characters]. 2. Save. | Name is either truncated or saved correctly if within limits. | Low |
| **TC-19** | Functional | On-page Survey trigger on Exit Intent. | Survey set to "Trigger on exit intent". | 1. Open target page. 2. Move cursor toward the browser close/tab close area. | Survey pop-up appears immediately before cursor reaches the top. | Medium |
| **TC-20** | Negative | Session Expiry behavior. | User is inactive for the session timeout period (e.g., 30 mins). | 1. Stay idle on Dashboard. 2. Click any menu item after timeout. | User is redirected to the Login page with a "Session Expired" message. | Medium |

---

**Gaps/Needs Clarification:**
- **Character Limits:** Max allowed characters for Campaign Name, Variant Name, and Goal names.
- **Session Timeout:** Exact duration of inactivity before session expiry.
- **Mobile SDK:** The context mentions mobile SDK as "future expansion", so tests focus on Web SDK for now.
