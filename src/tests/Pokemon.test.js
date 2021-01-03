import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o Pokemon.js', () => {
  it('Verifica se é renderizado corretamente o card', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByAltText('Pikachu sprite').outerHTML;
    expect(pokemonImage).toBe('<img src="https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png" alt="Pikachu sprite">');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
  });
  it('Verifica se há um link que redireciona para os detalhes', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    fireEvent.click(details);
    const { pathname } = history.location;
    const summary = getByText('Summary');
    expect(pathname).toBe('/pokemons/25');
    expect(summary).toBeInTheDocument();
  });
  it('Verifica se há um ícone de favorito ao favoritar um pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    fireEvent.click(details);
    const favoritePokeCheck = getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokeCheck);
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toContainHTML('src="/star-icon.svg"');
    expect(starIcon).toContainHTML('alt="Pikachu is marked as favorite"');
  });
});
