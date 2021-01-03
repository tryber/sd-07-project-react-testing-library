import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing PokemonDetails.js', () => {
  test('renders pokemon name correctly', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('`More details` link is not on the details page', () => {
    const { queryByText, getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    expect(queryByText('More details')).toBe(null);
  });

  test('renders `h2` with `Summary`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const pokemonSummary = getByText('Summary');

    expect(pokemonSummary.tagName).toBe('H2');
  });

  test('renders a brief description of the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const pokemonDescription = getByText(/This intelligent Pokémon roasts hard/);

    expect(pokemonDescription).toBeInTheDocument();
  });

  test('renders `h2` with `Game Locations of Pikachu`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const pokemonSummary = getByText('Game Locations of Pikachu');

    expect(pokemonSummary.tagName).toBe('H2');
  });

  test('renders all locations of the pokemon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const pokemonLocations = getAllByAltText('Pikachu location');
    const size = 2;

    expect(pokemonLocations.length).toBe(size);
  });

  test('renders all locations with the name and img', () => {
    const res = [{
      'img 1': {
        imgSrc: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        routName: 'Kanto Viridian Forest',
      },
    },
    {
      'img 2': {
        imgSrc: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        routName: 'Kanto Power Plant',
      },
    }];

    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const allInfo = [];
    let count = 1;

    const pokemonHabitatDiv = document.querySelector('.pokemon-habitat');
    const allDivs = pokemonHabitatDiv.querySelectorAll('div');

    allDivs.forEach(({ children }) => {
      allInfo.push({
        ['img ' + count]: {
          imgSrc: children[0].src,
          routName: children[1].textContent, // children[1].innetText tb funcionaria!
        },
      });
      count += 1;
    });

    expect(allInfo[0]['img 1'].imgSrc).toBe(res[0]['img 1'].imgSrc);
    expect(allInfo[0]['img 1'].routName).toBe(res[0]['img 1'].routName);
    expect(allInfo[1]['img 2'].imgSrc).toBe(res[1]['img 2'].imgSrc);
    expect(allInfo[1]['img 2'].routName).toBe(res[1]['img 2'].routName);
  });

  test('renders img correctly', () => {
    const res = [{
      'img 1': {
        imgSrc: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
        altName: 'Pikachu location',
      },
    },
    {
      'img 2': {
        imgSrc: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
        altName: 'Pikachu location',
      },
    }];

    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const allInfo = [];
    let count = 1;

    const pokemonImg = getAllByAltText('Pikachu location');

    pokemonImg.forEach((img) => {
      allInfo.push({
        ['img ' + count]: {
          imgSrc: img.src,
          altName: img.alt,
        },
      });
      count += 1;
    });
 
    expect(allInfo[0]['img 1'].imgSrc).toBe(res[0]['img 1'].imgSrc);
    expect(allInfo[0]['img 1'].altName).toBe(res[0]['img 1'].altName);
    expect(allInfo[1]['img 2'].imgSrc).toBe(res[1]['img 2'].imgSrc);
    expect(allInfo[1]['img 2'].altName).toBe(res[1]['img 2'].altName);
  });

  test('user can mark pokemon as favorite', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    const favoriteCheckbox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheckbox).toBeInTheDocument();

    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeTruthy();
    fireEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBeFalsy();
  });
});
