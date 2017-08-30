import { EscolasappPage } from './app.po';

describe('escolasapp App', () => {
  let page: EscolasappPage;

  beforeEach(() => {
    page = new EscolasappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Bem-vindo à Plataforma de avaliação das schoolsLocation da RMSP!');
  });
});
