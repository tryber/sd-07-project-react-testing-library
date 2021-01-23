import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testa o texto Home', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
});

test('testa o texto About', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText('About');
  expect(about).toBeInTheDocument();
});

test('testa o texto Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const favorite = getByText('Favorite Pokémons');
  expect(favorite).toBeInTheDocument();
});

test('se a aplicação é redirecionada para a página inicial', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('se a aplicação é redirecionada para a página About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('se a aplicação é redirecionada para a página favoritos', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('se a aplicação é redirecionada para a página 404', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/issonaoexiste/');
  const erro404 = getByText(/Page requested not found/i);
  expect(erro404).toBeInTheDocument();
});
