import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/error'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

test('Teste se página contém um heading h2',
  () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/error'] }>
        <App />
      </MemoryRouter>,
    );
    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
  });

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={ ['/error'] }>
        <App />
      </MemoryRouter>,
    );
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toBe(imageUrl);
  });
