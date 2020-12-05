import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando o arquivo App.js, requisito 1', () => {
  it('Pokédex é renderizada ao carregar a aplicação no caminho de URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/About/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
  });

  it('Teste na URL "/" ao clicar no link Home da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste na URL "/about" ao clicar no link About da barra de navegação.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste na URL "/favorites" ao clicar no link Pokémons Favoritados da barra.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
