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

    const buttonToNext = getByTestId('next-pokemon');
    expect(buttonToNext).toBeInTheDocument();
    expect(buttonToNext).toHaveTextContent('Próximo pokémon');
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
    const { getByText, getAllByText, getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttonToPsychic = getByRole('button', { name: 'Psychic' });
    expect(buttonToPsychic).toBeInTheDocument();
    expect(buttonToPsychic).toHaveTextContent('Psychic');
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(buttonToPsychic);
    expect(getByText('Alakazam')).toBeInTheDocument();
    const buttonToNext = getByTestId('next-pokemon');
    fireEvent.click(buttonToNext);
    expect(getByText('Mew')).toBeInTheDocument();
    fireEvent.click(buttonToNext);
    expect(getByText('Alakazam')).toBeInTheDocument();
    expect(getAllByText('Psychic')[0]).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const buttonToReset = getByRole('button', { name: 'All' });
    expect(buttonToReset).toBeInTheDocument();
    expect(buttonToReset).toHaveTextContent('All');
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
    const { getAllByRole, getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const NOVE = 9;
    const allButtons = getAllByRole('button');
    expect(allButtons.length).toBe(NOVE);
    expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Próximo pokémon' })).toBeInTheDocument();
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
