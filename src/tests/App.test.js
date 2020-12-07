import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// oi

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('test home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/');
  const home = getByText('Encountered pokémons');
  expect(home).toBeInTheDocument();
});

describe('links', () => {
  it('test About', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('test Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritoLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritoLink);
    const favorito = getByText('Favorite pokémons');
    expect(favorito).toBeInTheDocument();
  });

  it('test home', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });
});

test('test pagina aleatoria', () => {
  const { getByAltText, history } = renderWithRouter(<App />);
  history.push('/xablau');
  const notfund = getByAltText('Pikachu crying because the page requested was not found');
  expect(notfund).toBeInTheDocument();
});
