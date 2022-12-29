export class AppDashboard {
  navigateTo() {
    return cy.visit('http://localhost:4200/dashboard');
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
