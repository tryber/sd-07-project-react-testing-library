import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { history } = renderWithRouter(<App />);

  const pathForHome = history.location.pathname;
  expect(pathForHome).toBe('/');
});

test('render 3 links Home, About and Favorite pokemons', () => {
  const { getByText } = renderWithRouter(<App />);

  const home = getByText('Home');
  const about = getByText('About');
  const favorite = getByText('Favorite Pokémons');

  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('redirect to path / when click home link', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const home = getByText('Home');

  fireEvent.click(home);
  const pathForHome = history.location.pathname;
  expect(pathForHome).toBe('/');
});


test('redirect to path /about when about link is clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const about = getByText('About');

  expect(about).toBeInTheDocument();

  fireEvent.click(about);
  const pathToAbout = history.location.pathname;
  expect(pathToAbout).toBe('/about');
});

test('redirect to path /favorites when favorite pokemons link is clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const favorite = getByText('Favorite Pokémons');
  expect(favorite).toBeInTheDocument();

  fireEvent.click(favorite);
  const pathToFavorites = history.location.pathname;
  expect(pathToFavorites).toBe('/favorites');
});

test('redirect to page not found when an unknown url is passed', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('unknown page');

  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});

