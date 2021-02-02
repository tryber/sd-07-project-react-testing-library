import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo Pokemon.js', () => {
  test('testes', () => {
    const { getByText, getByRole, getByTestId, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const name = getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');

    const type = getByTestId('pokemonType');
    expect(type.innerHTML).toBe('Electric');

    const weight = getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');

    const link = getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(link);
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));

    const icon = getAllByRole('img');
    expect(icon[1].src).toBe('http://localhost/star-icon.svg');
    expect(icon[1].alt).toBe('Pikachu is marked as favorite');
  });
});
