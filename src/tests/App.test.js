import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testando se a página principal é carregada quando a URL é "/"', () => {
  const { history } = renderWithRouter(<App />);

  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const homeSubtitle = screen.getByText(/Encountered pokémons/i);
  expect(homeSubtitle).toBeInTheDocument();
});

describe('Teste se o topo da aplicação contém os links e verifique 404', () => {
  it('Verificando a existencia do "Home" e seu redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    expect(history.location.pathname).toBe('/about');

    const home = screen.getByText(/Home/i);
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Verificando a existencia do "About" e seu redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const about = screen.getByText('About');
    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('Verificando "FavoritePokemons" e seu redirecionamento', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const favorites = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testando se a página redireciona para "Not Found" a URL não existe.', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    history.push('/pagina-que-nao-existe');

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
