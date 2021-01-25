import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const encountered = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(encountered.tagName).toBe('H2');
  });

  it('Verifica se o botão "próximo pokémon" exibe o texto e um novo pokemon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
    expect(btn.type).toBe('button');
    expect(btn).toHaveTextContent(/Próximo pokémon/i);
  });

  it('Os próximos Pokémons da lista devem ser mostrados um a um', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    fireEvent.click(btn);
    const pokemonsList = screen.getByText(/Charmander/i);
    expect(pokemonsList).toBeInTheDocument();
  });

  it('O primeiro Pokémon é mostrado ao clicar no botão, se estiver no último', () => {
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);
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
    renderWithRouter(<App />);
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
    const { getAllByTestId, getByTestId } = renderWithRouter(
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

  it('O texto do botão deve corresponder ao "nome do tipo" ex. Psychic', () => {
    renderWithRouter(<App />);
    const psychic = screen.getByRole('button', { name: /Psychic/i });
    fireEvent.click(psychic);
    expect(psychic.textContent).toBe('Psychic');
  });
  // Fazer o teste se contem um botão para resetar o filtro.
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /All/i });
    expect(btn.textContent).toBe('All');
  });

  it('Verifica se mostra os Pokémons normalmente quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const btnAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(btnAll);

    const electric = screen.getByTestId('pokemonType');
    expect(electric.textContent).toBe('Electric');
    fireEvent.click(btn);
    const fire = screen.getByTestId('pokemonType');
    expect(fire.textContent).toBe('Fire');
    fireEvent.click(btn);
    const bug = screen.getByTestId('pokemonType');
    expect(bug.textContent).toBe('Bug');
    fireEvent.click(btn);
    const poison = screen.getByTestId('pokemonType');
    expect(poison.textContent).toBe('Poison');
    fireEvent.click(btn);
    const psychic = screen.getByTestId('pokemonType');
    expect(psychic.textContent).toBe('Psychic');
    fireEvent.click(btn);
    expect(psychic.textContent).toBe('Psychic');
    fireEvent.click(btn);
    expect(fire.textContent).toBe('Fire');
    fireEvent.click(btn);
    const normal = screen.getByTestId('pokemonType');
    expect(normal.textContent).toBe('Normal');
    fireEvent.click(btn);
    const dragon = screen.getByTestId('pokemonType');
    expect(dragon.textContent).toBe('Dragon');
    fireEvent.click(btn);
    expect(electric.textContent).toBe('Electric');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const electric = screen.getByTestId('pokemonType');
    expect(electric.textContent).toBe('Electric');
    fireEvent.click(btn);
  });

  it('Os botões de filtragem devem ser dinâmicos', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = screen.getAllByTestId('pokemon-type-button');
    const types2 = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    expect(btn.length).toBe(types2.length);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = screen.getAllByTestId('pokemon-type-button');
    const type = btn.map((item) => item.firstChild.nodeValue);
    expect(type).toContain('Fire');
    expect(type).toContain('Psychic');
    expect(type).toContain('Electric');
    expect(type).toContain('Normal');
  });

  it('Verifica se botão All esta sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado um só pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const electric = screen.getByRole('button', { name: 'Electric' });
    fireEvent.click(electric);
    const btn = screen.getByTestId('next-pokemon');
    expect(btn.disabled).toBeTruthy();
  });
});
