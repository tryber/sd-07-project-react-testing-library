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

test(`Teste se a página principal da Pokédex é renderizada
ao carregar a aplicação no caminho de URL '/'`, () => {
  const { history } = renderWithRouter(<App />);
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test(`Teste se o topo da aplicação contém um conjunto fixo de links de navegação
e seus direcionamentos`, () => {
  const { getByText, history, container } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  const favorite = getByText(/Favorite Pokémons/i);

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();

  fireEvent.click(home);
  expect(history.location.pathname).toBe('/');
  expect(container.querySelector('h2')).toHaveTextContent('Encountered pokémons');

  fireEvent.click(about);
  expect(history.location.pathname).toBe('/about');
  expect(container.querySelector('h2')).toHaveTextContent('About Pokédex');

  fireEvent.click(favorite);
  expect(history.location.pathname).toBe('/favorites');
  expect(container.querySelector('h2')).toHaveTextContent('Favorite pokémons');

  history.push('/algo');
  expect(getByText(/not found/i)).toBeInTheDocument();
});
