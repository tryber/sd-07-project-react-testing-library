import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('renders the App screen', () => {
  it('renders a reading with the text `Pokédex`', () => {
    render(<App />, { wrapper: MemoryRouter });
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the navbar', () => {
    render(<App />, { wrapper: MemoryRouter });

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('renders redirected page', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');

    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');

    history.push('/digimons/');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
