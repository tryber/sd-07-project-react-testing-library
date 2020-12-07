import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se existe o texto `Pokédex` quando renderiza o App.js', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Requisito 1. Testando arquivo App.js', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const Home = getByText(/Home/i);
    expect(Home).toBeInTheDocument();

    const About = getByText(/About/i);
    expect(About).toBeInTheDocument();

    const FavoritePokemons = getByText(/Favorite Pokémons/i);
    expect(FavoritePokemons).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const Home = getByText(/Home/i);
    fireEvent.click(Home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const About = getByText(/About/i);
    fireEvent.click(About);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const Favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(Favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/xablau');
    const pageNotFound = getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
