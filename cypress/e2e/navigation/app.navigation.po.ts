export class AppNavigation {

  navigateTo() {
    return cy.visit('http://localhost:4200/dashboard');
  }

  getBody() {
    return cy.get('body');
  }

  getNavigation(){
    return cy.get('.navbar');
  }

  getNavMenu(){
    return cy.get('.navbar-menu');
  }

  getNavHamburger(){
    return cy.get('.navbar-burger').first();
  }

  getNavDashboard(){
    return cy.get('.navbar-item').eq(2)
  }

  getNavDashboardSettings(){
    return cy.get('.navbar-item').eq(3)
  }

  getSettingsModal(){
    return cy.get('.dashboard-filter');
  }

  getNavConfiguration(){
    return cy.get('.navbar-item').eq(4);
  }

  getNavManual(){
    return cy.get('.navbar-item').eq(5);
  }

  getNavLogout(){
    return cy.get('.navbar-item').eq(6);
  }

  getNavThemes(){
    return cy.get('.navbar-item').eq(7);
  }

  getNavThemeContent(){
    return cy.get('[data-cy="theme_content"]');
  }

  getDropdown(){
    return cy.get('.navbar-dropdown')
  }

  getDarkTheme(){
    return cy.get('.navbar-item').eq(9);
  }
}
