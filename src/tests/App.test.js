import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Teste da tela App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<App />);
  
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  
    const {pathname} = history.location;
    expect(pathname).toBe('/')
  });


  it('renders the Links: Home, About, Favorite Pokémon.And these links redirect the respective pages', () => {
    const { getByText, history } = renderWithRouter(<App />);

      const home = getByText(/Home/i);
      const about = getByText(/About/i);
      const favoritePokemons = getByText(/Favorite Pokémons/i);

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favoritePokemons).toBeInTheDocument();

      fireEvent.click(about);
      expect(history.location.pathname).toBe('/about');

      fireEvent.click(favoritePokemons);
      expect(history.location.pathname).toBe('/favorites');

      fireEvent.click(home);
      expect(history.location.pathname).toBe('/');
  })
  it('renders Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('teste');
    expect(getByText('Page requested not found')).toBeInTheDocument()
  })
});


