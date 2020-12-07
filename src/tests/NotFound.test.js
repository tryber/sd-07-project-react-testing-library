import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('quarto requisito', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole } = render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const h2Tag = getByRole('heading', { level: 2 });
    const h2Text = getByText('Page requested not found');
    expect(h2Tag).toBeInTheDocument();
    expect(h2Text).toBeInTheDocument();
  });

  test('se mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const history = createMemoryHistory();
    const { getAllByRole, getByAltText } = render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const imgAlt = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgAlt).toBeInTheDocument();
    expect(getAllByRole('img')[1].src).toBe(imgSrc);
  });
});
