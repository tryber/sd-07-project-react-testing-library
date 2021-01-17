import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Tests-1 App.js', () => {
  it('should render initial page Pokédex', () => {
    const { getByText } = RenderWithRouter(<App />);
    const head = getByText(/Pokédex/i);
    expect(head).toBeInTheDocument();
  });

  it('should have a text home', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(home).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('should have a text About', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(about).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  it('should have a text Favorite Pokémons', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(favorites).toBeInTheDocument();
    expect(pathname).toBe('/favorites:w');
  });
});

