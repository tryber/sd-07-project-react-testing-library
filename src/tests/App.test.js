import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('verify the routes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('check if the first link has the text "Home" and has the correct path', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(home).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('check if the first link has the text "About" and correct path', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(about).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('check if the first link has the text Favorite Pokémons and correct path', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    expect(favorite).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
