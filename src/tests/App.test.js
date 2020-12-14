import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o arquivo App.js', () => {
  test('Pokédex é renderizada na rota `/`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('', () => {
    const { getByText } = RenderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
  test('Ao clicar em "Home" é redirecionada para rora "/"', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Ao clicar em "About" é redirecionada para rora "/about"', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Ao clicar em "Favorite Pokémons" é redirecionada para rora "/favorites"', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
