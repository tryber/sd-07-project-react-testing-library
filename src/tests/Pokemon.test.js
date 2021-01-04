import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  test('É renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByRole } = RenderWithRouter(<App />);
    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
    expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
  test('Existe um link de navegação para exibir detalhes deste Pokémon', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const favoritePokemon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
