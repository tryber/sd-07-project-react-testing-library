import React from 'react';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const isPokemonFavoriteById = {
  4: true,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe(`Teste se é renderizado um card com as informações de 
determinado pokémon.`, () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ Pokemons[0] }
        isFavorite={ isPokemonFavoriteById }
      />,
    );
    const name = getByText(/Pikachu/);
    expect(name).toBeInTheDocument();
    const type = getByText(/Electric/);
    expect(type).toBeInTheDocument();
    const weight = getByText(/Average weight: 6.0 kg/);
    expect(weight).toBeInTheDocument();
    const image = getByAltText(/Pikachu sprite/);
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const link = getByText(/More details/);
    expect(link).toBeInTheDocument();
    expect(link.href).toBe('http://localhost/pokemons/25');
    const favorite = getByAltText(/Pikachu is marked as favorite/);
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
  });
});
