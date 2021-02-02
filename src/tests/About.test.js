import React from 'react';
// import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const numberOfParagraphs = 2;
    expect(container.querySelectorAll('p').length).toBe(numberOfParagraphs);
  });
  it('testa se a página contém a imagem de uma pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');

    expect(image.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
