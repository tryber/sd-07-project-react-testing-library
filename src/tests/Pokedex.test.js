import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('quinto requisito', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const history = createMemoryHistory();
    const { getByText, getAllByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const h2Tag = getAllByRole('heading', { level: 2 });
    const h2Text = getByText('Encountered pokémons');
    expect(h2Tag[1]).toBeInTheDocument();
    expect(h2Text).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // O botão deve conter o texto Próximo pokémon;
    const buttonToNext = getByTestId('next-pokemon');
    expect(buttonToNext).toBeInTheDocument();
    expect(buttonToNext).toHaveTextContent('Próximo pokémon');
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Caterpie')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Ekans')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Mew')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Snorlax')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Dragonair')).toBeInTheDocument();
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    fireEvent.click(buttonToNext);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const history = createMemoryHistory();
    const { getByText, queryByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    // referência para o uso do 'queryBy' https://testing-library.com/docs/guide-disappearance#nottobeinthedocument
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId, getAllByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const SETE = 7;
    const buttonFilter = getAllByTestId('pokemon-type-button');
    expect(buttonFilter.length).toBe(SETE);
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    expect(buttonFilter[4]).toHaveTextContent('Psychic');
    fireEvent.click(buttonFilter[4]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    expect(getByText('Alakazam')).toBeInTheDocument();
    const buttonToNext = getByTestId('next-pokemon');
    fireEvent.click(buttonToNext);
    expect(getByText('Mew')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Alakazam')).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // O texto do botão deve ser All;
    const buttonToReset = getByRole('button', { name: 'All' });
    expect(buttonToReset).toBeInTheDocument();
    expect(buttonToReset).toHaveTextContent('All');
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    // Ao carregar a página, o filtro selecionado deverá ser All;
    expect(getByText('Pikachu')).toBeInTheDocument();
    const buttonToFire = getByRole('button', { name: 'Fire' });
    fireEvent.click(buttonToFire);
    expect(getByText('Charmander')).toBeInTheDocument();
    const buttonToNext = getByTestId('next-pokemon');
    fireEvent.click(buttonToNext);
    expect(getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(buttonToReset);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  test('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    const history = createMemoryHistory();
    const { getAllByRole, getAllByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // Os botões de filtragem devem ser dinâmicos;
    // Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal;
    // Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
    const NOVE = 9;
    const allButtons = getAllByRole('button');
    expect(allButtons.length).toBe(NOVE);
    expect(allButtons[0]).toHaveTextContent('All');
    expect(allButtons[8]).toHaveTextContent('Próximo pokémon');
    const SETE = 7;
    const allFilteredButtons = getAllByTestId('pokemon-type-button');
    expect(allFilteredButtons.length).toBe(SETE);
    expect(allFilteredButtons[0]).toHaveTextContent('Electric');
    expect(allFilteredButtons[1]).toHaveTextContent('Fire');
    expect(allFilteredButtons[2]).toHaveTextContent('Bug');
    expect(allFilteredButtons[3]).toHaveTextContent('Poison');
    expect(allFilteredButtons[4]).toHaveTextContent('Psychic');
    expect(allFilteredButtons[5]).toHaveTextContent('Normal');
    expect(allFilteredButtons[6]).toHaveTextContent('Dragon');
  });

  test('O botão Próximo deve ser desabilitado quando a lista tiver só 1 pokémon', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    const buttonToNext = getByTestId('next-pokemon');
    expect(buttonToNext).toBeInTheDocument();
    expect(buttonToNext).toHaveTextContent('Próximo pokémon');
    expect(buttonToNext).not.toHaveAttribute('disabled');
    const buttonToNormal = getByRole('button', { name: 'Normal' });
    fireEvent.click(buttonToNormal);
    expect(getByText('Snorlax')).toBeInTheDocument();
    expect(buttonToNext).toHaveAttribute('disabled');
    // referência: Carol Andrade, para saber do atributo;
  });
});
