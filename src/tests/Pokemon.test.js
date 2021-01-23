import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

describe('Pokemon.js behaviour tests', () => {
  it('Tests ig a card with pokemon infos are rendered', () => {
    const {
      getByText,
      getByTestId,
      history,
      getByAltText,
    } = renderWithRouter(<App />);
    history.push('/');
    const mockedSrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const name = getByText(/Pikachu/i);
    const type = getByTestId(/pokemonType/i);
    const averageWeight = getByTestId(/pokemon-weight/i);
    const image = getByAltText(/Pikachu sprite/i)
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(averageWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(image.src).toBe(mockedSrc);
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('Tests if there is a link to show pokemon details', () => {
    const {
      getByText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');
    const details = getByText(/More details/i);
    const href = details.href;
    expect(details).toBeInTheDocument();
    expect(href).toBe('http://localhost/pokemons/25');
  });
  it('Tests if by clicking in pokemon details the correct page appears', () => {
    const {
      getByText,
      history,
    } = renderWithRouter(<App />);
    history.push('/');
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
  });

  it('Tests if a star appears when the pokemon its marked as favorite', () => {
    const {
      getByLabelText,
      history,
      getByAltText,
    } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const details = getByLabelText(/Pokémon favoritado/i);
    fireEvent.click(details);
    const star = getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
    expect(star.alt).toBe('Pikachu is marked as favorite');
  });
});