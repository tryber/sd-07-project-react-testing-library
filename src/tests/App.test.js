import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('that the top of the page contains the fixed links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

// O primeiro link deve possuir o texto Home.
test('that the 1st link contains the word Home', () => {
  const { container } = renderWithRouter(<App />);
  const allLinks = container.getElementsByClassName('link');
  expect(allLinks[0]).toHaveTextContent('Home');
});

// O segundo link deve possuir o texto About.
test('that the 2nd link contains the word About', () => {
  const { container } = renderWithRouter(<App />);
  const allLinks = container.getElementsByClassName('link');
  expect(allLinks[1]).toHaveTextContent('About');
});

// O terceiro link deve possuir o texto Favorite Pokémons.
test('that the 3rd link contains Favorite Pokémons', () => {
  const { container } = renderWithRouter(<App />);
  const allLinks = container.getElementsByClassName('link');
  expect(allLinks[2]).toHaveTextContent('Favorite Pokémons');
});

// Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.
test('if Link home directs to / ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/home/i));
  const homePathname = history.location.pathname;
  expect(homePathname).toBe('/');
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
});

// Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.
test('if Link About directs to /about ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  const homePathname = history.location.pathname;
  expect(homePathname).toBe('/about');
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});
// Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.
test('if Link Favorite Pokémons directs to /favorites ', () => {
  const dois = 2;
  const { getAllByText, getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const homePathname = history.location.pathname;
  expect(homePathname).toBe('/favorites');
  const home = getAllByText(/Favorite pokémons/i);
  expect(home.length).toBe(dois);
});
// Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.
test('if Link Favorite Pokémons directs to /favorites ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/histo');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
