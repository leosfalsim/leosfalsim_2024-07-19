describe('Home Page and Password Validator Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should display the home page and fill out the password validator form', () => {
    cy.get('app-password-validator').should('be.visible');

    cy.get('.password-form__logo').should('be.visible');

    cy.get('.password-form__title').should('be.visible').and('contain.text', 'Valide sua Senha');

    cy.get('input#name').type('Teste');
    cy.get('input#email').type('teste@teste.com');
    cy.get('input#password').type('222222');

    cy.get('button.password-form__submit', { timeout: 10000 }).should('not.be.disabled');

    cy.get('button.password-form__submit').click();

    cy.wait(5000);

    cy.url().should('include', '/dashboard');
  });

  it('should display an error message for invalid form submission', () => {

    cy.get('app-password-validator').should('be.visible');

    cy.get('input#name').type('Teste');
    cy.get('input#password').type('184759');

    cy.get('button.password-form__submit').should('be.disabled');

    cy.get('button.password-form__submit').click({ force: true });

    cy.get('.invalid-feedback.password-form__error').should('contain.text', 'Senha inválida:');
    cy.get('.invalid-feedback.password-form__error').should('contain.text', 'Senha deve conter 2 dígitos adjacentes iguais');
    cy.get('.invalid-feedback.password-form__error').should('contain.text', 'Senha deve conter dígitos em uma sequência crescente ou de mesmo valor');
  });

  it('should display password validation errors for invalid password', () => {
    cy.get('app-password-validator').should('be.visible');

    cy.get('input#name').type('Teste');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('12345');

    cy.get('button.password-form__submit').should('be.disabled');

    cy.get('button.password-form__submit').click({ force: true });

    cy.get('.invalid-feedback.password-form__error').should('contain.text', 'Senha inválida');
  });
});
