import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: true,
  148: false,
  151: false,
};

describe('Requisito 5 Pokedex', () => {
  it('Verificando se a pagina contem um heading "h2" "Encountered Pokémons"', () => {
    renderRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const encountered = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(encountered.tagName).toBe('H2');
  });

  it('Verifica se o botão "próximo pokémon" exibe o texto e um novo pokemon', () => {
    renderRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
    expect(btn.type).toBe('button');
    expect(btn).toHaveTextContent(/Próximo pokémon/i);
  });

  it('Os próximos Pokémons da lista devem ser mostrados um a um', () => {
    renderRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    fireEvent.click(btn);
    const pokemonsList = screen.getByText(/Charmander/i);
    expect(pokemonsList).toBeInTheDocument();
  });

  it('O primeiro Pokémon é mostrado ao clicar no botão, se estiver no último', () => {
    renderRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const contador = 9;
    for (let i = 1; i < contador; i += 1) {
      fireEvent.click(btn);
    }
    const drago = screen.getByText(/Dragonair/i);
    expect(drago).toBeInTheDocument();

    fireEvent.click(btn);
    const pika = screen.getByText(/Pikachu/i);
    expect(pika).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const contador = 8;
    for (let count = 1; count < contador + 1; count += 1) {
      const pokeName = screen.getAllByTestId('pokemon-name');
      fireEvent.click(btn);
      const quantidade = 1;
      expect(pokeName.length).toBe(quantidade);
    }
  });

  it('Verifica após o filtro, a pokedéx circula apenas pelos pokemons do tipo', () => {
    renderRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const fire = screen.getByRole('button', { name: 'Fire' });
    const tipo = 5;
    fireEvent.click(fire);
    for (let i = 1; i < tipo; i += 1) {
      const type = screen.getByTestId('pokemonType');
      expect(type.firstChild.nodeValue).toBe('Fire');
      fireEvent.click(btn);
    }
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getByTestId } = renderRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    const pokemonType = getByTestId('pokemonType');
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach((btn) => expect(btn).toBeInTheDocument());
    fireEvent.click(filterButtons[1]);
    expect(pokemonType.innerHTML).toBe('Fire');
    fireEvent.click(nextBtn);
    expect(pokemonType.innerHTML).toBe('Fire');
  });
});
