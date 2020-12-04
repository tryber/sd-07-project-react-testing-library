import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('mostra o caminho da pokedex é `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Testa caminho, home, about e Pokemon favorito', () => {
  it('testar se o link Home encaminha para `/home`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Home/i).href).toEqual('http://localhost/');
  });
  it('testar se o link About encaminha para `/About`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/About/i)).toBeInTheDocument();
    expect(getByText(/About/i).href).toBe('http://localhost/about');
  });
  it('testar se o link Favorite Pokémon encaminha para `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    expect(getByText(/Favorite Pokémons/i).href).toBe('http://localhost/favorites');
  });
  it('Testar se o link é redirecionado para `not found`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = 'http://localhost/xablau';
    history.push(route);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
