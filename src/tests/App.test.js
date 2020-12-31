import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o arquivo App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
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

  describe('teste dos links do menu', () => {
    it('testa o texto Home', () => {
      const { getByText } = renderWithRouter(<App />);
      const homeText = getByText('Home');
      expect(homeText).toBeInTheDocument();
    });

    it('testa o texto About', () => {
      const { getByText } = renderWithRouter(<App />);
      const homeText = getByText(/About/);
      expect(homeText).toBeInTheDocument();
    });

    it('testa o texto Favorite Pokémons', () => {
      const { getByText } = renderWithRouter(<App />);
      const homeText = getByText('Favorite Pokémons');
      expect(homeText).toBeInTheDocument();
    });

    it('testa a rota do Home', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/Home/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('testa a rota do About', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/About/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('testa a rota dos favoritos', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/Favorite Pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('testa um caminho não existente e a renderização do Not Found', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push('/pagina/que-nao-existe/');
      const noMatch = getByText(/Page requested not found/i);
      expect(noMatch).toBeInTheDocument();
    });
  });
});
