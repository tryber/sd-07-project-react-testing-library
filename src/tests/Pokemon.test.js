import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

describe('Teste se é renderizado um card com as informações', () => {
  test('correct name', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toEqual('Pikachu');
  });

  test('correct type', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toEqual('Electric');
  });

  test('correct weight', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.innerHTML).toEqual('Average weight: 6.0 kg');
  });

  test('correct image', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const pokeImage = getByAltText('Pikachu sprite');
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.src).toEqual('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

test('if goes to correct url', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreInformation = getByText(/more details/i);
  expect(moreInformation).toBeInTheDocument();
  userEvent.click(moreInformation);
  const summary = getByText(/summary/i);
  expect(summary).toBeInTheDocument();
  expect(history.location.pathname).toBe('/pokemons/25');
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test('is have a star icon', () => {
    const {
      getByAltText,
      getByLabelText,
      getByText,
    } = renderWithRouter(<App />);
    const moreInformation = getByText(/more details/i);
    userEvent.click(moreInformation);
    const favorite = getByLabelText(/pokémon favoritado/i);
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    expect(favorite.checked).toBe(true);

    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
