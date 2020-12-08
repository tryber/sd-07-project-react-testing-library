import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando a página de prokémons favoritos', () => {
  it('testando se exibe mensagem quando não tem pokémon favorito', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const msg = getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('Testando se é exibido todos os cards de pokémons favoritados.', () => {
    const favorite = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }];
    const poke = renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
    const pikachuFavorito = poke.getByText(favorite[0].name);
    expect(pikachuFavorito).toBeInTheDocument('Pikachu');
  });

  it('Testa se não é exibito pokémon favorito', () => {
    const favorite = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }];
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
    const notContain = queryByText('Caterpie');

    expect(notContain).toBe(null);
  });
});
