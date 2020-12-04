import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Deve renderizar o home no /', () => {
    const { getByText, history } = renderWithRender(<App />);

    fireEvent.click(getByText(/Home/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/');

    const home = getByText(/Encountered pokémons/);
    expect(home).toBeInTheDocument();
  });

  it('Deve renderizar o About no /about', () => {
    const { getByText, history } = renderWithRender(<App />);

    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('Deve renderizar o Favorite Pokémons no /favorites', () => {
    const { getByText, history } = renderWithRender(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    const favorite = getByText(/Favorite pokémons/);
    expect(favorite).toBeInTheDocument();
  });

  it('Deve renderizar notfound ', () => {
    const { getByText, history } = renderWithRender(<App />);
    history.push('/pagina-nao-existe');
    const { pathname } = history.location;

    expect(pathname).toBe('/pagina-nao-existe');

    const notfound = getByText(/Page requested not found/);
    expect(notfound).toBeInTheDocument();
  });
});
