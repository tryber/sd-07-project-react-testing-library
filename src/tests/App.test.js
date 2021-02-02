import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('A página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    expect(home.href.replace('http://localhost', '')).toBe('/');
  });
  it('O segundo link deve possuir o texto About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText(/About/i);
    expect(about.href.replace('http://localhost', '')).toBe('/about');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite.href.replace('http://localhost', '')).toBe('/favorites');
  });
});

test('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const home = getByText(/Home/i);
  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const about = getByText(/About/i);
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');

});

test('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const favoritos = getByText(/Favorite Pokémons/i);
  fireEvent.click(favoritos);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  history.push('/url-desconhecida');
  const notFoundText = getByText(/Page requested not found/i);
  expect(notFoundText).toBeInTheDocument();
});
