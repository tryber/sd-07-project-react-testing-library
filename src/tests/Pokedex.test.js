import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o componente Pokedex', () => {
  it('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2.tagName).toBe('H2');
  });

  it('Teste se o botão próximo pokémon funciona', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const buttonText = getByText('Próximo pokémon');
    expect(buttonText).toBeInTheDocument();

    const firstPokémon = getByText(/Pikachu/i);
    expect(firstPokémon).toBeInTheDocument();

    const nextPokemon = getByTestId('next-pokemon');
    fireEvent.click(nextPokemon);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    const num0 = 0;
    const num8 = 8;
    for (let i = num0; i < num8; i += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(firstPokémon).toBeInTheDocument();
  });

  it('Testando se renderiza um pokemon por vez', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const num0 = 0;
    const num8 = 8;
    for (let i = num0; i <= num8; i += 1) {
      const pokemon = getAllByTestId('pokemon-name');
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(pokemon.length).toBe(1);
    }
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const eletric = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletric);
    expect(eletric).toBeInTheDocument();
    const bug = getByRole('button', { name: 'Bug' });
    fireEvent.click(bug);
    expect(bug).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    history.push('/');
    const pikachuSegundoTest = getByText('Pikachu');
    expect(pikachuSegundoTest).toBeInTheDocument();
  });

  it('Teste dinamicamente um botão de filtro para cada tipo de Pokémon', () => {
    const {
      getAllByTestId,
      getByRole,
    } = renderWithRouter(<App />);
    const botoesTipo = getAllByTestId('pokemon-type-button');
    botoesTipo.forEach((botao) => {
      const botoes = getByRole('button', {
        name: botao.innerHTML,
      });
      expect(botoes).toBeInTheDocument();
    });
    const botaoAll = getByRole('button', { name: 'All' });
    expect(botaoAll).toBeInTheDocument();
  });

  it('O botão de próximo pokémon deve ser desabilitado', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const botoesDeTipo = getAllByTestId('pokemon-type-button');
    fireEvent.click(botoesDeTipo[0]);
    fireEvent.click(getByText('Próximo pokémon'));
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
