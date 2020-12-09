import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste da página Pokemon', () => {
  it('Veifica se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[7] } isFavorite />,
    );

    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(/Normal/);

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/Average weight: 460.0 kg/);

    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/Snorlax/);

    const image = getByAltText('Snorlax sprite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });

  it('Veifica se o card do Pokémon indicado na Pokédex contém um link navegação.', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  it('Veifica se é feito o redirecionamento para a página detalhes de Pokémon.', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');
  });

  it('Veifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[8] } isFavorite />,
    );
    const image = getByAltText('Dragonair is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
