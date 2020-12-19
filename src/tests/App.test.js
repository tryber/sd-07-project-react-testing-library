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

describe('Testando se possui os links com os textos', () => {
  it('Primeiro link deve possuir o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeText = getByText(/home/i);
    expect(homeText).toBeInTheDocument();
  });
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

describe('Testando a rota dos links', () => {
  it('O link do home deve ser /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('O link do about deve ser /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('O link do favorite pokémons deve ser /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Caso o caminho não exista deve ser Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/naoexiste');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
