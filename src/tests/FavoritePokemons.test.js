import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import { FavoritePokemons } from '../components';

describe('Testando o arquivo FavoritePokemons', () => {
  it('deve conter texto específico sem pokemons favoritados', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const zeroFavorites = getByText(/No favorite pokemon found/i);

    expect(zeroFavorites).toBeInTheDocument();
  });

  it('deve Exibir os pokemosn favoritados', () => {
    const pokeFavorites = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }, { id: 4, name: 'Charmander', type: 'Fire', averageWeight: { value: '8.5', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)', foundAt: [{ location: 'Alola Route 3', map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' }, { location: 'Kanto Route 3', map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' }, { location: 'Kanto Route 4', map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' }, { location: 'Kanto Rock Tunnel', map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' }], summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.' }];

    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokeFavorites } />,
    );

    const favorite1 = getByText(pokeFavorites[0].name);
    const favorite2 = getByText(pokeFavorites[1].name);

    expect(favorite1).toBeInTheDocument();
    expect(favorite2).toBeInTheDocument();
  });

  it('deve não encontrar um pokemon não favoritado', () => {
    const pokeFavorites = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }, { id: 4, name: 'Charmander', type: 'Fire', averageWeight: { value: '8.5', measurementUnit: 'kg' }, image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)', foundAt: [{ location: 'Alola Route 3', map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' }, { location: 'Kanto Route 3', map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png' }, { location: 'Kanto Route 4', map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png' }, { location: 'Kanto Rock Tunnel', map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png' }], summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.' }];

    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokeFavorites } />,
    );

    const favoriteNot = queryByText('Alakazan');

    expect(favoriteNot).toBe(null);
  });
});
