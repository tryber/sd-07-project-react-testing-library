import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('The page contains information about Pokédex', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/about');
  const information = getByText(/About Pokédex/i);
  expect(information).toBeInTheDocument();
});
