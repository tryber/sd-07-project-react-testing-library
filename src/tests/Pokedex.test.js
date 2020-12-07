import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('Testando o componente Pokedex', () => {
  it('Testando se a página contém um heading h2', () => {
    const { container } = renderWithRoute(<App />);
    const heading = container.querySelector('h2').innerHTML;
    expect(heading).toBe('Encountered pokémons');
  });
  it('Testando se o botão próximo pokemon funciona', () => {
    const { getByText } = renderWithRoute(<App />);
    const botaoTexto = getByText('Próximo pokémon');
    expect(botaoTexto).toBeInTheDocument();
    fireEvent.click(botaoTexto);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    const num0 = 0;
    const num7 = 7;
    for (let i = num0; i <= num7; i += 1) {
      fireEvent.click(botaoTexto);
    }
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('Testando se renderiza um pokemon por vez', () => {
    const { getByText, getAllByTestId } = renderWithRoute(<App />);
    const num0 = 0;
    const num8 = 8;
    for (let i = num0; i <= num8; i += 1) {
      const pokemon = getAllByTestId('pokemon-name');
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(pokemon.length).toBe(1);
    }
  });
  it('Testando os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRoute(<App />);
    const botoesDeTipo = getAllByTestId('pokemon-type-button');
    fireEvent.click(botoesDeTipo[0]);
    const pokeomonEletrico = getByTestId('pokemonType');
    expect(pokeomonEletrico.innerHTML).toBe('Electric');
    fireEvent.click(botoesDeTipo[1]);
    const pokeomonFire = getByTestId('pokemonType');
    expect(pokeomonFire.innerHTML).toBe('Fire');
    fireEvent.click(botoesDeTipo[2]);
    const pokeomonBug = getByTestId('pokemonType');
    expect(pokeomonBug.innerHTML).toBe('Bug');
    fireEvent.click(botoesDeTipo[3]);
    const pokeomonPoison = getByTestId('pokemonType');
    expect(pokeomonPoison.innerHTML).toBe('Poison');
    fireEvent.click(botoesDeTipo[4]);
    const pokeomonPsychic = getByTestId('pokemonType');
    expect(pokeomonPsychic.innerHTML).toBe('Psychic');
    fireEvent.click(botoesDeTipo[5]);
    const pokeomonNormal = getByTestId('pokemonType');
    expect(pokeomonNormal.innerHTML).toBe('Normal');
    fireEvent.click(botoesDeTipo[6]);
    const pokeomonDragon = getByTestId('pokemonType');
    expect(pokeomonDragon.innerHTML).toBe('Dragon');
  });
  it('Testando o botão ALL', () => {
    const { getByText, history } = renderWithRoute(<App />);
    const botaoAll = getByText('All');
    expect(botaoAll).toBeInTheDocument();
    fireEvent.click(botaoAll);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    history.push('/');
    const pikachuSegundoTest = getByText('Pikachu');
    expect(pikachuSegundoTest).toBeInTheDocument();
  });
  it('Testando a existência dos botões tipos e all', () => {
    const { getAllByTestId, getByRole } = renderWithRoute(<App />);
    const botoesFiltro = getAllByTestId('pokemon-type-button');
    botoesFiltro.forEach((tipo) => {
      const botao = getByRole('button', {
        name: tipo.innerHTML,
      });
      expect(botao).toBeInTheDocument();
    });
    const botaoAll = getByRole('button', {
      name: 'All',
    });
    expect(botaoAll).toBeInTheDocument();
  });
  it('Testando se o botão próximo pokemon está desabilitado', () => {
    const { getAllByTestId, getByText } = renderWithRoute(<App />);
    const botoesDeTipo = getAllByTestId('pokemon-type-button');
    fireEvent.click(botoesDeTipo[0]);
    fireEvent.click(getByText('Próximo pokémon'));
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
