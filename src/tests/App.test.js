import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
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

test('verifying if there are links in the app', () => {
  const { getByText } = renderWithRouter(<App />);
  
  const verifyingHome = getByText('Home');
  const verifyingAbout = getByText('About');
  const verifyingFavoritePokemons = getByText('Favorite Pokémons');

  expect(verifyingHome).toBeInTheDocument();  
  expect(verifyingAbout).toBeInTheDocument();
  expect(verifyingFavoritePokemons).toBeInTheDocument();
});

test("redirects to '/' page when clicking 'Home' link", ()=> {
  const { getByText, history } = renderWithRouter(<App />);
  
  const home = getByText('Home');
  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test("redirects to '/about' page when clicking 'About' link", () => {
  const { getByText, history } = renderWithRouter(<App />);

  const about = getByText('About');
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test("redirects to '/favorites' page when clicking 'Favorites pokemons' link", () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favoritesPokemons = getByText('Favorite Pokémons');
  fireEvent.click(favoritesPokemons);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('if app is redirected to the Not Found page when entering an unknown URL.', () =>{
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/pagina-nao-existe');
  const notFound = getByText('Pikachu crying because the page requested was not found');
  expect(notFound).toBeInTheDocument();
});
