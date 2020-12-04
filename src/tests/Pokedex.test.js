import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('if button and Encountered pokémons text is present', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('', () => {
  test('if button is present', () => {
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
    expect(buttons.length).toBe(numberOfTypes);
  });
});
