import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o App.js', () => {
  it('Verifica se mostra a PokeDex se a rota é /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Verifica se a Pokedex possui os links de redirecionamento', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    const home = getByText('Home');
    const favPoke = getByText('Favorite Pokémons');
    expect(about).toHaveTextContent('About');
    expect(home).toHaveTextContent('Home');
    expect(favPoke).toHaveTextContent('Favorite Pokémons');
  });
  it('Verifica se ao clicar em Home, é redirecionado para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(pathname).toBe('/');
  });
  it('Verifica se ao clicar em About, é redirecionado para a página sobre', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(getByText('About Pokédex')).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });
  it('Verifica se ao clicar em About, é redirecionado para a página sobre', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favPoke = getByText('Favorite Pokémons');
    fireEvent.click(favPoke);
    const { pathname } = history.location;
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });
  it('Verifica se em caminhos que não existem, aparece uma página de erro', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xuxu');
    const { pathname } = history.location;
    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(pathname).toBe('/xuxu');
  });
});
