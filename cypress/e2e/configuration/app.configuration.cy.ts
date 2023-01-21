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
    // Create new account
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
    page.getEditBtn().first().click()
    // should be visible on configuration
    page.getModalNewAccount().should('be.visible')
    page.getInputAccountName().clear()
    // Do a Edit on new account
    page.getInputAccountName().type('EditedAccount')
    page.getSubmitBtn().should('be.enabled')
    page.getSubmitBtn().click()
    page.getAccountName().first().should('have.text', ' EditedAccount ')
  });

  it('CRUD on new CategoryGroup"', () => {
    cy.visit('http://localhost:4200/configuration');
    // Create new category
    page.getBtnNewCategoryGroup().click()
    page.getModalNewCategory().should('be.visible')
    page.getCategorieSubmitBtn().should('be.disabled')
    page.getInputCategoryName().type('Categorie for e2e testing')
    page.getSelectColorCategorie().select('red')
    page.getCategorieSubmitBtn().should('be.enabled')
    page.getCategorieSubmitBtn().click()
    // Is visible on configuration
    page.getNewCategoryGroup().should('be.visible')
    page.getEditCategoryGroup().first().click()
    page.getInputCategoryName().clear()
    // Do a Edit on new Category
    page.getInputCategoryName().type('EditedCategory')
    page.getCategorieSubmitBtn().click()
    page.getCategoryName().first().should('have.text', 'EditedCategory')
    page.getAddCategory().first().click()
    page.getNewItemModal().should('be.visible')
    page.getSubmitBtnCategoryItem().should('be.disabled')
    page.getInpuNameCategory().type('TestItem')
    page.getSubmitBtnCategoryItem().should('be.enabled')
    page.getSubmitBtnCategoryItem().click()
    page.getCategoryItem().should('be.visible')
  });

  it('CRUD on new CsvMask"', () => {
    // Create new csvMask
    page.getBtnNewCsv().click()
    page.getModalNewCsv().should('be.visible')
    page.getInputNameNewCsv().type('CypressMask')
    page.getSaveCsvMaskBtn().should('be.disabled')
    page.getInputDelimiter().type('testDelimiter')
    page.getInputMask().type('TestMask')
    page.getInputDateMask().type('TestDateMask')
    page.getSaveCsvMaskBtn().should('be.enabled')
    page.getSaveCsvMaskBtn().click()
    // Is visible on configuration
    page.getNewCsvMask().should('be.visible')
    // Do a Edit on new csvMask
    page.getEditCsvMask().first().click()
    page.getInputNameNewCsv().clear()
    page.getInputNameNewCsv().type('EditedCypressMask')
    page.getEditCsvMaskBtn().click()
    page.getNewCsvMask().first().should('have.text', 'EditedCypressMask')
  });
});
