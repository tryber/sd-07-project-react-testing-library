import React from 'react';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

afterEach(cleanup);

it(`Teste se página contém um heading h2 
    com o texto Page requested not found 😭`, () => {
  renderWithRouter(<NotFound />);
  expect(screen.getByRole('heading'))
    .toHaveTextContent(/Page requested not found 😭/i);
});

it(`Teste se página mostra a imagem 
    https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`, () => {
  renderWithRouter(<NotFound />);
  expect(screen.getByAltText(/page requested was not found/i).src)
    .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
