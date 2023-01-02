import { AppConfiguration } from './app.configuration.po';

describe('Basic tests for configuration', () => {
  let page: AppConfiguration;

  beforeEach(() => {
    page = new AppConfiguration();
    window.localStorage.setItem('Userdata', "test")
    page.navigateTo();
  });

  it('should render all components"', () => {
    page.getAccountComponent().should('be.visible')
    page.getCategoryComponent().should('be.visible')
    page.getCsvComponent().should('be.visible')
  });

  it('should render all warnings"', () => {
    page.getAccountWarning().should('be.visible')
    page.getConfigurationtWarning().should('be.visible')
    page.getCsvWarning().should('be.visible')
  });


  it('CRUD on new Account"', () => {


    page.getBtnNewModal().click()
    page.getModalNewAccount().should('be.visible')
    page.getSubmitBtn().should('be.disabled')
    page.getInputAccountName().click()
    page.getInputAccountName().should('have.css', 'border-color', 'rgb(241, 70, 104)')
    page.getInputAccountName().type('TestAccount')
    page.getInputAccountName().should('have.css', 'border-color', 'rgb(72, 199, 142)')
    page.getInputAccountShort().type('test')
    page.getInputAccountColor().select('green')
    page.getInputDescription().type('TestAccount for e2e testing')
    page.getInputAmount().type("250")
    page.getInputCsv().select('No CsvMask')
    page.getSubmitBtn().should('be.enabled')
    page.getSubmitBtn().click()
    page.getNewAccount().should('be.visible')

    page.getEditBtn().click()
    cy.pause()
    page.getModalNewAccount().should('be.visible')
    page.getInputAccountName().clear()
    page.getInputAccountName().type('EditedAccount')
    page.getSubmitBtn().should('be.enabled')
    page.getSubmitBtn().click()
    cy.pause()
    page.getAccountName().should('have.text', "EditedAccount")



      // Btn is visible
      // Csv Update is successful
    });

    it('should do a successful Edit on Test Account"', () => {

    });







  it('should create and validate new CategoryGroup"', () => {



  });




  // Maximale Anzahl Accounts / Categorien
  // Keine Eintraege vorhanden
  // Updates erfolgreich durchfuehren - keine Aenderungen an Subklassen

  // Firestore ist nicht verfuegbar --> was nun ???

  // formulare ein neuer eintrag mitselbem namen -> evtl. mit validator loesen


});
