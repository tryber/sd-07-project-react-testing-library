import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testing App.js', () => {
  it('Should render initial page \'Pokédex\'', () => {
    const { getByText } = RenderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Should have a text Home, and your path must be \'/\'', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(home).toBeInTheDocument();
    expect(pathname).toBe('/');
  });
  it('Should have a text About, and your path must be \'/about\'', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(about).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });
  it('Should have a text Home, and your path must be \'/\'', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(favorites).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });
});
