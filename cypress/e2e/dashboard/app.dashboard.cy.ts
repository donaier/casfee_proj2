import { AppDashboard } from './app.dashboard.po';

describe('Basic Tests Dashboard', () => {
  let page: AppDashboard;

  beforeEach(() => {
    page = new AppDashboard();
    window.localStorage.setItem('Userdata', "test")
    page.navigateTo()

  //  page.navigateTo();
  });

it('should do a login', () => {

  });

});
