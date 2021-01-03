import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  test('página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const title = getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Encountered pokémons');
  });

  it('é exibido o próximo Pokémon quando o botão é clicado', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btn = getByText(/Próximo pokémon/i);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const pokemonLength = getAllByTestId('pokemon-name').length;
    expect(pokemonLength).toBe(1);
  });

  it('Pokédex tem os botões de filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const fireBtn = getByText(/Fire/i);
    fireEvent.click(fireBtn);
    expect(getByText('Charmander')).toBeInTheDocument();
    const nextBtn = getByText(/Próximo pokémon/i);
    fireEvent.click(nextBtn);
    expect(getByText('Rapidash')).toBeInTheDocument();
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const allButton = getByText(/All/i);
    fireEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const nextButton = getByText(/Próximo pokémon/i);
    fireEvent.click(nextButton);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const allTypes = ['Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(getAllByTestId('pokemon-type-button').length).toBe(allTypes.length);
    expect(getByText(/All/i)).toBeInTheDocument();
  });

  it('botão Próximo pokémon deve ser desabilitado tiver um só pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const eletricButton = getByRole('button', { name: /Electric/i });
    fireEvent.click(eletricButton);
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeDisabled();
  });
});
