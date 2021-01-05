import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('Testa se a página principal carrega a aplicação no caminho de URL /.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const home = getByText('Encountered pokémons');
  expect(home).toBeInTheDocument();
});

test('Testa a página Not Found ao entrar em uma URL desconhecida.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina-inexistente');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});

test('Testa a rota Home.', () => {
  const { getByText } = renderWithRouter(<App />);

  const homePage = getByText('Encountered pokémons');
  fireEvent.click(getByText(/Home/i));
  expect(homePage).toBeInTheDocument();
});

test('Testa a rota About.', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homePage = getByText('Encountered pokémons');
  expect(homePage).toBeInTheDocument();

  fireEvent.click(getByText(/about/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutPage = getByText('About Pokédex');
  expect(aboutPage).toBeInTheDocument();
});

test('Testa a rota Favorite pokémons.', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const homePage = getByText('Encountered pokémons');
  expect(homePage).toBeInTheDocument();

  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const aboutPage = getByText('No favorite pokemon found');
  expect(aboutPage).toBeInTheDocument();
});
