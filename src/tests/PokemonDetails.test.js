import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  const pokemonPikachu = pokemons[0];
  const { name, summary } = pokemonPikachu;

  it('Teste se as informações detalhadas do Pokémon selecionado'
  + 'são mostradas na tela.', () => {
    const { getByText, queryByRole, getByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(queryByRole('link')).not.toBeInTheDocument();
    expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas'
  + 'contendo as localizações do pokémon', () => {
    const {
      getByText,
      getAllByAltText,
      getByRole,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    expect(getByRole('heading', { name: `Game Locations of ${name}` }))
      .toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getAllByAltText(`${name} location`)[1]).toHaveAttribute(
      'src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it('Teste se o usuário pode favoritar um pokémon através'
  + 'da página de detalhes.', () => {
    const {
      getByLabelText,
      getByRole,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    // Referência: Vanessa Naara
    const favoritePokemonCheckbox = getByRole('checkbox');
    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeChecked();
    fireEvent.change(
      favoritePokemonCheckbox, { target: { checked: false } },
    );
    expect(favoritePokemonCheckbox).not.toBeChecked();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
