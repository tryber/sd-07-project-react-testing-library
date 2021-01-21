import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testando o arquivo App.js', () => {
  it('O topo da aplicação deve conter um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('ao clicar no link Home, é redirecionado para a URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('ao clicar no link About, é redirecionado para a URL /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('ao clicar em Favorite , é redirec. para a URL /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('a página Not Found deve aparecer ao entrar em uma URL desconhecida', () => {
    const { getByAltText, history } = renderWithRouter(<App />);

    history.push('/pagina-nao-existente');
    const
      noMatch = getByAltText('Pikachu crying because the page requested was not found');
    expect(noMatch).toBeInTheDocument();
  });
});
