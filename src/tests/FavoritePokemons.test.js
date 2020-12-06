import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('3. Testando o arquivo FavoritePokemons.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
  });
  afterEach(cleanup);
  it('Contém um heading h2 com o texto Page requested not found', () => {
    const p = screen.getByText(/no favorite pokemon found/i);
    expect(p).toBeInTheDocument();
  });
});
