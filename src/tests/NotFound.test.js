import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

import renderWithRouter from './renderWithRouter';

describe('4. Testando o arquivo NotFound.js', () => {
  it(
    'Teste se página contém um heading h2 com o texto'
    + 'Page requested not found 😭', () => {
      renderWithRouter(<NotFound />);

      const pageNotFound = screen.getByRole(
        'heading', { name: /page requested not found/i },
      );

      expect(pageNotFound).toBeInTheDocument();
    },
  );

  it(`Teste se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    renderWithRouter(<NotFound />);

    const imageNotFoundPage = screen.getByRole(
      'img', { name: /pikachu crying because the page requested was not found/i },
    );

    expect(imageNotFoundPage).toBeInTheDocument();
    expect(imageNotFoundPage.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
