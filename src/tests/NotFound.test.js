import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Page contains heading h2 with text `Page requested not found 😭`', () => {
  const { container, history } = renderWithRouter(<App />);

  history.push('/xablau');

  const zero = 0;
  const three = 3;
  const twentyFour = 24;
  const heading = container.querySelector('h2').innerHTML.substring(zero, twentyFour);
  const span = container.querySelector('span').innerHTML.substring(zero, three);
  const text = heading + span;
  expect(text).toBe('Page requested not found 😭');
});
// Teste se página mostra a imagem .
test('Page contains image', () => {
  const { container, history } = renderWithRouter(<App />);

  history.push('/xablau');

  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = container.querySelector('img').src;
  expect(image).toBe(url);
});
