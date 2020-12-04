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

describe('Testando o arquivo App.js', () => {
  it('testar se possui um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('testar se o botão home leva para a rota /', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testar se o botão about leva para a rota /about', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');

    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('testar se o botão Favorite Pokémons leva para a rota /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favoritePokemons = getByText('Favorite Pokémons');

    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testar se uma rota não existente renderiza a página Not Found', () => {
    const { getByAltText, history } = renderWithRouter(<App />);

    history.push('/pagina-nao-existe');
    const
      noMatch = getByAltText('Pikachu crying because the page requested was not found');
    expect(noMatch).toBeInTheDocument();
  });
});
