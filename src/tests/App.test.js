import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

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

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeElement = getByText('Home');
  const aboutElement = getByText('About');
  const favoriteElement = getByText('Favorite Pokémons');
  expect(homeElement).toBeInTheDocument();
  expect(aboutElement).toBeInTheDocument();
  expect(favoriteElement).toBeInTheDocument();
});

test(('Teste se é redirecionada para página inicial ao clicar no link Home'), () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeElement = getByText('Home');
  fireEvent.click(homeElement);
  expect(history.location.pathname).toBe('/');
});

test('Teste a aplicação é redirecionada para a página About corretamente', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutElement = getByText('About');
  fireEvent.click(aboutElement);
  expect(history.location.pathname).toBe('/about');
});

test('Teste se é redirecionada corretamente ao clicar em Pokemons Favoritos', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoriteElement = getByText('Favorite Pokémons');
  fireEvent.click(favoriteElement);
  expect(history.location.pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/digimon');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
