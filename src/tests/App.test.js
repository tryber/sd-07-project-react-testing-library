import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('The first link must have the text "Home"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Home/i)).toBeInTheDocument();
});

it('The first link must have the text "About"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/About/i)).toBeInTheDocument();
});

it('The first link must have the text "Favorite Pokémons"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

it('Test if the application is redirected to the home page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
});

it('Test if the application is redirected to the About page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});

it('Test if the application is redirected to the Favorite Pokémon page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('Test if the application is redirected to the Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pageThatDoesNotExist');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
