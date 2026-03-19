# Salesforce Automation Framework

This is an enterprise-level Selenium automation framework for the Salesforce login page.

## Tech Stack
- **Language:** Java 8
- **Automation:** Selenium WebDriver
- **Test Runner:** TestNG
- **Build Tool:** Maven
- **Reporting:** Allure

## Project Structure
- `src/main/java/pages`: Contains Page Object classes using PageFactory and XPath.
- `src/test/java/tests`: Contains TestNG scripts for Valid and Invalid login scenarios.
- `testng.xml`: Defines the test suite execution.

## How to Run Tests
1. Ensure Chrome browser is installed.
2. Run the tests using Maven:
   ```bash
   mvn clean test
   ```
3. To generate and view the Allure report:
   ```bash
   allure serve allure-results
   ```
