import { AppLogin } from './app.login.po';

describe('basic tests for todo app', () => {
  let page: AppLogin;

  beforeEach(() => {
    page = new AppLogin();

    page.navigateTo();
  });

  it('first todo item is "Go shopping"', () => {
    page.getFirstTodo().should('contain.text', 'Go shopping');
  });


});
