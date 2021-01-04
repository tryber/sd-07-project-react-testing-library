import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requirement 1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('contains links to Home, About and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('must be redirected to the correct path when the link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');

    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('must be redirected to the `Not Found` page when entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagenotfound/');
    const combine = getByText(/Page requested not found/i);
    expect(combine).toBeInTheDocument();
  });
});
