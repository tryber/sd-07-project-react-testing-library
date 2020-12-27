import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokedex = getAllByRole('heading', { level: 2 });
    expect(pokedex[1]).toHaveTextContent('Encountered pokémons');
  });
});
// Referencia mateusleiteaalmeida

describe('exibido o Pokémon quando o botão o pokémon é clicado.', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const button = getByText(/Próximo pokémon/i);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
  // Referencia mateusleiteaalmeida
  it('Os próximos Pokémons da lista devem ser mostrados, um a um.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const pokemon = getAllByTestId('pokemon-name').length;
    expect(pokemon).toBe(1);
  });
  // Referencia: Renato Mak
  it('primeiro Pokémon da lista deve ser mostrado ao clicar no botão', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const weight = getByTestId('pokemon-weight');
    pokemons.forEach((pokemon, index) => {
      fireEvent.click(buttonProximo);
      if (index === pokemons.length) {
        expect(name).toHaveTextContent(pokemon.name);
        expect(type).toHaveTextContent(pokemon.type);
        expect(weight).toHaveTextContent(
          `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
        );
      }
    });
  });
  // Referencia mateusleiteaalmeida
  it('se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const pokemonLength = getAllByTestId('pokemon-name').length;
    expect(pokemonLength).toBe(1);
  });

  it('se a Pokédex tem os botões de filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const fireButton = getByText(/Fire/i);
    fireEvent.click(fireButton);
    expect(getByText('Charmander')).toBeInTheDocument();
    const nextButton = getByText(/Próximo pokémon/i);
    fireEvent.click(nextButton);
    expect(getByText('Rapidash')).toBeInTheDocument();
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const allButton = getByText(/All/i);
    fireEvent.click(allButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
    const button = getByText(/Próximo pokémon/i);
    fireEvent.click(button);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const types = ['Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(getAllByTestId('pokemon-type-button').length).toBe(types.length);
    expect(getByText(/All/i)).toBeInTheDocument();
  });

  it('botão Próximo pokémon deve ser desabilitado se tiver um só pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const eletric = getByRole('button', { name: /Electric/i });
    fireEvent.click(eletric);
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeDisabled();
  });
});
