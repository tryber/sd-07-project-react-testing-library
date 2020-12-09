import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import data from '../data';

describe('7. Testando o arquivo PokemonDetails.js', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const numberCaterpie = 2;
    const caterpiePokemon = data[numberCaterpie];
    const { name, id, summary } = caterpiePokemon;
    const { getByText, queryByText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [id]: false } }
        match={ { params: { id: `${id}` } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ data }
      />,
    );
    const nameScreen = getByText(`${name} Details`);
    expect(nameScreen).toBeInTheDocument();

    const details = queryByText(/More Datails/i);
    expect(details).not.toBeInTheDocument();

    const headingsTwo = getAllByRole('heading', { level: 2 }).map(
      (htmlContent) => htmlContent.textContent,
    );
    expect(headingsTwo.includes('Summary')).toBe(true);

    const detalhes = getByText(summary);
    expect(detalhes).toBeInTheDocument();
  });

  it('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const numberCaterpie = 2;
    const caterpiePokemon = data[numberCaterpie];
    const { name, id, foundAt } = caterpiePokemon;
    const { getAllByAltText, getAllByRole, getByText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [id]: false } }
        match={ { params: { id: `${id}` } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ data }
      />,
    );

    const headingsTwo = getAllByRole('heading', { level: 2 }).map(
      (htmlContent) => htmlContent.textContent,
    );
    expect(headingsTwo.includes(`Game Locations of ${name}`));

    const mapasSection = getAllByAltText(`${name} location`).map(
      (mapa) => mapa.src,
    );
    const mapasData = foundAt.map((location) => location.map);
    expect(mapasSection).toEqual(mapasData);

    const namesLocation = foundAt.map((found) => found.location);
    namesLocation.forEach((location) => {
      expect(getByText(location)).toBeInTheDocument();
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const numberCaterpie = 2;
    const caterpiePokemon = data[numberCaterpie];
    const { id } = caterpiePokemon;
    const { getByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [id]: false } }
        match={ { params: { id: `${id}` } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ data }
      />,
    );

    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    expect(checkbox.checked).toBe(false);

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBe(true);

    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toBe(false);
  });
});
