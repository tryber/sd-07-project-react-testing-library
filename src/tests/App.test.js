
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

test('When load the URL “/”, the Pokedex main page must show up', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const path = history.location.pathname;
  expect(path).toBe('/');
  const text = getByText(/Encountered pokémons/);
  expect(text).toBeInTheDocument();
});

describe('On top of Application, must have fixed nav links', () => {
  describe('First link must have the text Home with the URL"/"', () => {
    test('The link must have the text Home', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Home/);
      expect(link).toBeInTheDocument();
    });

    test('Clicking on "Home" in the nav bar, the application must redirect to the home page, URL "/"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Home/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/');
    });
  });

  describe('Second link must have the text About with the URL /about', () => {
    test('The link must have the text About', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/About/);
      expect(link).toBeInTheDocument();
    });

    test('When clicking the link "About" in the nav bar, the application must redirect to the About page, URL "/about"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/About/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/about');
    });
  });

  describe('Third link must have the text Favorite Pokémons with the URL /favorites', () => {
    test('Third link must have the text Favorite Pokémons', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Favorite Pokémons/);
      expect(link).toBeInTheDocument();
    });

    test('When clickin the link "Favorite Pokémons" in the nav bar, the application must redirect to the Favorite Pokemon page, na URL "/favorites"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Favorite Pokémons/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/favorites');
    });
  });

  test('Unknown URL shows Not Found', () => {
    const history = createMemoryHistory();
    history.push('/pageNotFound');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const notFoundText = getByText(/Page requested not found/);
    expect(notFoundText).toBeInTheDocument();
  });
});