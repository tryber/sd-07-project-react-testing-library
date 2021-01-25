import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requisito 6 Pokemon.js', () => {
  it('Verifica se é renderizado um card com as informações do Pokémon', () => {
    const Pikachu = pokemons[0];
    const { queryByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ Pikachu }
    />);
    const pokemonName = queryByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const imgAlt = getByAltText(/Pikachu sprite/i);
    expect(imgAlt.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const pokemonType = queryByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = queryByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Verifica se o card do Pokémon contem um link de navegação', () => {
    const pikachu = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pikachu } />);

    const btn = getByText('More details');
    expect(btn.href).toContain('/pokemons/25');
  });

  it('Verifica se ao clicar no link, é feito redirecionamento para detalhes', () => {
    const firstPokemon = pokemons[0];
    const { getByText, history } = renderWithRouter(<Pokemon pokemon={ firstPokemon } />);

    const btnDetails = getByText('More details');
    expect(btnDetails).toBeInTheDocument();

    fireEvent.click(btnDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um icone estrela dos polemons favoritos', () => {
    const favoritePikachu = pokemons[0];
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ favoritePikachu }
      isFavorite
    />);

    const favoritedIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoritedIcon.src).toContain('/star-icon.svg');
  });
});
