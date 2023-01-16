import { AppDashboard } from './app.dashboard.po';

describe('Basic Tests Dashboard', () => {
  let page: AppDashboard;

  beforeEach(() => {
    page = new AppDashboard();
    window.localStorage.setItem('Userdata', "test")
    page.navigateTo()
    cy.fixture('example.json').as('accounts')
  });

  it('should render all components', () => {
    page.getAccountComponent().should('be.visible')
    page.getGraphComopnent().should('be.visible')
    page.getSettingsKomponent().should('not.be.visible')
    page.getTransactionsComponent().should('be.visible')
  });

  it('should create new Account and show on Dashboard', () => {

  });
});
