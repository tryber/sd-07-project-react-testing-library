import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requisito 6', () => {
  const pikachu = pokemons[0];
  it('Deve exibir informações do Pokémon', () => {
    RenderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ false } />);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(screen.getByTestId('pokemonType').textContent).toBe('Electric');
    const peso = 'Average weight: 6.0 kg';
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(peso);
    const { image } = pikachu;
    expect(screen.getByAltText('Pikachu sprite').src).toBe(image);
  });

  it('Se existir um link ver os detalhes do pokémon', () => {
    RenderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ false } />);
    const http = 'http://localhost/pokemons/25';
    expect(screen.getByText('More details').href).toBe(http);
  });

  it('será redirecionado para a página de detalhes.', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const path = getByRole('link', { Name: /More details/i });
    expect(path.href).toBe('http://localhost/pokemons/25');
  });
  it('Se a URL exibir / pokemon / <id>, com os detalhes do Pokémon.', () => {
    const { getByText, history } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Favorite caso existe o icone', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite />,
    );
    const image = getByAltText(/Pikachu is marked as favorite/i);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
