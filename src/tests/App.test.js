import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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

test('Teste se a página principal da Pokédex renderiza com /', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons.')).toBeInTheDocument();
});

test('Teste se o topo da aplicação há um conjunto fixo de links de navegação.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkElement1 = getByText(/Home/i);
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = getByText(/About/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = getByText(/Favorite Pokémons/i);
  expect(linkElement3).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/about');
});

test('Teste se a aplicação direciona para a página de Pokémons Favoritados.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pathName = history.location.pathname;
  expect(pathName).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/anything';
  history.push(route);
  const pageNotFound = getByText(/not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
