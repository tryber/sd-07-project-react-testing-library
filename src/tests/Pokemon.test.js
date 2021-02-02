import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');

    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Electric');

    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    expect(screen.getByAltText('Pikachu sprite').src)
      .toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('se o card tem um link para exibir detalhes', () => {
    const pokemon = pokemons[0];
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const details = screen.getByText('More details');
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('se existe um ícone de estrela no pokemon favoritado', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('star');
  });
});
