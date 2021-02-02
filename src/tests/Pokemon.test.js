import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('É renderizado um card com as informações de determinado pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByTestId('pokemonType').textContent).toBe('Electric');
    const pokemonImage = getByRole('img');
    expect(pokemonImage).toHaveAttribute(
      'src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('O peso médio do pokémon deve ser exibido com o texto Average weight', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });
});

test('Ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByLabelText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/More details/i));
  expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  const favoritePokemonButton = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoritePokemonButton);
  expect(getByAltText('Pikachu is marked as favorite').src).toBe(
    'http://localhost/star-icon.svg',
  );
});

test('Redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <MemoryRouter history={ history }>
      <App />
    </MemoryRouter>,
  );
  const pokemonDetailsLink = getByText(/More details/i);
  fireEvent.click(pokemonDetailsLink);
  expect(pokemonDetailsLink.href).toBe('http://localhost/pokemons/25');
});
