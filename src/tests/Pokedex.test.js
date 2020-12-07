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
    const { getByText, getByTestId } = renderWithRouter(<App />);
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
      let pokemon = getAllByTestId('pokemon-name');
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

  it('Teste dinamicamente um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const botoesTipo = getAllByTestId('pokemon-type-button');
    botoesTipo.map((botao) => {
      const botoes = getByRole('button', {
        name: botao.innerHTML,
      });
      expect(botoes).toBeInTheDocument();
    });
    const botaoAll = getByRole('button', { name: 'All' });
    expect(botaoAll).toBeInTheDocument();
  });

  it('O botão de Próximo pokémon deve ser desabilitado.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const eletric = getByRole('button', { name: 'Electric' });
    fireEvent.click(eletric);
    const proximo = getByRole('button', { name: 'Próximo pokémon' });
    expect(proximo).toBeDisabled();
  });
});
