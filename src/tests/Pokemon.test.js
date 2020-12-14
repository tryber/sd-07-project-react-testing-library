import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa Pokemon.js-requisito6: se é renderizado informações pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const pokemonName = getByText(pokemon.name);
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const pokemonType = getByText(pokemon.type);
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('O peso do pokémon ser um texto Average weight: <value> <measurementUnit>', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const { value, measurementUnit } = pokemon.averageWeight;

    const modelText = `Average weight: ${value} ${measurementUnit}`;
    const pokemonWeight = getByText(modelText);
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('O peso do pokémon ser um texto Average weight: <value> <measurementUnit>', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const { value, measurementUnit } = pokemon.averageWeight;

    const modelText = `Average weight: ${value} ${measurementUnit}`;
    const pokemonWeight = getByText(modelText);
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('A imagem deve conter src com a URL, alt = <name> sprite, <name> = pokémon', () => {
    const pokemon = pokemons[0];
    const { getByRole } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('testa se existe um link para exibir detalhes', () => {
    const pokemon = pokemons[0];
    const {
      getByText,
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } />);

    const { id } = pokemon;

    const moreDetailsLink = getByText(/More Details/i);
    fireEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('testa se existe um ícone de estrela no pokemon favoritado', () => {
    const pokemon = pokemons[0];
    const {
      getByAltText,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const favoriteMark = getByAltText('Pikachu is marked as favorite');
    expect(favoriteMark).toBeInTheDocument();
    expect(favoriteMark.src).toBe('http://localhost/star-icon.svg');
  });
});
