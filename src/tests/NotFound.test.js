import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('A página contém um heading h2 com o texto `Page requested not found`', () => {
  const { getByText, getAllByRole, history } = renderWithRouter(<App />);
  history.push('/8');
  const heading = getByText('Page requested not found');
  const emoji = getAllByRole('img');
  expect(heading).toBeInTheDocument();
  expect(emoji[0]).toBeInTheDocument();
});

test('A página contém uma imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
  const { getByAltText, history } = renderWithRouter(<App />);
  history.push('/8');
  const img = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
