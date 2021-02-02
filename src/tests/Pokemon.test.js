import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokemons.js', () => {
  it('deve renderizar o card de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(/pikachu sprite/i);

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('deve conter um link de navegação que leve aos detalhes desse pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');

    fireEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    const pokemonDetailsTitle = screen.getByText(/pikachu details/i);

    expect(pathname).toBe('/pokemons/25');
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });

  it('deve conter um link direcionando para uma página com detalhes', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');

    expect(linkMoreDetails.href).toBe('http://localhost/pokemons/25');
  });

  it('o link deve direcionar para a página de detalhes do pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);

    const pokemonDetailsTitle = screen.getByText(/pikachu details/i);
    expect(pokemonDetailsTitle.textContent).toBe('Pikachu Details');
  });

  it('a página de detalhes deve conter a URL com o id do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('deve conter um ícone de estrela nos pokémons favoritos', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);

    const favoritePokemonInput = screen.getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemonInput);

    const starIcon = screen.getByAltText(/pikachu is marked as favorit/i);

    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
