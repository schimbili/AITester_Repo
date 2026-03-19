package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import io.qameta.allure.Step;
import java.time.Duration;

public class LoginPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Strict [Mandatory] - Use ONLY XPath as specified in the RICEPOT prompt
    @FindBy(xpath = "//input[@id='username']") 
    private WebElement usernameInput;

    @FindBy(xpath = "//input[@id='password']") 
    private WebElement passwordInput;

    @FindBy(xpath = "//input[@id='Login']") 
    private WebElement loginButton;

    @FindBy(xpath = "//input[@id='rememberUn']") 
    private WebElement rememberMeCheckbox;

    @FindBy(xpath = "//div[@id='error']") 
    private WebElement errorMessage;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    @Step("Logged in with username: {0}")
    public void enterEmail(String email) {
        try {
            wait.until(ExpectedConditions.visibilityOf(usernameInput));
            usernameInput.clear();
            usernameInput.sendKeys(email);
        } catch (Exception e) {
            throw new RuntimeException("Failed to enter email: " + e.getMessage());
        }
    }

    @Step("Entering password")
    public void enterPassword(String password) {
        try {
            wait.until(ExpectedConditions.visibilityOf(passwordInput));
            passwordInput.clear();
            passwordInput.sendKeys(password);
        } catch (Exception e) {
            throw new RuntimeException("Failed to enter password: " + e.getMessage());
        }
    }

    @Step("Clicking Login button")
    public void clickLogin() {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(loginButton));
            loginButton.click();
        } catch (Exception e) {
            throw new RuntimeException("Failed to click login: " + e.getMessage());
        }
    }

    @Step("Toggling Remember Me")
    public void toggleRememberMe() {
        try {
            wait.until(ExpectedConditions.elementToBeClickable(rememberMeCheckbox));
            if (!rememberMeCheckbox.isSelected()) {
                rememberMeCheckbox.click();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to toggle Remember Me: " + e.getMessage());
        }
    }

    @Step("Checking for error message")
    public String getErrorMessage() {
        try {
            wait.until(ExpectedConditions.visibilityOf(errorMessage));
            return errorMessage.getText();
        } catch (Exception e) {
            return "No error message displayed";
        }
    }

    @Step("Performing Login with email: {0} and password: {1}")
    public void doLogin(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        clickLogin();
    }
}
