import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Testando o arquivo App.js', () => {
  
  it('Renderiza Pokédex na rota `/`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O primeiro link deve possuir o texto Home com a URL `/`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const home = getByText(/home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About com a URL `/about`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const about = getByText(/about/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('O terceiro link deve possuir o texto Favorite com a URL `/favorites`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const favorite = getByText(/favorite/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Renderizado a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const notFound = 'pagina-nao-encontrada';
    history.push(notFound);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
