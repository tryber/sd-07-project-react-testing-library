import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

describe('Requirement 1: Testing App.js', () => {
  test('if the Pokedex is displayed when the URL is "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('if there are navigation links at the top of the page', () => {
    const { getByRole } = renderWithRouter(<App />);

    const homeLink = getByRole('link', { name: /home/i });
    const aboutLink = getByRole('link', { name: /about/i });
    const favPokeLink = getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokeLink).toBeInTheDocument();
  });

  test('if "Home" redirects to "/" after clicking', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', { name: /home/i });
    const { pathname } = history.location;

    fireEvent.click(homeLink);
    expect(pathname).toBe('/');
  });

  test('if "About" redirects to "/about" after clicking', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', { name: /about/i });

    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if "Favorite Pokémons" redirects to "/favorites" after clicking', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favPokeLink = getByRole('link', { name: /favorite pokémons/i });

    fireEvent.click(favPokeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if an unknown URL redirects to the "Not Found" page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/anyurl');

    expect(getByText(/not found/)).toBeInTheDocument();
  });
});
