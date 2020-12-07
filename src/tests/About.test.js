import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(
      getByText(
        /this application simulates a pokédex, a digital encliclopedia containing all /i,
      ),
    ).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About pokédex/i)).toBeInTheDocument();
    expect(getByText(/About pokédex/i).tagName).toBe('H2');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/this application simulates a pokédex,/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type,/i)).toBeInTheDocument();
    expect(getByText(/this application simulates a pokédex,/i).tagName).toBe('P');
    expect(getByText(/One can filter Pokémons by type,/i).tagName).toBe('P');
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
