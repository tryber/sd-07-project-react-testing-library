import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo App.js', () => {
  it(`Teste se a página principal da Pokédex é renderizada ao carregar
      a aplicação no caminho de URL /.`, () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe(`Teste se o topo da aplicação contém um conjunto fixo de links
      de navegação.`, () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0].textContent).toBe('Home');
  });

  it('O segundo link deve possuir o texto About.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[1].textContent).toBe('About');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });
});

describe('Teste os links', () => {
  it(`Teste se a aplicação é redirecionada para a página inicial,
      na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About,
      na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons
      Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons
      da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

describe('Teste 404', () => {
  it(`Teste se a aplicação é redirecionada para a página Not Found
      ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/404');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
