import { AppDashboard } from './app.dashboard.po';

describe('basic tests for todo app', () => {
  let page: AppDashboard;

  beforeEach(() => {
    page = new AppDashboard();
 // setlocalstorage
    page.navigateTo();
  });

  it('first todo item is "Go shopping"', () => {
    page.getFirstTodo().should('contain.text', 'Go shopping');
  });


});
