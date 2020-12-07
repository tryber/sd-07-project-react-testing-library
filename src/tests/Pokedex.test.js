import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando Pokedex', () => {
  it('Teste se página contém um h2 com o texto Encountered pokémons.', () => {
    const { container } = renderWithRouter(<App />);
    const h2 = container.querySelector('h2').innerHTML;
    expect(h2).toBe('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const textoBotao = getByText('Próximo pokémon');
    expect(textoBotao).toBeInTheDocument();
    fireEvent.click(textoBotao);
    const segundoPokemon = getByText(/Charmander/i);
    expect(segundoPokemon).toBeInTheDocument();
    const comeco = 0;
    const fim = 7;
    const passo = 1;
    for (let i = comeco; i <= fim; i += passo) {
      fireEvent.click(textoBotao);
    }
    const primeiroPokemon = getByText(/Pikachu/i);
    expect(primeiroPokemon).toBeInTheDocument();
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

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const eletric = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletric);
    expect(eletric).toBeInTheDocument();
    const bug = getByRole('button', { name: 'Bug' });
    fireEvent.click(bug);
    expect(bug).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const botaoAll = getByRole('button', { name: 'All' });
    expect(botaoAll).toBeInTheDocument();
    fireEvent.click(botaoAll);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    history.push('/');
    const pikachuSegundoTest = getByText('Pikachu');
    expect(pikachuSegundoTest).toBeInTheDocument();
  });

  it('Teste dinamicamente um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
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

  it('O botão de Próximo pokémon deve ser desabilitado.', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const botoesDeTipo = getAllByTestId('pokemon-type-button');
    fireEvent.click(botoesDeTipo[0]);
    fireEvent.click(getByText('Próximo pokémon'));
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
