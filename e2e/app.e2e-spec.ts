import { PharmaSalesPage } from './app.po';

describe('pharma-sales App', () => {
  let page: PharmaSalesPage;

  beforeEach(() => {
    page = new PharmaSalesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
