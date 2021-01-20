import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo App.js', () => {
  it('Verifica se renderiza a Pokédex na rota `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const title = getByText('Encountered pokémons');
    const { pathname } = history.location;
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('Verifica se há um conjunto de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('O link `Home` redirecionar para a rota `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText('Home');
    const { pathname } = history.location;
    userEvent.click(link);
    expect(link).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('O link `About` redirecionar para a rota `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/About/i);
    userEvent.click(link);
    const { pathname } = history.location;
    expect(link).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  it('O link `Favorite Pokémons` redirecionar para a rota `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/Favorite Pokémons/i);
    userEvent.click(link);
    const { pathname } = history.location;
    expect(link).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  it('A página `Not Found` é renderizada quando acessado um caminho inexistente', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = 'digimon';
    history.push(link);
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
