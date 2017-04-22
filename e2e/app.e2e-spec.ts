import { OasTestPage } from './app.po';

describe('oas-test App', () => {
  let page: OasTestPage;

  beforeEach(() => {
    page = new OasTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
