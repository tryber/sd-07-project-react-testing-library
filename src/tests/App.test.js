import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('primeiro requisito', () => {
  test('se a página principal é renderizada no caminho de URL /', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // O primeiro link deve possuir o texto Home.
    const home = getByText('Home');
    expect(home).toBeInTheDocument();
    // O segundo link deve possuir o texto About.
    const about = getByText('About');
    expect(about).toBeInTheDocument();
    // O terceiro link deve possuir o texto Favorite Pokémons.
    const favorite = getByText('Favorite Pokémons');
    expect(favorite).toBeInTheDocument();
  });

  test('se é redirecionada para a home, na URL / ao clicar no link Home', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('se é redirecionada para About, na URL /about, ao clicar no link About', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('se é redirecionada para Favoritados, na URL /favorites ao clicar no link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favorites = getByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('se a aplicação vai para página Not Found ao entrar na URL desconhecida', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const notFound = '/xablau';
    history.push(notFound);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });
