import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('Verifica se no topo temos links de navegação fixados.', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/home/i);
  const about = getByText(/about/i);
  const favorites = getByText(/Favorite Pokémons/i);

  expect(home.href).toBe('http://localhost/');
  expect(about.href).toBe('http://localhost/about');
  expect(favorites.href).toBe('http://localhost/favorites');
});
it('Verifica se ao clicar no link "HOME" a página é reinderizada', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});
it('Verifica se ao clicar no link "ABOUT" a página é redirecionada', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});
it('Verifica se ao clicar no link "Favorite" a página é redirecionada', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});
test('Verifica se ao entrar em uma URL desconhecida redireciona para Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
