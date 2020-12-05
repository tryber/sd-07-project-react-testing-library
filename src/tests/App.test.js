import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text "Pokédex"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Pagina principal Pokédex é renderizada URL /', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

describe('o topo da aplicação contém conjunto fixo de links:', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  });
});

test('App é redirecionada para a página inicial, ao clicar no link Home', () => {
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
  expect(pathname).toBe("/");
});

test('App é redirecionada para a página de About, ao clicar no link About', () => {
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
  expect(pathname).toBe("/about");
});

test('App é redirecionada Pokémons Favoritados, ao clicar no link Favorite', () => {
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
  expect(pathname).toBe("/favorites");
});

test('App é redirecionada para a página Not Found em URL desconhecida', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  const route = "/desconhecida";
  history.push(route);
  const pageNotFound = getByText(/not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
