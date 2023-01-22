export class AppLogin {
  navigateTo() {
    return cy.visit('http://localhost:4200/')
  }

  getLoginSection() {
    return cy.get('.section')
  }

  getInputEmail() {
    return cy.get('[data-cy="Email"]')
  }

  getInputPassword() {
    return cy.get('[data-cy="Password"]')
  }

  getSubmitBtn() {
    return cy.get('.button')
  }

  getTitle() {
    return cy.get('.title')
  }

  getEmailTitle() {
    return cy.get('.label_email')
  }

  getPasswordTitle() {
    return cy.get('.label_password')
  }

  getCredentialsFail() {
    return cy.get('.validation')
  }
}

