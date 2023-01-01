import { AppNavigation } from './app.navigation.po';

describe('Basic Tests Navigation', () => {
  let page: AppNavigation

  beforeEach(() => {
    page = new AppNavigation();
    window.localStorage.setItem('Userdata', "test")
    page.navigateTo()
  });

  describe('Test Navigation', () => {

    it('should render Navigation"', () => {
      cy.viewport(1200, 1200)
      page.getNavigation().should('be.visible')
    });

    it('should Navigate to Configuration"', () => {
      cy.viewport(1200, 1200)
      page.getNavConfiguration().click()
      cy.url().should('include', '/configuration')
    });

    it('should Navigate to Dashboard"', () => {
      cy.viewport(1200, 1200)
      page.getNavDashboard().click()
      cy.url().should('include', '/dashboard')
    });

    it('should open settings"', () => {
      cy.viewport(1200, 1200)
      page.getNavDashboardSettings().click()
      page.getSettingsModal().should('be.visible')
    });

    it('should do successful Logout"', () => {
      cy.viewport(1200, 1200)
      page.getNavLogout().click()
      page.getNavigation().should('not.exist')
      cy.url().should('include', '/login')
    });

    it('should render Hamburger"', () => {
      page.getNavHamburger().should('be.visible')
    });

    it('should open and close menu"', () => {
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
    });

  })

});
