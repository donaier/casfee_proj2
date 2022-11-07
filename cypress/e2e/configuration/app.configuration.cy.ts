import { AppConfiguration } from './app.configuration.po';

describe('basic tests for todo app', () => {
  let page: AppConfiguration;

  beforeEach(() => {
    page = new AppConfiguration();

    page.navigateTo();
  });

  it('first todo item is "Go shopping"', () => {
    page.getFirstTodo().should('contain.text', 'Go shopping');
  });


});
