import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('exibe No favorite pokemon found se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  it('if show favorited pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/More details/i);
    fireEvent.click(details);
    const input = screen.getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(input);
    history.push('/favorites');
    const pokemons = screen.getByTestId('pokemon-name');
    expect(pokemons).toBeInTheDocument();
  });
  // codigo Samantha
  it('nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const favorite = [];
    renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    expect(queryByText('Snorlax')).not.toBeInTheDocument();
  });
});
