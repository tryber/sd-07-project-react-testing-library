import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Teste se é renderizado um card com as informações do pokémon.', () => {
  it('Os stats do pokemon devem ser exibidos', () => {
    const poke = pokemons[0];
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const pokeName = getByText(poke.name);
    expect(pokeName).toBeInTheDocument();

    const pokeType = getByText(poke.type);
    expect(pokeType).toBeInTheDocument();

    const pokeWeight = getByText(
      `Average weight: ${poke.averageWeight.value} ${poke.averageWeight.measurementUnit}`,
    );
    expect(pokeWeight).toBeInTheDocument();
  });
  it('A imagem deve ter o comportamento correto', () => {
    const poke = pokemons[0];
    const { queryByAltText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const img = queryByAltText(`${poke.name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(poke.image);
  });
  it('O link deve ir para pokemons', () => {
    const poke = pokemons[0];
    const { queryByText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const link = queryByText('More details');
    expect(link.href.endsWith(`/pokemons/${poke.id}`)).toBe(true);
  });
});
describe('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
  it('Checa a url', () => {
    const poke = pokemons[0];
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const link = getByText('More details');
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${poke.id}`);
  });
});
describe('Checa o icone de favorito', () => {
  it('Checa o icone', () => {
    const poke = pokemons[0];
    const fav = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ fav } />,
    );
    const img = getByAltText(`${poke.name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    expect(img.src.endsWith('/star-icon.svg')).toBe(true);
  });
});
