import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando arquivo about', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const message = getByText(/About Pokédex/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto /About Pokédex/', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = /This application simulates a Pokédex/i;
    const p2 = /One can filter Pokémons by type/i;

    expect(getByText(p1)).toBeInTheDocument();
    expect(getByText(p2)).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');

    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
