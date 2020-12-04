import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  it(`Teste se é exibido o próximo Pokémon da lista,
      quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnNext = screen.getByText(/Próximo pokémon/i);
    const havePokemon = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(btnNext).toBeInTheDocument();
    expect(havePokemon).toBeInTheDocument();
  });
  it(`Os próximos Pokémons da lista devem ser mostrados,
      um a um, ao clicar sucessivamente no botão`, () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnNext = getByText(/Próximo pokémon/i);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });
  it(`O primeiro Pokémon da lista deve ser mostrado
   ao clicar no botão se estiver no último Pokémon da lista`, () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnNext = getByText(/Próximo pokémon/i);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const lengthName = queryAllByTestId('pokemon-name').length;
    expect(lengthName).toBe(1);
  });
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnPsychic = getByText('Psychic');
    fireEvent.click(btnPsychic);
    const typeAndButton = getAllByText(/Psychic/i);
    const two = 2;
    expect(typeAndButton.length).toBe(two);
  });
  it('Os Pokémons do tipo selecionado do botão de tipo devem estar circulados.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnPsychic = getByText('Psychic');
    const btnNext = getByText(/Próximo pokémon/i);
    fireEvent.click(btnPsychic);
    expect(getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText('Mew')).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText('Alakazam')).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnAll = getByText('All');
    const btnNext = getByText(/Próximo pokémon/i);

    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
  it('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    // const eletric = queryAllByText(/eletric/i);
    // console.log(queryAllByText(/eletric/i));
    expect(getByText(/all/i)).toBeInTheDocument();
    expect(getByText(/fire/i)).toBeInTheDocument();
    expect(getByText(/bug/i)).toBeInTheDocument();
    expect(getByText(/poison/i)).toBeInTheDocument();
    expect(getByText(/psychic/i)).toBeInTheDocument();
    expect(getByText(/normal/i)).toBeInTheDocument();
    expect(getByText(/dragon/i)).toBeInTheDocument();

    const allButtons = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(allButtons.length).toBe(seven);
  });
  it('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const btnNext = getByText(/Próximo pokémon/i);
    const btnPoison = getByText(/poison/i);
    fireEvent.click(btnPoison);
    expect(getByText(/ekans/i)).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(getByText(/ekans/i)).toBeInTheDocument();
  });
});
