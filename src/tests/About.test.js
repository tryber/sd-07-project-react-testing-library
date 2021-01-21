import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Testa se a página contém um h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);

    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('Testa se a página contêm dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const numberOfParagraphs = 2;

    expect(container.querySelectorAll('p').length).toBe(numberOfParagraphs);
  });

  it('testa se a página contém a imagem de uma pokédex', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');

    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
