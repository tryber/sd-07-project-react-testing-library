import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRender from '../helpers/renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testing the Pokemon.js file', () => {
  it('The correct name of the Pokémon should be shown on the screen;', () => {
    const { getByTestId } = renderWithRender(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
  });
  it(' The correct type of pokémon should be shown on the screen.', () => {
    const { getByTestId } = renderWithRender(<App />);
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toBe('Electric');
  });
  it('Must render weight Pokemon ', () => {
    const { getByTestId } = renderWithRender(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });
  it('Must render Pokemon img', () => {
    const { getByRole } = renderWithRender(<App />);

    const image = getByRole(/img/i);
    expect(image).toBeInTheDocument();
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
  it('Must render Details Pokemon', () => {
    const { getByText } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details.href).toBe('http://localhost/pokemons/25');
  });
  it('Must render Details Redirect Pokemon', () => {
    const { getByText, history } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(details);
    const pageDetails = getByText(/Pikachu Details/i);
    expect(pageDetails).toBeInTheDocument();

    const route = history.location.pathname;

    expect(route).toBe('/pokemons/25');
  });
  it('Must render Details is Favorite Pokemon', () => {
    const { getByText, getByAltText } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);

    const favorite = getByText('Pokémon favoritado?');
    fireEvent.click(favorite);

    const favoriteAlt = getByAltText('Pikachu is marked as favorite');
    expect(favoriteAlt).toBeInTheDocument();
    expect(favoriteAlt.src).toBe('http://localhost/star-icon.svg');
  });
});
