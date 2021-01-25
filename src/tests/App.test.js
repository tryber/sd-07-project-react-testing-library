import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Tela Inicial do aplicativo', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/);
    expect(heading).toBeInTheDocument();
  });
});

describe('Testando arquivo APP.js', () => {
  it('Teste o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/home/i);
    const about = getByText(/About/i);
    const FavPok = getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(FavPok).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderRouter(<App />);
    const { pathname } = history.location;
    fireEvent.click(getByText(/Home/i));
    expect(pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página About', () => {
    const { getByText, history } = renderRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se a aplicação é redirecionada para a página "Favorite Pokémons"', () => {
    const { getByText, history } = renderRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica redirecionamento para página "Not Found" caso URL  desconhecida', () => {
    const { getByText, history } = renderRouter(<App />);
    history.push('/paginaNaoEncontrada/');
    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
