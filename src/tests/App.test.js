import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Tests if the page contains About, Home and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const containsAbout = getByText('About');
    expect(containsAbout).toBeInTheDocument();
    const containsHome = getByText('Home');
    expect(containsHome).toBeInTheDocument();
    const containsFavoritePokemons = getByText('Favorite Pokémons');
    expect(containsFavoritePokemons).toBeInTheDocument();
  });
  it('Tests if the path to Home works', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const containsAbout = getByText('About');
    expect(containsAbout).toBeInTheDocument();
    const containsHome = getByText('Home');
    expect(containsHome).toBeInTheDocument();
    const containsFavoritePokemons = getByText('Favorite Pokémons');
    expect(containsFavoritePokemons).toBeInTheDocument();
  });
  it('Tests if the path to About works', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const containsAboutPokedex = getByText('About Pokédex');
    expect(containsAboutPokedex).toBeInTheDocument();
  });
  it('Tests if the path to Favorite Pokémons works', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const containsFavoritePokemons = getByText('Favorite pokémons');
    expect(containsFavoritePokemons).toBeInTheDocument();
  });
  it('Tests if the application redirects to a Not Found page if unknown URL', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const urlNF = getByAltText('Pikachu crying because the page requested was not found');
    expect(urlNF).toBeInTheDocument();
  });
});
