export class AppLogin {
  navigateTo() {
    return cy.visit('http://localhost:4200/')
  }

  getLoginSection() {
    return cy.get('.section')
  }

  getInputEmail(){
    return cy.get('[data-cy="Email"]')
  }

  getInputPassword(){
    return cy.get('[data-cy="Password"]')
  }

  getSubmitBtn(){
    return cy.get('.button')
  }

  getTitle(){
    return cy.get('.title')
  }

  getEmailTitle(){
    return cy.get('.label_email')
  }

  getPasswordTitle(){
    return cy.get('.label_password')
  }

  /*

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
   */
}

