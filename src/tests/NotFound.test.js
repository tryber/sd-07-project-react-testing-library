import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

describe('Testando o arquivo NotFound.js', () => {
  test('if contains a heading h2 with a especific text', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  test('if contains a especific image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
