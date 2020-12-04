import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

const pokemon = {
  id: 1,
  name: 'Pokemon Name',
  type: 'Pokemon Type',
  averageWeight: {
    value: 7.0,
    measurementUnit: 'kg',
  },
  image: 'https://1.bp.blogspot.com/_hfj1R8wnDyg/SjTk0Clqo_I/AAAAAAAAABI/nwtauYO7Iz8/s320/Bulbasaur.png',
};

const isFavorite = true;
describe('Testando o arquivo Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de um pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
      />,
    );
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pokemon Name');

    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Pokemon Type');

    const weigth = getByTestId('pokemon-weight');
    expect(weigth).toBeInTheDocument();
    expect(weigth.innerHTML).toBe('Average weight: 7 kg');

    const img = getByAltText('Pokemon Name sprite');
    expect(img).toBeInTheDocument();
    expect(img.alt).toBe(`${pokemon.name} sprite`);
    expect(img.src).toBe(`${pokemon.image}`);
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link para detalhes', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
      />,
    );
    const linkDetails = getByText('More details');
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
  });

  test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const linkDetails = getByText('More details');
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    const img = getAllByRole('img');
    expect(img[1].src).toBe('http://localhost/star-icon.svg');
    expect(img[1].alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});
