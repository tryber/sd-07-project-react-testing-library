import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('2. Testando o arquivo About.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
  });
  afterEach(cleanup);
  it('A página contém as informações sobre a Pokédex.', () => {
    const pokedex = screen.queryAllByText(/Pokédex/i);
    expect(pokedex).not.toBeNull();
  });
  it('A página contém um heading h2 com o texto About Pokédex.', () => {
    const text = 'About Pokédex';
    const h2 = screen.getByRole('heading', { name: text }, { level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const text1 = 'This application simulates a Pokédex, a digital '
    + 'encliclopedia containing all Pokémons';
    const text2 = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';
    expect(screen.getByText(text1)).toBeInTheDocument();
    expect(screen.getByText(text2)).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb'
    + '/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toBe(imgSrc);
  });
});
