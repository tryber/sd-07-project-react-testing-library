import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

describe('Teste se a página principal da Pokédex aparece via URL /.', () => {
  it('Deveria carregar a home via URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const homeText = getByText('Encountered pokémons');
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(homeText).toBeInTheDocument();
  });
});

describe('Teste se o topo da aplicação contém um conjunto de links de navegação.', () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeText = getByText('Home');
    expect(homeText).toBeInTheDocument();
  });
  it('O segundo link deve possuir o texto About.', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    expect(about).toBeInTheDocument();
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorite = getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });
});

describe('Teste se a aplicação vai para /about ao clicar no link about', () => {
  it('URL deve ser /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  it('URL deve ser /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutButton = getByText('About');
    fireEvent.click(aboutButton);
    expect(history.location.pathname).toBe('/about');
  });
  it('URL deve ser /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteButton = getByText('Favorite Pokémons');
    fireEvent.click(favoriteButton);
    expect(history.location.pathname).toBe('/favorites');
  });
});

describe('Teste se a aplicação vai para Not Found ao entrar em uma URL N/A.', () => {
  it('URL deve ser /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/desconhecido');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
