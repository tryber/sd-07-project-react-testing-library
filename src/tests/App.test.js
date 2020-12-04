import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('testando o componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Testando se o caminho / é renderizado', () => {
    const { getByText } = renderWithRoute(<App />);
    const testandoHome = getByText('Home');
    expect(testandoHome).toBeInTheDocument();
    const testandoAbout = getByText('About');
    expect(testandoAbout).toBeInTheDocument();
    const testandoFavoritePokémons = getByText('Favorite Pokémons');
    expect(testandoFavoritePokémons).toBeInTheDocument();
  });
  it('Testando redirecionamento ao clicar no home', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('Home'));
    const testandoHome = getByText('Home');
    expect(testandoHome).toBeInTheDocument();
    const testandoAbout = getByText('About');
    expect(testandoAbout).toBeInTheDocument();
    const testandoFavoritePokémons = getByText('Favorite Pokémons');
    expect(testandoFavoritePokémons).toBeInTheDocument();
  });
  it('Testando redirecionamento ao clicar no about', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('About'));
    const testandoAbout = getByText('About Pokédex');
    expect(testandoAbout).toBeInTheDocument();
  });
  it('Testando redirecionamento ao clicar no Favorit Pokemons', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const testandoAbout = getByText('Favorite pokémons');
    expect(testandoAbout).toBeInTheDocument();
  });
  it('Testando redirecionamento para página não encontrada', () => {
    const { getByAltText, history } = renderWithRoute(<App />);
    history.push('/xablau');
    const testandoNotFound = getByAltText('Pikachu crying because the page requested was not found');
    expect(testandoNotFound).toBeInTheDocument();
  });
});
