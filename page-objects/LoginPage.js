class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginForm = page.getByTestId('login-form');
    this.usernameInput = page.getByTestId('username-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.notification = page.getByTestId('notification');
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getNotificationText() {
    return this.notification.textContent();
  }

  async isNotificationVisible(timeout = 5000) { // Default timeout of 5 seconds
    try {
      await this.notification.waitFor({ state: 'visible', timeout: timeout });
      return true;
    } catch (error) {
      // If the timeout expires, the element is not visible within the given time
      return false;
    }
  }

  async isLoginFormVisible() {
    return this.loginForm.isVisible();
  }

  async isUsernameInputVisible() {
    return this.usernameInput.isVisible();
  }

  async isPasswordInputVisible() {
    return this.passwordInput.isVisible();
  }

  async isLoginButtonVisible() {
    return this.loginButton.isVisible();
  }
}

module.exports = LoginPage;