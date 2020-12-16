import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('2 - Testando o arquivo About.js', () => {
  test('2.1 - Teste se a página contém as informações sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const aboutOnly = getAllByText(/Pokédex/i);
    expect(aboutOnly[0]).toBeInTheDocument();
  });
  it('2.2 - Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const h2 = getByText(/About Pokédex/i);
    expect(h2).toBeInTheDocument();
  });
  it('2.3 - Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const qtdP = 2;
    const p = getAllByTestId('about-pokemon');
    expect(p.length).toEqual(qtdP);
  });
  it('2.4 - Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
