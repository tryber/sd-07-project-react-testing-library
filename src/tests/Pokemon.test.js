import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  const pokemonCharmander = pokemons[1];
  const { id, name } = pokemonCharmander;

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonCharmander }
        isFavorite={ false }
      />,
    );
    expect(getByText(pokemonCharmander.name)).toBeInTheDocument();
    expect(getByText(pokemonCharmander.type)).toBeInTheDocument();

    const pokemonWeight = getByText(
      `Average weight: ${
        pokemonCharmander.averageWeight.value} ${
        pokemonCharmander.averageWeight.measurementUnit}`,
    );
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('Teste se o card do Pokémon indicado na Pokédex'
  + 'contém um link de navegação para exibir detalhes'
  + 'deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
  + 'onde <id> é o id do Pokémon exibido;', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonCharmander }
        isFavorite={ false }
      />,
    );
    expect(getByText('More details')).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Teste se ao clicar no link de navegação do Pokémon,'
  + 'é feito o redirecionamento da aplicação para a página'
  + 'de detalhes de Pokémon', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonCharmander }
        isFavorite={ false }
      />,
    );
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste também se a URL exibida no navegador muda'
  + 'para /pokemon/<id>, onde <id> é o id do Pokémon'
  + 'cujos detalhes se deseja ver', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonCharmander }
        isFavorite={ false }
      />,
    );
    const link = getByText('More details');
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonCharmander }
        isFavorite
      />,
    );
    const markedFavorite = getByAltText(`${name} is marked as favorite`);
    expect(markedFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
