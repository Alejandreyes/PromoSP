import { PromoPage } from './app.po';

describe('promo App', () => {
  let page: PromoPage;

  beforeEach(() => {
    page = new PromoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
