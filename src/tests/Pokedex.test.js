import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Testando o component Pokedex.', () => {
  it('Verificando se na página tem um h2 com texto `Encountered pokémons`', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const heading2 = container.querySelector('h2');
    expect(heading2).toBeInTheDocument();
    const pageText = getByText(/Encountered pokémons/i);
    expect(pageText).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemon);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(nextPokemon);
    const caterpie = getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
    expect(nextPokemon.type).toBe('button');
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('Testando os botões de tipo de pokémon', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const typeBttns = getAllByTestId('pokemon-type-button');
    typeBttns.forEach((button) => {
      fireEvent.click(button);
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType.textContent).toBe(button.textContent);
    });
  });

  it('Teste se existe um botão para limpar filtros.', () => {
    const { getByText } = renderWithRouter(<App />);
    const allTypes = getByText(/all/i);
    fireEvent.click(allTypes);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Com um pokémon na lista o botão de próx deverá estar desabilitado', () => {
    const { getByText } = renderWithRouter(<App />);
    const electricBtn = getByText(/dragon/i);
    fireEvent.click(electricBtn);
    const nextPokemon = getByText(/Próximo pokémon/i);
    expect(nextPokemon.disabled).toBeTruthy();
  });
});
