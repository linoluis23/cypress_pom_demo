import { loginPage } from '../pages/LoginPage';

describe('Pruebas de Login con Fixtures JSON', () => {
  
  beforeEach(() => {
    // Cargamos el archivo de la carpeta fixtures
    cy.fixture('users').as('userData');
    cy.visit('/');
  });

  it('Login exitoso con usuario válido', function() {
    // IMPORTANTE: Para usar 'this.userData' debes usar 'function()' no arrow functions '() =>'
    const user = this.userData.validUser;
    
    loginPage.submitLogin(user.username, user.password);
    cy.url().should('include', '/inventory.html');
  });

  it('Error con usuario bloqueado', function() {
    const user = this.userData.lockedUser;
    
    loginPage.submitLogin(user.username, user.password);
    loginPage.elements.errorMessage().should('contain', 'Sorry, this user has been locked out.');
  });
});