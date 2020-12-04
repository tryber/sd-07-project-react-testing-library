import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Page contains text `<name> Details`', () => {
  const { queryByText } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const pokemonDetails = queryByText(/Details/i);
  expect(pokemonDetails).toBeInTheDocument();
  expect(pokemonDetails.innerHTML).toBe('Pikachu Details');
});

test('Must there is not `More Details` link', () => {
  const { queryByText } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  expect(moreDetails).not.toBeInTheDocument();
});

test('The section details contains text `Sumary` heading h2', () => {
  const { queryByText } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const summary = queryByText(/Summary/i);
  expect(summary).toBeInTheDocument();
  expect(summary.tagName).toBe('H2');
});

test('The section details contains especific text with paragraph `p`', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const paragraph = container.querySelectorAll('p')[3];
  expect(paragraph).toBeInTheDocument();
  const zero = 0;
  const index = 44;
  const text = paragraph.innerHTML.substring(zero, index);
  expect(text).toBe('This intelligent Pokémon roasts hard berries');
});

test('The section details contains text `Game Locations of <name>` heading h2', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const summary = container.querySelectorAll('h2')[2];
  expect(summary).toBeInTheDocument();
  expect(summary.innerHTML).toBe('Game Locations of Pikachu');
});

test('Rendering location and image map of pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const imageMaps = container.querySelectorAll('img');
  const three = 3;
  expect(imageMaps.length).toBe(three);
});

test('Rendering all locations of pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const imageMaps = container.querySelectorAll('img');
  const three = 3;
  expect(imageMaps.length).toBe(three);
});

test('Rendering all map locations and name locations of pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const imageMaps1 = container.querySelectorAll('img')[1];
  expect(imageMaps1).toBeInTheDocument();
  expect(imageMaps1.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  const nameMap1 = container.querySelectorAll('em')[0];
  expect(nameMap1).toBeInTheDocument();
  expect(nameMap1.innerHTML).toBe('Kanto Viridian Forest');
  const imageMaps2 = container.querySelectorAll('img')[2];
  expect(imageMaps2).toBeInTheDocument();
  expect(imageMaps2.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  const nameMap2 = container.querySelectorAll('em')[1];
  expect(nameMap2).toBeInTheDocument();
  expect(nameMap2.innerHTML).toBe('Kanto Power Plant');
});

test('Rendering alt map contains name of pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const imageMaps1 = container.querySelectorAll('img')[1];
  expect(imageMaps1).toBeInTheDocument();
  expect(imageMaps1.alt).toBe('Pikachu location');
  const imageMaps2 = container.querySelectorAll('img')[2];
  expect(imageMaps2).toBeInTheDocument();
  expect(imageMaps2.alt).toBe('Pikachu location');
});

test('Page rendering checkbox to favorite pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const checkbox = container.querySelector('input');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox.type).toBe('checkbox');
});

test('Alternative clicks favorite pokemon', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const favoritePokemon = queryByText(/Pokémon favoritado?/i);
  fireEvent.click(favoritePokemon);
  const urlIcon = container.querySelector('.favorite-icon');
  expect(urlIcon).toBeInTheDocument();
  expect(urlIcon.src).toBe('http://localhost/star-icon.svg');

  fireEvent.click(favoritePokemon);
  expect(urlIcon).not.toBeInTheDocument();
});

test('Label check box contains text `Pokémon favoritado?`', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const moreDetails = queryByText(/More details/i);
  fireEvent.click(moreDetails);

  const label = container.querySelector('label');
  expect(label).toBeInTheDocument();
  const zero = 0;
  const index = 19;
  const text = label.innerHTML.substring(zero, index);
  expect(text).toBe('Pokémon favoritado?');
});
