import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

let message = `Teste se o topo da aplicação
 contém um conjunto fixo de links de navegação.`;
describe(message, () => {
  it('O primeiro link deve possuir o texto Home, About e Favorite Pokémons/', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Home/i);
    expect(heading).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });
});
message = `Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar
 no link Home da barra de navegação.`;
it(message, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

message = `Teste se a aplicação é redirecionada para a página de About, na URL /about, ao
 clicar no link About da barra de navegação.`;
it(message, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

message = `Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na 
URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`;
it(message, () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

message = `Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma 
URL desconhecida.`;
it(message, () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina-que-nao-existe/');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
