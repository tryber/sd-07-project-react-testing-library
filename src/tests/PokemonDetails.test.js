import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouters from '../renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const matchMock = {
  path: '/pokemons/:id',
  url: '/pokemons/25',
  isExact: true,
  params: { id: '25' },
};

const favoritePokMock = {
  25: true,
  4: false,
  10: true,
  23: false,
  65: true,
  151: false,
  78: false,
  143: true,
  148: false,
};

function localStorageCheck() {
  const locStorFP = JSON.parse(localStorage.getItem('favoritePokemonIds'));
  if (locStorFP !== null) {
    const localSFPLength = locStorFP.length;
    return localSFPLength;
  }
  const localSFPLength = 0;
  return localSFPLength;
}

const renderPokemonDetails = (match) => (<PokemonDetails
  isPokemonFavoriteById={ favoritePokMock }
  match={ match }
  pokemons={ pokemons }
  onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
    this.onUpdateFavoritePokemons(pokemonId, isFavorite)
  ) }
/>);

describe('Test about pokemon details informations', () => {
  test('If have a pokemon name details on page', () => {
    const { getByText } = renderWithRouters(renderPokemonDetails(matchMock));
    const { name } = pokemons
      .find((pokemon) => pokemon.id === parseInt(matchMock.params.id, 10));
    expect(getByText(`${name} Details`)).toBeInTheDocument();
  });

  test('If no have link to More details on page', () => {
    const { queryByText } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(queryByText('More Details')).toBeNull();
  });

  test('If heading have a content Sumarry', () => {
    const { getByRole } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  });

  test('If have a paragraph with pokemon summary', () => {
    const { container } = renderWithRouters(renderPokemonDetails(matchMock));
    const { summary } = pokemons
      .find((pokemon) => pokemon.id === parseInt(matchMock.params.id, 10));
    const paragraphs = container.querySelectorAll('p');
    expect(Object.values(paragraphs)
      .find((paragraph) => paragraph.innerHTML === summary).innerHTML)
      .toBe(summary);
  });
});

describe('Test about pokemon location', () => {
  const { foundAt, name } = pokemons
    .find((pokemon) => pokemon.id === parseInt(matchMock.params.id, 10));
  test('If heading have a content Game Locations of "Pokemon name"', () => {
    const { getByRole } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(getByRole('heading', { name: `Game Locations of ${name}` }))
      .toBeInTheDocument();
  });

  test('If heading have all locations of pokemon', () => {
    const { getAllByRole } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(getAllByRole('img', { name: `${name} location` }).length)
      .toBe(foundAt.length);
  });

  test('If all locations image and name are showing on page', () => {
    const { container } = renderWithRouters(renderPokemonDetails(matchMock));
    const imgs = container.querySelectorAll('img');
    const ems = container.querySelectorAll('em');
    foundAt.forEach(({ location, map }) => {
      const qtd = 2;
      const img = Object.values(imgs)
        .filter((image) => image.src === map).length;
      const em = Object.values(ems)
        .filter((tagEm) => tagEm.innerHTML === location).length;
      expect(img + em).toBe(qtd);
    });
  });

  test('If location image src have correct URL', () => {
    const { container } = renderWithRouters(renderPokemonDetails(matchMock));
    const imgs = container.querySelectorAll('img');
    foundAt.forEach(({ map }) => {
      const img = Object.values(imgs).filter((image) => image.src === map).length;
      expect(img).toBe(1);
    });
  });

  test('If location alt have correct text', () => {
    const { container } = renderWithRouters(renderPokemonDetails(matchMock));
    const imgs = container.querySelectorAll('img');
    expect(Object.values(imgs)
      .filter((img) => img.alt === `${name} location`).length)
      .toBe(foundAt.length);
  });
});

describe('Test about favorite pokemons', () => {
  test('If have a checkbox to apply favorite to pokemon', () => {
    const { getByRole } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(getByRole('checkbox')).toBeInTheDocument();
  });

  test('If multiples clicks will add and remove pokemon from favorite list', () => {
    const { getByText, getByRole } = renderWithRouters(<App />);
    const moreDetBtn = getByText('More details');
    fireEvent.click(moreDetBtn);
    const favoriteCheckBox = getByRole('checkbox');
    let favoritelength = localStorageCheck();
    fireEvent.click(favoriteCheckBox);
    expect(localStorageCheck()).not.toBe(favoritelength);
    favoritelength = localStorageCheck();
    fireEvent.click(favoriteCheckBox);
    expect(localStorageCheck()).not.toBe(favoritelength);
  });

  test('If checkbox label have correct content', () => {
    const { getByLabelText } = renderWithRouters(renderPokemonDetails(matchMock));
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
