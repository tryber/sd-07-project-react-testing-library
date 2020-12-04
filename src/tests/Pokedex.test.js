import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";
import Pokedex from "../components/Pokedex";
import Pokemon from "../components/Pokemon";
import data from "../data"

describe('Testando o arquivo Pokedex.js', () => {

  const pokeFav = {
    "4": false,
    "10": false,
    "23": false,
    "25": true,
    "65": false,
    "78": false,
    "143": false,
    "148": true,
    "151": false
  }

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const { getByText, getByTestId } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);

    const pokeName1 = getByTestId('pokemon-name').innerHTML;

    const btnNext = getByText('Próximo pokémon')
    fireEvent.click(btnNext);

    const pokeName2 = getByTestId('pokemon-name').innerHTML;

    expect(pokeName1).not.toEqual(pokeName2);
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);

    const pokemons = queryAllByTestId('pokemon-name')
    expect(pokemons.length).toBe(1);

  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    // Os Pokémon do tipo selecionado através do botão de tipo devem estar circulados.

    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic.
    const { queryByText, queryByTestId } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);
    const btnPsychic = queryByText('Psychic')
    fireEvent.click(btnPsychic)

    const pokeType = queryByTestId('pokemonType');

    console.log(btnPsychic.innerHTML)

    expect(pokeType.innerHTML).toBe(btnPsychic.innerHTML)

  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByText, queryByTestId } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);
    // O texto do botão deve ser All.
    const btnAll = queryByText('All')
    expect(btnAll).toBeInTheDocument()
    // A Pokedéx deverá voltar a circular por todos os Pokémons quando o botão for clicado.


    // Ao carregar a página, o filtro selecionado deverá ser All.
  });

  it('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
    // Os botões de filtragem devem ser dinâmicos.
    const { queryByText, queryAllByTestId, queryAllByText } = renderWithRouter(<Pokedex pokemons={data.slice(0, 3)} isPokemonFavoriteById={pokeFav} />);

    const btnsType = queryAllByTestId('pokemon-type-button')
    expect(btnsType.length).toBe(3)
    // Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, independente de quais ou quantos sejam, sem repetição de tipos. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal.
    const btnElectric = queryAllByText('Electric')
    const btnFire = queryByText('Fire')
    const btnBug = queryByText('Bug')

    expect(btnElectric[1]).toBeInTheDocument()
    expect(btnFire).toBeInTheDocument()
    expect(btnBug).toBeInTheDocument()

    // Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
    const btnAll = queryByText('All')
    expect(btnAll).toBeInTheDocument()
  });

  it('O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.', () => {
    const { queryByText, queryAllByText } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);

    const btnsElectric = queryAllByText('Electric')
    fireEvent.click(btnsElectric[1])

    const btnNext = queryByText('Próximo pokémon')
    expect(btnNext.disabled).toBe(true)
  });

  it('Matando Mutantes', () => {
    const { queryByText, getByTestId } = renderWithRouter(<Pokedex pokemons={data} isPokemonFavoriteById={pokeFav} />);

    const btnFire = queryByText('Fire')
    fireEvent.click(btnFire)
    const btnAll = queryByText('All')
    fireEvent.click(btnAll)

    const pokeName = getByTestId('pokemon-name').innerHTML;

    expect(pokeName).toBe('Pikachu')

    const text = queryByText('Encountered pokémons')
    expect(text.innerHTML).toBe('Encountered pokémons')
  });
});
