import { AppLogin } from './app.login.po';

describe('Basic tests for login', () => {
  let page: AppLogin;

  beforeEach(() => {
    page = new AppLogin();
    page.navigateTo();
  });

  it('should render all elemets"', () => {
    page.getLoginSection().should('be.visible')
    page.getTitle().should('be.visible')
    page.getInputEmail().should('be.visible')
    page.getInputPassword().should('be.visible')
    page.getSubmitBtn().should('be.visible')
    page.getEmailTitle().should('be.visible')
    page.getPasswordTitle().should('be.visible')
  });

  it('should reject empty Form"', () => {
    page.getInputEmail().click()
    page.getSubmitBtn().should('be.disabled')
    page.getLoginSection().click()
    page.getSubmitBtn().should('be.disabled')
  });

  it('should do a correct redirect"', () => {
    cy.visit('http://localhost:4200/dashboard');
    cy.url().should('include', '/login');
    cy.visit('http://localhost:4200/configuration');
    cy.url().should('include', '/login');
  });

  it('should do correct validation"', () => {
    page.getInputEmail().type('test')
    page.getInputEmail().should('have.css', 'border-color', 'rgb(241, 70, 104)')
    page.getInputEmail().type('test@test.ch')
    page.getInputEmail().should('have.css', 'border-color', 'rgb(72, 199, 142)')
    page.getSubmitBtn().should('be.disabled')
    page.getInputPassword().type('1234')
    page.getInputPassword().should('have.css', 'border-color', 'rgb(241, 70, 104)')
    page.getInputPassword().type('123456')
    page.getInputPassword().should('have.css', 'border-color', 'rgb(72, 199, 142)')
    page.getSubmitBtn().should('be.enabled')
  });

  it('should do a succesfull Login"', () => {
    page.getInputEmail().type('admin@admin.ch')
    page.getSubmitBtn().should('be.disabled')
    page.getInputPassword().type('123456')
    page.getSubmitBtn().should('be.enabled')
    page.getSubmitBtn().click()
    cy.url().should('include', '/dashboard'); // Anmerkung wurde bei mir durch AntiVirus blockiert, erlauben dann funktionnierts
  });

  // Should reject a login with wrong data

  // Should check validity

  // Check Security - URLs should do a redirect , redirect to login if logged out



});
