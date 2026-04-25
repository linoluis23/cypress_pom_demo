import { loginPage } from '../pages/LoginPage';

describe('Monulo test nativo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('Iniciar sesión con credenciales válidas', () => {
    loginPage.submitLogin('standard_user', 'secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  it('Mostrar error con credenciales inválidas', () => {
    loginPage.typeUsername('usuario_incorrecto');
    loginPage.typePassword('clave_incorrecta');
    loginPage.clickLogin();
    loginPage.elements.errorMessage().should('be.visible');
  });
});