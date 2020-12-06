import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemonType').textContent).toBe('Electric');
    expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
    const image = getByRole('img');
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const moreDetails = getByRole('link', { name: 'More details' });
    expect(moreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o
      redirecionamento`, () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const moreDetails = getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const images = getAllByRole('img');
    expect(images[1].src).toBe('http://localhost/star-icon.svg');
    expect(images[1].alt).toBe('Pikachu is marked as favorite');
  });
});
