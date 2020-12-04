import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando about', () => {
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const semCard = queryByTestId('pokemon-name');
    expect(semCard).toBeNull();
  });

  it('Teste se é exibido na tela a mensagem "No favorite" pokemon found.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const naoFavorito = getByText('No favorite pokemon found');
    expect(naoFavorito).toBeInTheDocument();
  });

  it('Teste se é exibido TODOS os cards de pokémons favoritados.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    history.push('/pokemons/4');
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const pokemon1 = getByText('Pikachu');
    const pokemon2 = getByText('Charmander');
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).toBeInTheDocument();
  });
});
