import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('App.js', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    const title = getByText(/Encountered pokémons/i);
    history.push('/');
    expect(heading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});

