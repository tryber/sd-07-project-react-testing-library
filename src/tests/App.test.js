import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo App.js', () => {
  test('Pokédex é renderizada no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('aplicação contem os links Home, About e Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });

  it('link Home redireciona para a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favorite = getByText(/Favorite pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  it('link About redireciona para a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });

  it('link Favotire Pokémons redireciona para a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favorite = getByText(/Favorite pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  it('redireciona para a página Not Found, se a URL for desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
