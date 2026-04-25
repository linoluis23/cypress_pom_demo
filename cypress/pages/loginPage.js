class LoginPage {
  // Definición de Selectores (Getters)
  get elements() {
    return {
      usernameInput: () => cy.get('#user-name'),
      passwordInput: () => cy.get('#password'),
      loginBtn: () => cy.get('#login-button'),
      errorMessage: () => cy.get('[data-test="error"]'),
    };
  }

  // Acciones o Métodos
  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickLogin() {
    this.elements.loginBtn().click();
  }

  // Método de flujo completo
  submitLogin(username, password) {
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }
}

export const loginPage = new LoginPage();