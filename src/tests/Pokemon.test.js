import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'pikachu',
  type: 'electric',
  averageWeight: { value: '5', measurementUnit: 'kg' },
  image: 'pikachu-image',
  foundAt: [{ location: 'locale', map: 'anywhere' }],
  summary: 'A pokemon',
};

test('Testando se "More Details" possui o ID do pokemon.', () => {
  renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
  const a = screen.getByText(/More Details/i);

  expect(a).toHaveAttribute('href', '/pokemons/25');
});

test('Testando se a URL do navegador muda para /pokemons/:id', () => {
  const { history } = renderWithRouter(
    <Pokemon pokemon={ pokemon } isFavorite={ false } />,
  );
  const a = screen.getByText(/More Details/i);
  expect(history.location.pathname).toBe('/');

  userEvent.click(a);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

describe('Testando a renderização do card com as informações de pokémons.', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const type = screen.getByTestId('pokemonType');
    expect(type).toHaveTextContent(/Electric/i);
  });

  it('Verificando se o peso é demonstrado da forma correta.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/Average Weight: 5 kg/i);
  });

  it('Verificando se a imagem é exibida corretamente', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'pikachu-image');
    expect(img).toHaveAttribute('alt', 'pikachu sprite');
  });
});

describe('Testando os Pokémons favoritados.', () => {
  it('O pokémon favoritado deve possuir uma estrela especifica', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );
    const star = container.querySelector('img.favorite-icon');

    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });

  it('A "Alt" deve da estrela deve possuir o nome do pokémon favoritado', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );
    const star = container.querySelector('img.favorite-icon');

    expect(star).toHaveAttribute('alt', 'pikachu is marked as favorite');
  });
});
