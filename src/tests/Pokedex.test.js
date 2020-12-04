import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('if button and Encountered pokémons text is present', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('', () => {
  test('if next button is present', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
  });

  test('if next button advances to next in the list', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('if next button advances to next in the list', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    const startingIndex = 0;
    const length = 8;
    for (let i = startingIndex; i < length; i += 1) {
      userEvent.click(nextButton);
    }
    expect(getByText(/dragonair/i)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('if only one monster is shown at a time', () => {
    const { queryByText } = renderWithRouter(<App />);
    expect(queryByText(/pikachu/i)).toBeInTheDocument();
    const charmander = queryByText(/charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });

  test('if filter buttons are present', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const numberOfTypes = 7;
    const zero = 0;
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(buttons.length).toBe(numberOfTypes);
    for (let index = zero; index < numberOfTypes; index += 1) {
      expect(buttons[index].innerHTML).toBe(types[index]);
    }
  });

  test('if filter clear is present', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const clearFilter = getByRole('button', { name: /all/i });
    const nextButton = getByText(/próximo pokémon/i);
    expect(clearFilter).toBeInTheDocument();
    expect(clearFilter).toHaveTextContent('All');
    userEvent.click(clearFilter);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(getByText(/caterpie/i)).toBeInTheDocument();
  });

  test('if nextButton is disabled when there is only one of selected type', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    userEvent.click(getByText('Bug'));
    expect(nextButton).toHaveAttribute('disabled');
  });
});
