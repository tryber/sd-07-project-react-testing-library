import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testing the file FavoritePokemons.js', () => {
  test('if the person does not have favorite Pokémon', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/xablau';
    history.push(route);
    const textNotFound = getByText(/Page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });
  test('show the picture', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/xablau';
    history.push(route);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
