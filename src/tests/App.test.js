import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Links tem os texto `Home`, `About`, `Favorite Pokémons` respectivamente', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const links = getAllByRole('link');
  expect(links[0].innerHTML).toBe('Home');
  expect(links[1].innerHTML).toBe('About');
  expect(links[2].innerHTML).toBe('Favorite Pokémons');
});

test('Clicar no link Home é redirecionado para a URL `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const heading = getByText('Pokédex');
  expect(heading).toBeInTheDocument();
});

test('Clicar no link About é redirecionado para a URL `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const heading = getByText('Pokédex');
  expect(heading).toBeInTheDocument();
});

test('Clicar no link Favorite Pokémons é redirecionado para a URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const heading = getByText('Pokédex');
  expect(heading).toBeInTheDocument();
});

test('Ao entrar em uma URL desconhecida é renderizado a página `Not Found`', () => {
  const { history, getByAltText } = renderWithRouter(<App />);
  history.push('/7');
  const notFound = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(notFound).toBeInTheDocument();
});
