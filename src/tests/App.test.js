import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App.js', () => {
  it('deve renderizar o componente `Pokédex` quando a URL for `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Pokédex');
  });

  it(
    'deve renderizar uma barra de navegação com os links: Home, About e FavoritePokémons',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const linkHome = getByText(/home/i);
      const linkAbout = getByText(/about/i);
      const linkFavoritePokemons = getByText(/favorite pokémon/i);

      expect(linkHome).toBeInTheDocument();
      expect(linkHome.textContent).toBe('Home');

      expect(linkAbout).toBeInTheDocument();
      expect(linkAbout.textContent).toBe('About');

      expect(linkFavoritePokemons).toBeInTheDocument();
      expect(linkFavoritePokemons.textContent).toBe('Favorite Pokémons');
    },
  );

  it(
    `o link 'Home' da barra de navegação deve redirecionar para a URL '/'
    quando clicado`,
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkHome = getByText(/home/i);
      fireEvent.click(linkHome);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    },
  );

  it(
    `o link 'About' da barra de navegação deve redirecionar para a URL '/about'
    quando clicado`,
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      const linkAbout = getByText(/about/i);
      fireEvent.click(linkAbout);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    },
  );

  it(
    `o link 'Favorite Pokémons' da barra de navegação deve redirecionar para a URL
    '/favorite' quando clicado`,
    () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/favorite pokémons/i));

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  it('ao entrar em uma url desconhecida deve renderizar not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notFound');
    const notFoundTitle = getByText(/page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
