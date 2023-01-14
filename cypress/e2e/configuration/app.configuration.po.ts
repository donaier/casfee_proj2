export class AppConfiguration {
  navigateTo() {
    return cy.visit('http://localhost:4200/configuration');
  }

// Account Component
  getAccountComponent(){
    return cy.get('[data-cy="AccountComponent"]')
  }

  getAccountWarning(){
    return cy.get('.card').eq(1)
  }

  getBtnNewHeader() {
    return cy.get('.button').eq(0)
  }

  getBtnNewModal() {
    return cy.get('.new-account')
  }

  getModalNewAccount(){
    return cy.get('.modal-account')
  }

  getInputAccountName(){
    return cy.get('#input-name')
  }

  getInputAccountShort(){
    return cy.get('#input-short')
  }

  getInputAccountColor(){
    return cy.get('#select-color')
  }

  getInputDescription(){
    return cy.get('#input-description')
  }

  getInputAmount(){
    return cy.get('#input-amount')
  }

  getInputCsv(){
    return cy.get('#csvMaskSelect')
  }

  getSubmitBtn(){
    return cy.get('.btn-save')
  }

  getEditBtn(){
    return cy.get('.edit-account')
  }

  getNewAccount(){
    return cy.get('.account-card')
  }

  getAccountName(){
    return cy.get('[data-cy="account-name"]');
  }

// Category Component
  getCategoryComponent() {
    return cy.get('[data-cy="CategoryComponent"]');
  }

  getConfigurationtWarning() {
    return cy.get('.card').eq(1);
  }

  getModalNewCategory() {
    return cy.get('.modal-category')
  }

  getBtnNewCategoryGroup() {
    return cy.get('.new-categoryGroup')
  }

  getInputCategoryName(){
    return cy.get('#input-name')
  }

  getSelectColorCategorie(){
    return cy.get('#select-color')
  }

  getCategorieSubmitBtn(){
    return cy.get('.submit-category')
  }

  getNewCategoryGroup(){
    return cy.get('.categoryGroup')
  }

  getEditCategoryGroup(){
    return cy.get('.fa-edit')
  }

  getAddCategory(){
    return cy.get('.fa-plus')
  }

  getCategoryName(){
    return cy.get('.pb-3')
  }

  getNewItemModal(){
    return cy.get('.item-modal')
  }

  getInpuNameCategory(){
    return cy.get('#input-name-subcategory')
  }

  getSubmitBtnCategoryItem(){
    return cy.get('.submit-subcategory')
  }

  getCategoryItem(){
    return cy.get('.category-item')
  }


// Csv Component
  getCsvComponent(){
    return cy.get('[data-cy="CsvComponent"]');
  }

  getCsvWarning(){
    return cy.get('.card').eq(1);
  }

  getModalNewCsv(){
    return cy.get('.modal-csv')
  }

  getBtnNewCsv(){
    return cy.get('.new-csvMask')
  }

 getInputNameNewCsv(){
    return cy.get('#input-name-csvMask')
  }

  getSaveCsvMaskBtn(){
    return cy.get('.button-save')
  }

  getInputDelimiter(){
    return cy.get('#input-delimiter')
  }

  getInputMask(){
    return cy.get('#input-mask')
  }

  getInputDateMask(){
    return cy.get('#date-mask')
  }

  getNewCsvMask(){
    return cy.get('.csvMask')
  }

  getEditCsvMask(){
    return cy.get('.editcsv')
  }

  getEditCsvMaskBtn(){
    return cy.get('.button-edit')
  }

}
