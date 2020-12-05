import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js, requisito 5', () => {
  it('Teste se página contém um heading "h2" com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const heading = document.querySelector('h2');
    expect(heading.tagName.toLowerCase()).toBe('h2');
    expect(heading.innerHTML).toBe('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const chamander = getByText(/Charmander/i);
    expect(chamander).toBeInTheDocument();
    const poke = pokemons.filter(({ name: n }) => n !== 'Pikachu' && n !== 'Charmander');
    poke.forEach(() => fireEvent.click(button));
    const endPokemon = getByText(pokemons[pokemons.length - 1].name);
    expect(endPokemon).toBeInTheDocument();
    fireEvent.click(button);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const onePokemon = document.querySelectorAll('.pokemon').length;
    expect(onePokemon).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const eletric = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletric);
    expect(eletric).toBeEnabled();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const all = getByRole('button', { name: 'All' });
    fireEvent.click(all);
    expect(all).toBeEnabled();
    const next = getByTestId('next-pokemon');
    pokemons.forEach(() => fireEvent.click(next));
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é criado, dinamicamente, um botão de filtro para cada Pokémon.', () => {
    const { getAllByTestId, getByRole, getByTestId } = renderWithRouter(<App />);
    const typesButtons = getAllByTestId('pokemon-type-button');
    typesButtons.forEach((allTypes) => {
      const buttons = getByRole('button', { name: allTypes.innerHTML });
      expect(buttons).toBeInTheDocument();
    });
    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
    const eletric = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletric);
    expect(eletric).toBeEnabled();
    const next = getByTestId('next-pokemon');
    expect(next).toBeDisabled();
  });
});
