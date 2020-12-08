import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('1. Testando o arquivo App.js', () => {
  it('Teste se a página principal da Pokédex é renderizada'
   + 'ao carregar a aplicação no caminho de URL `/`.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se o topo da aplicação contém um'
   + 'conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial,'
   + 'na URL `/` ao clicar no link Home da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de About, na URL `/`about,'
   + 'ao clicar no link About da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,'
   + 'na URL /favorites,ao clicar no link Favorite Pokémons'
   + 'da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/another-page/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
