import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renderiza uma leitura com o texto `Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('Mostra a Pokedex quando a rota for`/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
describe(' link de navegação fixo na parte superior do aplicativo', () => {
  it('O primeiro link deve ter um texto HOME com / URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toHaveAttribute('href', '/');
  });

  it('O segundo link deve ter um texto Sobre com URL `/`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About')).toHaveAttribute('href', '/about');
  });

  it('O terceiro link deve ter Pokémons favoritos com `/ favoritos``', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Favorite Pokémons')).toHaveAttribute(
      'href',
      '/favorites',
    );
  });
});
test(' redirecionar para página', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/none'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
