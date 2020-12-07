import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test the App.js file', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
describe('Test whether on the top contains a fixed set of navigation links', () => {
  test('the page should contain links to Home About and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Test if is redirected to the correct page indicated in the link', () => {
  test('The page must be redirected to the correct path when the link is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    const about = getByText('About');
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Test if redirected to the `Not Found` page when entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagenotfound/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
