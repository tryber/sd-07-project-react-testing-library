import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('testa se a página possui as informações sobre a pokedex', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
  it('testa se a página contém um h2 com o texto "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('testa se a página contêm dois parágrafos com texto sobre a Pokédex', () => {
    const part1 = 'This application simulates a Pokédex,';
    const part2 = 'a digital encliclopedia containing all Pokémons';
    const newParag = `${part1} ${part2}`;
    const { getByText } = render(<About />);
    const
      parag1 = getByText(newParag);
    const
      parag2 = getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
      );

    expect(parag1.tagName).toBe('P');
    expect(parag2.tagName).toBe('P');
  });
  it('testa se a página contém a imagem de uma pokédex', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
