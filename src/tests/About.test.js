import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Verificando o about.js', () => {
  it(' contém as informações sobre a Pokédex na página', () => {
    const { queryByText } = renderWithRouter(<About />);
    const FavPoke = queryByText('Favorite Pokémons');
    const EncPoke = queryByText('Encountered Pokémons');
    expect(FavPoke).toBeNull();
    expect(EncPoke).toBeNull();
  });
  it('contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokeTitle = getByText('About Pokédex');
    expect(aboutPokeTitle).toHaveTextContent('About Pokédex');
  });
  it('contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokeOne = getByText(/This application simulates a Pokédex/);
    const aboutPokeTwo = getByText(/One can filter Pokémons by type/);
    expect(aboutPokeOne).toBeInTheDocument();
    expect(aboutPokeTwo).toBeInTheDocument();
  });
  it('contém uma imagem especifica de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const aboutPokeTitle = getByAltText('Pokédex');
    expect(aboutPokeTitle).toContainHTML('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
