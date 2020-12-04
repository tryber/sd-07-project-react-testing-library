import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// test("renders a reading with the text `Pokédex`", () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

describe('Testando o arquivo App.js', () => {
  it('Teste se a página ... no caminho de URL /.', () => {
    const { getByText } = renderWithRouter(<App />);
    const text1 = getByText('Pokédex');
    const text2 = getByText('Encountered pokémons');

    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnHome = getByText('Home');
    const btnAbout = getByText('About');
    const btnFavorite = getByText('Favorite Pokémons');

    expect(btnHome).toBeInTheDocument();
    expect(btnAbout).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto Home com a URL /;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btnHome = getByText('Home');

    fireEvent.click(btnHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('O segundo link deve possuir o texto About com a URL /about;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btnAbout = getByText('About');

    fireEvent.click(btnAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('O terceiro link ... com a URL /favorites.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btEncountered = getByText('Favorite Pokémons');

    fireEvent.click(btEncountered);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação ... URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/batata-frita');

    const noMatch = getByText('Page requested not found');

    expect(noMatch).toBeInTheDocument();
  });
});
