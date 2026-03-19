package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.LoginPage;
import java.time.Duration;

@Epic("Salesforce Login Module")
@Feature("Negative Login Validation")
public class InvalidLoginTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeMethod
    @Step("Setting up the browser and navigating to Salesforce")
    public void setup() {
        try {
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--remote-allow-origins=*");
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            driver.manage().window().maximize();
            driver.get("https://login.salesforce.com/?locale=in");
            loginPage = new LoginPage(driver);
        } catch (Exception e) {
            throw new RuntimeException("Setup failed: " + e.getMessage());
        }
    }

    @Test(priority = 1, description = "Login with invalid username and password")
    @Severity(SeverityLevel.CRITICAL)
    @Description("Verify that an appropriate error message is displayed when invalid credentials are provided.")
    public void testInvalidLoginCredentials() {
        try {
            loginPage.enterEmail("invalid_salesforce_user@test.abc");
            loginPage.enterPassword("WrongPassword123!");
            loginPage.clickLogin();

            String errorText = loginPage.getErrorMessage();
            Assert.assertTrue(errorText.contains("check your username and password"),
                    "Error message text was not displayed correctly.");
        } catch (Exception e) {
            Assert.fail("Invalid login test failed: " + e.getMessage());
        }
    }

    @Test(priority = 2, description = "Login with empty email and password")
    @Severity(SeverityLevel.NORMAL)
    @Description("Verify that login fails and errors are correctly triggered for empty inputs.")
    public void testEmptyCredentials() {
        try {
            loginPage.enterEmail("");
            loginPage.enterPassword("");
            loginPage.clickLogin();

            String errorText = loginPage.getErrorMessage();
            Assert.assertTrue(errorText.length() > 0, "No error message displayed for empty credentials.");
        } catch (Exception e) {
            Assert.fail("Empty credentials test failed: " + e.getMessage());
        }
    }

    @AfterMethod
    @Step("Cleaning up the browser session")
    public void tearDown() {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (Exception e) {
            System.err.println("Teardown failed: " + e.getMessage());
        }
    }
}
