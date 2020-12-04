import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    const about = getByText(/about/i);
    const favorites = getByText(/Favorite Pokémons/i);

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
  });
  test('Se a página é renderizada ao clicar no link "HOME" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
  test('Se é redirecionada ao clicar no link "ABOUT" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('Se é redirecionada ao clicar no link "Favorite" da barra de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  test('Se é redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
