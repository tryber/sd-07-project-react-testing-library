import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

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
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
// teste extraído de https://github.com/tryber/sd-07-project-react-testing-library/blob/ff0583e67652b58b80b2a5932d67279018fcc1ab/src/tests/App.test.js
// sobre MemoryRouter e initialEntries : https://reactrouter.com/web/api/MemoryRouter/initialentries-array

describe('Testando se possui os links com os textos', () => {
  it('Primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeText = getByText(/Home/i);
    expect(homeText).toBeInTheDocument();
  });
  // teste do primeiro link extraído e adaptado de https://github.com/tryber/sd-07-project-react-testing-library/blob/ff0583e67652b58b80b2a5932d67279018fcc1ab/src/tests/App.test.js
  it('Segundo link deve possuir o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutText = getByText(/About/i);
    expect(aboutText).toBeInTheDocument();
  });
  it('Terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteText = getByText(/Favorite Pokémons/i);
    expect(favoriteText).toBeInTheDocument();
  });
});

describe('Testando as rotas dos links', () => {
  it('Ao clicar em Home, o link deve ser "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Ao clicar About, o link deve ser "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Ao clicar Favorite Pokémons, o link deve ser "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
