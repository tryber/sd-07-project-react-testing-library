import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Testando o arquivo App.js', () => {
  test(`1.1 - Teste se a página principal da Pokédex é renderizada ao
  carregar a aplicação no caminho de URL /`, () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it(`1.2 - Teste se o topo da aplicação contém um conjunto fixo
   de links de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    const title = screen.getByText(/Encountered pokémons/i);
    const { pathname } = history.location;

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it(`1.3 - Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it(`1.4 - Teste se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const title = screen.getByText(/About Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  it(`1.5 - Teste se a aplicação é redirecionada para a página de Pokémons
  Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da
  barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const title = screen.getAllByText(/Favorite pokémons/i);
    expect(title[1]).toBeInTheDocument();
  });

  it(`1.6 - Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nao-encontrada');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
