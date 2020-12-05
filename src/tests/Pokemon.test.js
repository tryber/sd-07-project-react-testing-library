import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js, requisito 6', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/Charmander/i);
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(/Fire/i);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/Average weight: 8.5 kg/i);
    const image = getByAltText('Charmander sprite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link navegação.', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemons/4');
  });

  it('Teste se é feito o redirecionamento para a página de detalhes de Pokémon.', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } isFavorite />,
    );
    const image = getByAltText('Charmander is marked as favorite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
