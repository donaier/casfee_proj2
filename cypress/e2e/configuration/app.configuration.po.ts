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
    return cy.get('.account')
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



  getParagraph() {
    return cy.get('app-root h1');
  }

  getFirstTodo() {
    return cy.get('mat-list-item').first();
  }

  getLastTodo() {
    return cy.get('mat-list-item').last();
  }

  getAddTodo() {
    return cy.get('.mat-input-element').first();
  }

  getAddTodoButton() {
    return cy.get('.mat-button').first();
  }

  getFirstTodoCheckbox() {
    return cy.get('mat-checkbox').first();
  }

  getNavBtn(){
    return cy.get('[data-cy="testbtn"]');
  }

  getSidebar(){
    return cy.get('[data-cy="sidenav"]');
  }

}
