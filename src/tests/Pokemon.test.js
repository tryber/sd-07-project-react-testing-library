import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Referencia: Daniel Cespedes
describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, queryAllByText, getByAltText } = renderWithRouter(<App />);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const pokemonType = queryAllByText(/Electric/i);
    expect(pokemonType[0]).toBeInTheDocument();
    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();
    const pokemonImg = getByAltText(/pikachu sprite/i);
    expect(pokemonImg).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('card do Pokémon na contém um link de para exibir detalhes deste Pokémon.', () => {
    const { getByText, history, getByRole, getByAltText } = renderWithRouter(<App />);

    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteButton = getByRole('checkbox');
    fireEvent.click(favoriteButton);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });

  it('should have a p with attribut data-testid="pokemonType"', () => {
    const { container } = renderWithRouter(<App />);

    const dataId = container.querySelector('[data-testid="pokemonType"]');
    expect(dataId.innerHTML).toBe('Electric');
  });
});
