import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Building requirement one tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Test if the Pokédex main page is rendered in the URL / path', () => {
    const { getByText } = renderWithRouter(<App />);
    const subTitle = getByText(/Encountered pokémons/i);
    expect(subTitle).toBeInTheDocument();
  });

  it('Test if application link Home is redirected to the home URL /.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const containsHome = getByText(/Home/i);
    expect(containsHome).toBeInTheDocument();
    fireEvent.click(containsHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Test if application link About is redirected to the home URL /about.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const containsAbout = getByText(/About/i);
    fireEvent.click(containsAbout);
    expect(containsAbout).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Test if application link Home is redirected to the home URL /fqavorite.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const containsFavorite = getByText(/Favorite/i);
    expect(containsFavorite).toBeInTheDocument();
    fireEvent.click(containsFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
// Link consultado:
// https://app.betrybe.com/course/front-end/react/tests/rtl-react-router
// https://app.betrybe.com/course/front-end/react/tests/rtl-queries-events-async
