import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('rotas', () => {
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
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testa se home é renderizado', () => {
    const { getByText } = renderWithRouter(<App />);
    const primeiroLink = getByText('Home');
    expect(primeiroLink).toBeInTheDocument();
  });

  it('Testa se about é renderizado', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const aboutLink = getByText('About Pokédex');
    expect(aboutLink).toBeInTheDocument();
  });

  it('Testa se Favorite Pokemons é renderizado', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const testandoFavorito = getByText('Favorite pokémons');
    expect(testandoFavorito).toBeInTheDocument();
  });

  it('Testa se Favorite Pokemons é renderizado', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/error');
    const NotFound = getByAltText(
      'Pikachu crying because the page requested was not found');
    expect(NotFound).toBeInTheDocument();
  });
});
