import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo Pokemon', () => {
  it('Deve renderizar name Pokemon ', () => {
    const { getByTestId } = renderWithRender(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toBe('Pikachu');
  });

  it('Deve renderizar type Pokemon ', () => {
    const { getByTestId } = renderWithRender(<App />);
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');
  });

  it('Deve renderizar weight Pokemon ', () => {
    const { getByTestId } = renderWithRender(<App />);
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('Deve renderizar img Pokemon ', () => {
    const { getByRole } = renderWithRender(<App />);

    const imagens = getByRole(/img/i);
    expect(imagens).toBeInTheDocument();
    expect(imagens.alt).toBe('Pikachu sprite');
    expect(imagens.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('Deve renderizar Details Pokemon ', () => {
    const { getByText } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details.href).toBe('http://localhost/pokemons/25');
  });

  it('Deve renderizar Details Redirect Pokemon ', () => {
    const { getByText, history } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    expect(details.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(details);
    const pageDetails = getByText(/Pikachu Details/i);
    expect(pageDetails).toBeInTheDocument();

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Deve renderizar Details is Favorite Pokemon ', () => {
    const { getByText, getByAltText } = renderWithRender(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);

    const favorite = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favorite);

    const favoriteAlt = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteAlt).toBeInTheDocument();
    expect(favoriteAlt.src).toBe('http://localhost/star-icon.svg');
  });
});
