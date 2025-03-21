describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/password-validator');
  });

  it('should fill out the form and display the header', () => {
    cy.get('input#name').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('222222');

    cy.get('button.password-form__submit').click();

    cy.wait(5000);

    cy.url().should('include', '/dashboard');

    cy.get('.header', { timeout: 10000 }).should('be.visible');
    cy.get('.logo-container__logo', { timeout: 10000 }).should('be.visible');
    cy.get('.user-info', { timeout: 10000 }).should('be.visible');
  });

  it('should display the user name after form submission', () => {

    cy.get('input#name').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('222222');

    cy.get('button.password-form__submit').should('not.be.disabled');

    cy.get('button.password-form__submit').click({ force: true });

    cy.wait(5000);

    cy.get('.user-name', { timeout: 10000 }).should('contain.text', 'testuser');
  });

  it('should show the user menu when clicking on user-info', () => {

    cy.get('input#name').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('222222');

    cy.get('button.password-form__submit').should('not.be.disabled');

    cy.get('button.password-form__submit').click({ force: true });

    cy.wait(5000);

    cy.get('.user-info', { timeout: 10000 }).click();
    cy.get('.user-menu', { timeout: 10000 }).should('be.visible');
    cy.get('.user-menu', { timeout: 10000 }).should('contain.text', 'Sair');
  });

  it('should logout and redirect to /home when clicking on logout', () => {

    cy.get('input#name').type('testuser');
    cy.get('input#email').type('testuser@example.com');
    cy.get('input#password').type('222222');

    cy.get('button.password-form__submit').should('not.be.disabled');

    cy.get('button.password-form__submit').click({ force: true });

    cy.wait(5000);

    cy.get('.user-info').click();
    cy.get('.user-menu').click();

    cy.url().should('include', '/home');
  });
});
