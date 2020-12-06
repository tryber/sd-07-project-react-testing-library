import React from 'react';
import { fireEvent, cleanup, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('2. Testando o arquivo About.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
  });
  afterEach(cleanup);
  it('A página contém as informações sobre a Pokédex.', () => {
    const pokedex = screen.queryAllByText(/Pokédex/i);
    expect(pokedex).not.toBeNull();
  });
  it('A página contém um heading h2 com o texto About Pokédex.', () => {
    const h2 = screen.getByRole('heading', { name: /About/i }, { level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const p1 = screen.getByText(/one can filter pokémons by type,/i);
    const p2 = screen.getByText(/encliclopedia containing all Pokémons/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb'
    + '/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toBe(imgSrc);
  });
});
