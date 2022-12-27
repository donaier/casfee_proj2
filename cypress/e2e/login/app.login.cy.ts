import { AppLogin } from './app.login.po';

describe('basic tests for todo app', () => {
  let page: AppLogin;

  beforeEach(() => {
    page = new AppLogin();
    page.navigateTo();
  });

  describe('Some Test', () => {
    it('Adds document to test_hello_world collection of Firestore', () => {
      cy.callFirestore('add', 'test_hello_world', { some: 'value' });
    });
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

  it('should do correct state changes"', () => {
    page.getInputEmail().click()
    page.getInputEmail().should('have.css', 'border-color', 'rgb(255, 0, 0)')
    page.getInputPassword().click()
    page.getInputPassword().should('have.css', 'border-color', 'rgb(255, 0, 0)')
    page.getSubmitBtn().should('be.disabled')
  });

  it('should do correct validation"', () => {
    page.getInputEmail().type('test')
    page.getInputEmail().should('have.css', 'border-color', 'rgb(255, 0, 0)')
    page.getInputEmail().type('test@test.ch')
    page.getInputEmail().should('have.css', 'border-color', 'rgb(53, 179, 53)')
    page.getSubmitBtn().should('be.disabled')
    page.getInputPassword().type('1234')
    page.getInputPassword().should('have.css', 'border-color', 'rgb(255, 0, 0)')
    page.getInputPassword().type('123456')
    page.getInputPassword().should('have.css', 'border-color', 'rgb(53, 179, 53)')
    page.getSubmitBtn().should('be.enabled')
  });

  it('should do a succesfull Login"', () => {
    page.getInputEmail().type('admin@admin.ch')
    page.getSubmitBtn().should('be.disabled')
    page.getInputPassword().type('123456')
    page.getSubmitBtn().should('be.enabled')
    page.getSubmitBtn().click()
  //  cy.url().should('include', '/dashboard');
  });






  // Should reject a login with wrong data

  // Should check validity

  // Check Security - URLs should do a redirect , redirect to login if logged out




});
