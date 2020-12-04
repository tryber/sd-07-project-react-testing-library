import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(renderWithRouter);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Verificando se a barra de navegação contém as referências corretas.', () => {
  test('Testando se o link Home direciona para "/".', () => {
    const { queryAllByRole } = render(<App />);
    expect(queryAllByRole('link')[0]).innerHTML('Home');
    expect(queryAllByRole('link')[0].toHaveAttribute('href', '/'));
  });

  test('Verificando se About direciona para "/about"', () => {
    const { queryAllByRole } = render(renderWithRouter(<App />));
    expect(queryAllByRole('link')[1]).innerHTML('About');
    expect(queryAllByRole('link')[1]).toHaveAttribute('href', '/about');
  });

  test('Testando se Favorite Pokémons direciona para "/favorites"', () => {
    const { queryAllByRole } = render(renderWithRouter(<App />));
    expect(queryAllByRole[2].innerHTML('Favorite Pokémons'));
    expect(queryAllByRole[2].toHaveAttribute('href', '/favorites'));
  });
});

describe('Verificando se os links redirecionam corretamente.', () => {
  test('Testando o link Home', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(renderWithRouter(<App />));
    fireEvent.click(getByText(/home/i));
    expect(container.innerHTML).toMatch(/Econutered Pokémons/i);
    expect(history.location.pathname).toBe('/');
  });

  test('Verficando o About', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(renderWithRouter(<App />));
    fireEvent.click(getByText(/about/i));
    expect(container.innerHTML).toMatch(/About Pokédex/i);
    expect(history.location.name).toBe('/about');
  });

  test('Testando Favorite.', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(renderWithRouter(<App />));
    fireEvent.click(getByText(/favorite/i));
    expect(container.innerHTML).toMatch(/Favorite Pokémons/i);
    expect(history.location.pathname).toBe('/favorites');
  });
});
