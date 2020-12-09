import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

it('Verifica se a página inicial reinderiza.', () => {
  const { history } = renderWithRouter(<App />);

  expect(history.location.pathname).toBe('/');
});

it('Verifica se no topo temos links de navegação fixados.', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/);
  const about = getByText(/About/);
  const favorites = getByText(/Favorite Pokémons/);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorites).toBeInTheDocument();
});

it('Verifica se ao clicar no link HOME a página é reinderizada', () => {
  const { getByText } = renderWithRouter(<App />);

  const home = getByText(/Home/);
  expect(home).toBeInTheDocument();
  expect(home.href).toBe('http://localhost/');
});

it('Verifica se ao clicar no link ABOUT a página é redirecionada', () => {
  const { getByText } = renderWithRouter(<App />);

  const about = getByText(/About/);
  expect(about).toBeInTheDocument();
  expect(about.href).toBe('http://localhost/about');
});

it('Verifica se ao clicar no link Favorite a página é redirecionada', () => {
  const { getByText } = renderWithRouter(<App />);

  const favorites = getByText(/Favorite Pokémon/);
  expect(favorites).toBeInTheDocument();
  expect(favorites.href).toBe('http://localhost/favorites');
});

it('Verifica se ao entrar em uma URL desconhecida redireciona para Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/Page requested not found/);
  expect(noMatch).toBeInTheDocument();
});
