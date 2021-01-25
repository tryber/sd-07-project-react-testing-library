import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  it('Verifica se a página contém informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const pokedex = getByText(/digital encliclopedia containing all/);
    expect(pokedex).toBeInTheDocument();
  });

  it('Verifica se a página contém um heading <h2> com o texto "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const headingH2 = getByRole('heading', { name: 'About Pokédex' });
    expect(headingH2.tagName).toBe('H2');
  });

  it('Verifica se a página contém a seguinte imagem de uma "Pokédex"', () => {
    const { getByRole } = render(<About />);
    const linkImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toBe(linkImage);
  });
});
