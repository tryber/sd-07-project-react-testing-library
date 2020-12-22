import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Teste se a aplicação é redirecionada'
+ 'para a página de Pokémons Favoritados, na URL'
+ 'favorites, ao clicar no link Favorite Pokémons'
+ 'da barra de navegação', () => {
  it('Deve renderizar o componente FavoritePokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite'
  + 'pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);

    const favoriteText = getByText('No favorite pokemon found');

    expect(favoriteText).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />);

    const { getByText } = render(<FavoritePokemons />);

    const pokemonNameOne = getByText('Pikachu');
    const pokemonNameTwo = getByText('Charmander');

    expect(pokemonNameOne).toBeInTheDocument();
    expect(pokemonNameTwo).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0]] } />);

    const { queryByText } = render(<FavoritePokemons />);

    const pokemonNotFavoite = queryByText('Dragonair');

    expect(pokemonNotFavoite).not.toBeInTheDocument();
  });
});
