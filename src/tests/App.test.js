import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />)
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Teste Pokemons de componente APP', () => {
  test('Teste se aplicação contem conjunto de links', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favPoke = getByText(/Favorite Pokémons/i);
    expect(favPoke).toBeInTheDocument();
  });

  test('Teste de redirecionamento para página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste de redirecionamento para página about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste de redirecionamento para página Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPoke = getByText(/Favorite Pokémons/i);

    fireEvent.click(favPoke);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste de redirecionamento para página que não existe', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  })
})