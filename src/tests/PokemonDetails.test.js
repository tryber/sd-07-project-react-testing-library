import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

beforeEach(() => { renderWithRouter(<App />); });

test('if show the pokemon details', () => {
  const detailsButton = screen.getByText('More details');
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(detailsButton);

  const pokemonDetailsName = screen.getByText(`${pokemonName} Details`);
  const summaryTitle = screen.getByText('Summary');
  const summary = screen.getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');

  expect(detailsButton).not.toBeInTheDocument();
  expect(pokemonDetailsName).toBeInTheDocument();
  expect(summaryTitle).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
});

test('if details show a map with pokemon location', () => {
  const detailsButton = screen.getByText('More details');
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(detailsButton);

  const mapTitle = screen.getByText(`Game Locations of ${pokemonName}`);
  const pokemonLocation = screen.getAllByAltText(`${pokemonName} location`);

  expect(pokemonLocation[0]).toBeInTheDocument();
  expect(pokemonLocation[1]).toBeInTheDocument();
  expect(mapTitle).toBeInTheDocument();
  expect(pokemonLocation[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(pokemonLocation[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('if the user can favorite a pokemon', () => {
  const detailsButton = screen.getByText('More details');
  const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
  fireEvent.click(detailsButton);

  const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoriteButton);

  const favoriteIcon = screen.getByAltText(`${pokemonName} is marked as favorite`);

  expect(favoriteButton).toBeInTheDocument();
  expect(favoriteIcon).toBeInTheDocument();

  fireEvent.click(favoriteButton);

  expect(favoriteIcon).not.toBeInTheDocument();
});
