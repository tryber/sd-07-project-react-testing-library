import { cleanup } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('App.js', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText('Pokédex');
    const title = getByText('Encountered pokémons');
    history.push('/');
    expect(heading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');

    history.push('/');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    history.push('/about');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    history.push('/favorites');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

  });
});
