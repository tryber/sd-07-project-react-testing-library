import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando se a página contém informações sobre a pokedex', () => {
  it('Testando se a página contém texto about pokédex', () => {
    const { getByText } = render(<About />);
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('Testando se a página contém os paragráfos sobre pokédex', () => {
    const about = render(<About />);
    const TwoParagraph = 2;
    expect(about.container.querySelectorAll('p')
      .length).toBe(TwoParagraph);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const img = document.querySelector('img');
    expect(img.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
