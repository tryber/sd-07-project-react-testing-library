import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

/*
test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
}); */

describe('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('About')).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Teste se a aplicação é redirecionada para a página inicial, na URL ao clicar no link Home da barra de navegação.', () => {
  it('Deve renderizar o componente Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/');

    expect(getByText('Home')).toBeInTheDocument();
  });
});
