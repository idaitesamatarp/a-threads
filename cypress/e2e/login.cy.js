/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login');

    // element should be visible in login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Sign in$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Sign in$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email is required, cannot be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testemail');

    cy.get('button').contains(/^Sign in$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password is required, cannot be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testemail');
    cy.get('input[placeholder="Password"]').type('wrongPassword');

    cy.get('button').contains(/^Sign in$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('ites@mail.com');
    cy.get('input[placeholder="Password"]').type('123456');

    cy.get('button').contains(/^Sign in$/).click();
    cy.get('nav').find('a[data-tooltip-id="thread"]').should('be.visible');
    cy.get('nav').find('a[data-tooltip-id="leaderboards"]').should('be.visible');
    cy.get('nav').find('a[data-tooltip-id="signin_out"]').should('be.visible');
  });
});