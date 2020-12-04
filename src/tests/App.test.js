import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { createMemoryHistory } from 'history';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  })
});

test('se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const detail = getByText(/Favorite Pokémons/i);
  expect(detail).toBeInTheDocument();
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

// Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
test('se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const route = '/desconhecida';
  history.push(route);
  const pageNotFound = getByText(/not found/i);
  expect(pageNotFound).toBeInTheDocument();
})