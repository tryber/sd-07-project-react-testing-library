import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

// describe('', () => {})

describe('Requisito 1: Testando o arquivo App.js', () => {
  it('Página principal da Pokédex é renderizada ao carregar a aplicação', () => {
    const { getByText } = renderWithRouter(<App />);
    const encounteredPokemons = getByText(/Encountered pokémons/i);

    expect(encounteredPokemons).toBeInTheDocument();
  //   expect(true).toBeTruthy(); // Expect / Macthers
  });

  it('Possui conjunto fixo de links de navegação: Home, About e Favorite Pokémons',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const home = getByText(/Home/i);
      const about = getByText(/About/i);
      const favorite = getByText(/Favorite Pokémons/i);

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    });

  it('Ao clicar em Home redireciona para "/"', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    fireEvent.click(queryByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar em About redireciona para "/about"', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    fireEvent.click(queryByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar em Pokémons Favoritados redireciona para "/favorites"', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    fireEvent.click(queryByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se a aplicação é redirecionada para a página Not Found', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    const notFound = '/notfound';

    history.push(notFound);
    const notFoundTitle = queryByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
