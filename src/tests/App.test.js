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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('verifique se há um conjunto de Links na parte superior da pagina', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const texto = getByText(/Home/i);
  expect(texto).toBeInTheDocument();
});

test('verifique se há um conjunto de Links na parte superior da pagina', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const texto = getByText(/About/i);
  expect(texto).toBeInTheDocument();
});

test('verifique se há um conjunto de Links na parte superior da pagina', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const texto = getByText(/Favorite Pokémons/i);
  expect(texto).toBeInTheDocument();
});

test('verifique se ao clicar no link redireciona para a pagina certa',
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    const buttonHome = getByText(/Home/i);
    fireEvent.click(buttonHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

test('verifique se ao clicar no link redireciona para a pagina certa',
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    const buttonAbout = getByText(/About/i);
    fireEvent.click(buttonAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

test('verifique se ao clicar no link redireciona para a pagina certa',
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    const buttonFavorit = getByText(/Favorite Pokémons/i);
    fireEvent.click(buttonFavorit);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

test('verifique se é redirecionado para pagina de erro',
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/naoencontrado');
    const texto = getByText(/Page requested not found/i);
    expect(texto).toBeInTheDocument();
  });
