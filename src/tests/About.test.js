import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Verificando o about.js', () => {
  it('Verifica se a página contém informações da Pokedex', () => {
    const { queryByText } = renderWithRouter(<About />);
    const FavPoke = queryByText('Favorite Pokémons');
    const EncPoke = queryByText('Encountered Pokémons');
    expect(FavPoke).toBeNull();
    expect(EncPoke).toBeNull();
  });
  it('Verifica se a página contém um título About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokeTitle = getByText('About Pokédex');
    expect(aboutPokeTitle).toHaveTextContent('About Pokédex');
  });
  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokeOne = getByText(/This application simulates a Pokédex/);
    const aboutPokeTwo = getByText(/One can filter Pokémons by type/);
    expect(aboutPokeOne).toBeInTheDocument();
    expect(aboutPokeTwo).toBeInTheDocument();
  });
  it('Verifica se a página contém uma imagem específica da Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const aboutPokeTitle = getByAltText('Pokédex');
    expect(aboutPokeTitle).toContainHTML('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
