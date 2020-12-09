import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import RenderWithRouter from '../tests/RenderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('EX06 - Testando o arquivo Pokemon.js', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByText } = RenderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );

    const pokemonName = getByText(pokemon.name);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toBeVisible();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByText } = RenderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );

    const pokemonType = getByText(pokemon.name);

    expect(pokemonType).toBeInTheDocument();
  });

  test('O peso médio do pokémon deve ser exibido com um texto', () => {
    const { getByText } = RenderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const { measurementUnit, value } = pokemon.averageWeight;

    const pokemonWeight = getByText(
      `Average weight: ${value} ${measurementUnit}`,
    );

    expect(pokemonWeight).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const { image } = pokemon;

    const pokemonImage = getByAltText(/Pikachu sprite/i);

    expect(pokemonImage.src).toBe(image);
  });

  test('contém um link de navegação para exibir detalhes', () => {
    const { getByText, history, getByRole } = RenderWithRouter(<App />);

    const linkDetails = getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();

    fireEvent.click(linkDetails);

    const path = history.location.pathname;
    const details = getByRole('heading', { name: 'Pikachu Details' });

    expect(path).toBe(`/pokemons/${pokemon.id}`);
    expect(details).toBeInTheDocument();
    expect(details.tagName).toBe('H2');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByLabelText, getByAltText } = RenderWithRouter(
      <App />,
    );

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const inputFavorite = getByLabelText(/Pokémon favoritado?/i);
    expect(inputFavorite).toBeInTheDocument();
    fireEvent.click(inputFavorite);

    const favoriteImage = getByAltText('Pikachu is marked as favorite');
    expect(favoriteImage).toBeInTheDocument();

    fireEvent.click(inputFavorite);
    expect(favoriteImage).not.toBeInTheDocument();
  });

  test('Testando o type do pokemon', () => {
    const { getByText, getByAltText, getByLabelText, getByTestId } = RenderWithRouter(<App />);
    const { type } = pokemon;

    const pokemonType = getByTestId('pokemonType');;
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(type);

    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);

    const inputFavorite = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(inputFavorite);

    const starFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
