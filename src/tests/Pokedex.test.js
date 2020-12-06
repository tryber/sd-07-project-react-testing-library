import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testing the Pokedex.js file', () => {
  it('Shold to test if the page contains the text Encountered Pokémon.', () => {
    const { container } = renderWithRouter(<App />);
    const tagH2 = container.querySelector('h2').innerHTML;
    expect(tagH2).toBe('Encountered pokémons');
  });
});
