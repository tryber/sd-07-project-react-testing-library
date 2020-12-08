import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const title = getByTestId(/h2-pokedex/i);
  expect(title.tagName).toBe('H2');
  expect(title.innerHTML).toBe('Encountered pokémons');
});

describe('Testa se exibe próximo Pokémon quando botão Próximo pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
  });

  it('Testa se os próximos Pokémons são mostrados ao clicar no botão', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(nextButton);
    const nextPokemon = getByText(pokemons[1].name);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se, ao clicar, o primeiro Pokémon é mostrado se estiver no último', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    const firstPokemon = getByText(pokemons[0].name);
    pokemons.forEach(() => fireEvent.click(nextButton));
    expect(firstPokemon).toBeInTheDocument();
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const size = getAllByText(/More details/i);
  expect(size.length).toBe(1);
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('A partir da seleção de tipo, deve circular por pokémons daquele tipo', () => {
    const { getByRole } = renderWithRouter(<App />);
    const typeButton = getByRole('button', { name: 'Electric' });
    fireEvent.click(typeButton);
    expect(typeButton).toBeEnabled();
  });
});
