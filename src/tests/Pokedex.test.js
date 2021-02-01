import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokeData from '../data';

describe('Requisito 5: Testando o arquivo Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { queryByText } = renderWithRouter(<App />);
    const pokedexTitle = queryByText(/Encountered pokémons/i);

    expect(pokedexTitle.tagName).toBe('H2');
  });

  it('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const { queryByText } = renderWithRouter(<App />);
    const nextPokemon = queryByText(/Próximo pokémon/i);

    expect(nextPokemon).toBeInTheDocument();

    pokeData.forEach((item) => {
      const pokemon = queryByText(item.name);
      const nextPokemonBtn = queryByText(/Próximo pokémon/i);
      fireEvent.click(nextPokemonBtn);
      expect(pokemon).toBeInTheDocument();
    });

    const pikachu = queryByText(pokeData[0].name);
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => { // .pokemon
    const { getAllByText } = renderWithRouter(<App />);
    const ONE = 1;
    const getMoreDetails = getAllByText(/More details/i);

    expect(getMoreDetails.length).toBe(ONE);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { queryByText } = renderWithRouter(<App />);
    const bugButton = queryByText(/Bug/i);

    fireEvent.click(bugButton);

    const caterpie = queryByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByText } = renderWithRouter(<App />);
    const allButton = queryByText(/All/i);

    expect(allButton.tagName).toBe('BUTTON');
  });

  it('Testa se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
    const { queryByText, getAllByText } = renderWithRouter(<App />);
    const allPokedexBtn = queryByText(/All/i);

    fireEvent.click(allPokedexBtn);

    const electricButton = getAllByText(/Electric/i);
    const poisonButton = getAllByText(/Poison/i);
    const dragonButton = getAllByText(/Dragon/i);

    expect(electricButton[1].tagName).toBe('BUTTON');
    expect(poisonButton[0].tagName).toBe('BUTTON');
    expect(dragonButton[0].tagName).toBe('BUTTON');
  });

  it('Se tiver um só pokémon o botão de Próximo pokémon deve ser desabilitado', () => {
    const { queryByText } = renderWithRouter(<App />);
    const normalButton = queryByText(/Normal/i);

    fireEvent.click(normalButton);

    const nextPokemon = queryByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeDisabled(); // Source: https://github.com/testing-library/jest-dom#tobedisabled
  });
});
