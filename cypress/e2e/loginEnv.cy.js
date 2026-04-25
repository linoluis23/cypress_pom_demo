import { loginPage } from '../pages/LoginPage';

describe('Módulo de Autenticación entornos dev-qa', () => {
  
  // Cargamos los datos una sola vez para toda la suite
  beforeEach(() => {
    cy.fixture('users').as('data');
    //testData = data;
    cy.visit('/'); // La URL cambia automáticamente según el archivo de config (dev/qa)
  });

  it('Login exitoso - Escenario de humo', function() {
    // 1. Información de contexto (Log en la consola de Cypress)
    cy.log(`Ejecutando en ambiente de: **${Cypress.env('envName')}**`);

    // 2. Ejecución usando el Page Object y los datos del Fixture
    const {username, password} = this.data.validUser;
        loginPage.submitLogin(username, password);

    // 3. Validaciones (Assertions)
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

    it('Login No exitoso - Escenario de humo 2', function() {
    // 1. Información de contexto (Log en la consola de Cypress)
    cy.log(`Ejecutando en ambiente de: **${Cypress.env('envName')}**`);

    // 2. Ejecución usando el Page Object y los datos del Fixture
    const {username, password} = this.data.lockedUser;
        loginPage.submitLogin(username, password);

    // 3. Validaciones (Assertions)
        loginPage.elements.errorMessage().should('contain', 'Sorry, this user has been locked out.');

  });

  it('Validación de campos obligatorios', () => {
    // Aquí probamos acciones atómicas del POM
    loginPage.clickLogin();
    
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Username is required');
  });
});