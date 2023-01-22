import { AppNavigation } from './app.navigation.po';

describe('Basic Tests Navigation', () => {
  let page: AppNavigation

  beforeEach(() => {
    page = new AppNavigation();
    window.localStorage.setItem('Userdata', "test")
    page.navigateTo()
    cy.viewport(1200, 1200)
  });

  describe('Test Navigation', () => {
    it('should render Navigation"', () => {
      page.getNavigation().should('be.visible')
    });

    it('should Navigate to Home"', () => {
      page.getNavHome().click()
      cy.url().should('include', '/home')
    });

    it('should Navigate to Configuration"', () => {
      page.getNavConfiguration().click()
      cy.url().should('include', '/configuration')
    });

    it('should Navigate to Dashboard"', () => {
      page.getNavDashboard().click()
      cy.url().should('include', '/dashboard')
    });

    it('should Navigate to Manual"', () => {
      page.getNavManual().click()
      cy.url().should('include', '/manual')
    });

    it('should do successful Logout"', () => {
      page.getNavLogout().click()
      page.getNavigation().should('not.exist')
      cy.url().should('include', '/login')
    });

    it('should render Hamburger"', () => {
      cy.viewport(800, 800)
      page.getNavHamburger().should('be.visible')
    });

    it('should open and close menu"', () => {
      cy.viewport(800, 800)
      page.getNavHamburger().click()
      page.getNavMenu().should('have.class', 'is-active')
      page.getNavHamburger().click()
      page.getNavMenu().should('not.have.class', 'is-active')
    });

    it('should change Theme"', () => {
      cy.viewport(800, 800)
      page.getNavHamburger().click()
      page.getDarkTheme().click()
      page.getNavThemeContent().should('contain.text', "Dark Theme")
      page.getBody().should('have.class', 'dark-theme')
      page.getNavHamburger().click()
    });

  })
});
