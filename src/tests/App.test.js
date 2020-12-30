import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

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
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

   expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('check if at the top of the page you have the "Home, About, Favorite Polémons link"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('navigate to home', () => {
  const history = createMemoryHistory(); 
  const { getByText } = render(
    <Router history = { history }>
      <App />
    </Router>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location
  expect(pathname).toBe('/')
});

test('navigate to About', () => {
  const history = createMemoryHistory(); 
  const { getByText } = render(
    <Router history = { history }>
      <App />
    </Router>,
  );

  expect(getByText('About')).toBeInTheDocument();
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location
  expect(pathname).toBe('/about')
});

test('navigate to Favorite Pokémons', () => {
  const history = createMemoryHistory(); 
  const { getByText } = render(
    <Router history = { history }>
      <App />
    </Router>,
  );

  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location
  expect(pathname).toBe('/favorites')
});

test('navigate to Not Found', () => {
  const history = createMemoryHistory(); 
  const { getByText } = render(
    <Router history = { history }>
      <App />
    </Router>,
  );

  const route = '/teste';
  history.push(route);
  expect(getByText('Page requested not found')).toBeInTheDocument();
  
});
