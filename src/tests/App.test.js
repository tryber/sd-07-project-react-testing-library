import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
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

test('Check if you render the `Home` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();

  fireEvent.click(linkHome);
});

test('Check if you render the `About` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
});

test('Check if you render the `Favorite Pokémon` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
  expect(linkFavoritePokémons).toBeInTheDocument();
});

test('Check if the application is redirected to the home.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = getByText(/Home/i);
  fireEvent.click(linkHome);
  expect(screen.getByText(/Encountered pokémons/i));
});

test('Check if the application is redirected to the about.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);
  expect(screen.getByText(/About Pokédex/i));
});

test('Check if the application is redirected to the favorite pokemons.', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
  fireEvent.click(linkFavoritePokémons);
  const expectValue = 2;
  expect(screen.getAllByText(/Favorite pokémons/i).length).toEqual(expectValue);
});
