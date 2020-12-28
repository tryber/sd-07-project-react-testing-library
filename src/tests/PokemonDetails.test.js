import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('PokemonDetails', () => {
  it('Render the text "<name> Details", where <name> is the pokemon name;', () => {
    const pikachu = pokemons[0];
    const { id } = pikachu;
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const nameDetailsTest = screen.getByText(`${pikachu.name} Details`);
    expect(nameDetailsTest).toBeInTheDocument();
  });

  it('Should not have a link navigation to pokemon details', () => {
    const pikachu = pokemons[0];
    const { id } = pikachu;
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const moreDetailsLinkTest = screen.queryByText(/More Details/);
    expect(moreDetailsLinkTest).toBe(null);
  });

  it('The details section must have a heading with the text "Summary" ', () => {
    const pikachu = pokemons[0];
    const { id } = pikachu;
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const getAllHeaders = screen.queryAllByRole('heading', { level: 2 });
    const title = getAllHeaders
      .some((heading) => heading.innerHTML.includes('Summary'));
    expect(title).toBe(true);
  });

  it('Should be a paragraph with the especific pokemon resume', () => {
    const pikachu = pokemons[0];
    const { id, summary } = pikachu;
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const summaryText = summary;
    const summaryTextTest = screen.queryByText(summaryText);
    expect(summaryTextTest).toBeInTheDocument();
  });
});

describe('Render maps that contains pokemons locations ', () => {
  it('Should be a h2 with the text "Game Locations of <name>"', () => {
    const pikachu = pokemons[0];
    const { id, name } = pikachu;
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const gameLocationsText = `Game Locations of ${name}`;
    const gameLocationsTextTest = screen.queryByText(gameLocationsText);
    expect(gameLocationsTextTest).toBeInTheDocument();
  });

  it('Render all locations in the pokemon details section', () => {
    const pikachu = pokemons[0];
    const { id, foundAt, name } = pikachu;
    const locationsQuantity = foundAt.length;

    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const pikachuLocationTest = screen.queryAllByAltText(`${name} location`);
    expect(pikachuLocationTest.length).toBe(locationsQuantity);
  });

  it('Should appear the name and a image in every location', () => {
    const pikachu = pokemons[0];
    const { id, foundAt, name } = pikachu;
    const locations = foundAt.map((local) => local.location);
    const mapURLs = foundAt.map((local) => local.map);

    render(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);
    locations.forEach((location) => {
      const locationTest = screen.queryByText(location);
      expect(locationTest).toBeInTheDocument();
    });

    const allImageMaps = screen.queryAllByAltText(`${name} location`);
    allImageMaps.forEach((map, index) => {
      expect(map.src).toBe(mapURLs[index]);
    });
  });
});

describe('If the user can favorite a pokemon in the respective page', () => {
  it('There should be a label with the text "Pokemon favoritado?"', () => {
    const pikachu = pokemons[0];
    const { id } = pikachu;
    render(<PokemonDetails
      isPokemonFavoriteById={ { [id]: false } }
      match={ { params: { id: id.toString() } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => { } }
    />);

    const checkbox = screen.getByLabelText(/Pokémon favoritado/);
    expect(checkbox).toBeInTheDocument();
  });

  it('Must have a checkbox to favorite pokemons', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/More details/);
    fireEvent.click(moreDetailsLink);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();

    const checkbox = screen.getByLabelText(/Pokémon favoritado/);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
