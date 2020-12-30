import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const match = { params: { id: '4' } };
const favorites = { 25: false };

describe('test if detailed information about selected pokémon are shown.', () => {
  test('if the page have the text `<pokémon name> Details`.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const nameDetails = getByText(`${pokemon.name} Details`);
    expect(nameDetails).toBeInTheDocument();
  });
  it('should not show pokemón details link`.', () => {
    const { queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const linkDetails = queryByText(/More details/i);
    expect(linkDetails).toBe(null);
  });
  test('if Details section have an h2 with text `Summary`.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const summaryHeader = getByText('Summary');
    expect(summaryHeader).toBeInTheDocument();
    expect(summaryHeader.tagName).toBe('H2');
    expect(summaryHeader.parentElement.tagName).toBe('SECTION');
  });
  test('if Details section have an paragraph with selected pokémon summary.', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const pokemonSummary = pokemon.summary;
    const summaryParagraph = getByText('Summary').nextElementSibling;
    expect(summaryParagraph).toBeInTheDocument();
    expect(summaryParagraph.tagName).toBe('P');
    expect(summaryParagraph.textContent).toBe(pokemonSummary);
  });
});

describe('test if there is a section with maps of the locations of the pokémon.', () => {
  test('there must be an heading h2 with the text Game Locations of <name>', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const gameLocations = getByText(`Game Locations of ${pokemon.name}`);
    expect(gameLocations).toBeInTheDocument();
    expect(gameLocations.tagName).toBe('H2');
  });
  test('All Pokémon locations must be shown in the details section', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const pokemonLocations = pokemon.foundAt;
    const gameLocations = getByText(`Game Locations of ${pokemon.name}`);
    const detailsSection = gameLocations.parentElement;
    const divLocations = gameLocations.nextElementSibling;
    expect(divLocations.childElementCount).toBe(pokemonLocations.length);
    expect(detailsSection.tagName).toBe('SECTION');
  });
  test('the location name of a map image should be displayed at each location', () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const pokemonLocations = pokemon.foundAt;
    pokemonLocations.forEach((obj) => {
      const elementLocation = getByText(obj.location);
      const elementMap = getAllByAltText(`${pokemon.name} location`);
      expect(elementLocation).toBeInTheDocument();
      elementMap.forEach((e) => expect(e.tagName).toBe('IMG'));
      elementMap.forEach((e) => expect(e.alt).toBe(`${pokemon.name} location`));
      const urlIsTrue = elementMap.some((e) => e.src === obj.map);
      expect(urlIsTrue).toBeTruthy();
    });
  });
});
describe('Test if the user can favor a pokémon through the details page', () => {
  test('The page should display a checkbox that allows you to favor the Pokémon', () => {
    const { getByRole } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const favoriteCheck = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheck).toBeInTheDocument();

    fireEvent.change(favoriteCheck, { target: { checked: true } });
    expect(favoriteCheck.checked).toBeTruthy();
    fireEvent.change(favoriteCheck, { target: { checked: false } });
    expect(favoriteCheck.checked).toBeFalsy();
  });
  /* test('All Pokémon locations must be shown in the details section', () => {
    const { getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const pokemonLocations = pokemon.foundAt;
    const gameLocations = getByText(`Game Locations of ${pokemon.name}`);
    const detailsSection = gameLocations.parentElement;
    const divLocations = gameLocations.nextElementSibling;
    expect(divLocations.childElementCount).toBe(pokemonLocations.length);
    expect(detailsSection.tagName).toBe('SECTION');
  });
  test('the location name of a map image should be displayed at each location', () => {
    const { getByText, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favorites }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const { params: { id } } = match;
    const pokemon = pokemons.find((poke) => poke.id === parseInt(id, 10));
    const pokemonLocations = pokemon.foundAt;
    pokemonLocations.forEach((obj) => {
      const elementLocation = getByText(obj.location);
      const elementMap = getAllByAltText(`${pokemon.name} location`);
      expect(elementLocation).toBeInTheDocument();
      elementMap.forEach((e) => expect(e.tagName).toBe('IMG'));
      elementMap.forEach((e) => expect(e.alt).toBe(`${pokemon.name} location`));
      const urlIsTrue = elementMap.some((e) => e.src === obj.map);
      expect(urlIsTrue).toBeTruthy();
    });
  });
  */
});
