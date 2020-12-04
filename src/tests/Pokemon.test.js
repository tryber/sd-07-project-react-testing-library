import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import { Pokemon } from '../components';

describe('Testando Pokemon', () => {

  it('deve mostrar o card do pokemon', () => {
    const pokemon = {"id":25,"name":"Pikachu","type":"Electric","averageWeight":{"value":"6.0","measurementUnit":"kg"},"image":"https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png","moreInfo":"https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)","foundAt":[{"location":"Kanto Viridian Forest","map":"https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png"},{"location":"Kanto Power Plant","map":"https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png"}],"summary":"This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat."}
    const isFavorite = true
    const showDetailsLink = true

    const { getByText, getByAltText, getByTestId } = renderWithRouter(<Pokemon isFavorite={isFavorite} pokemon={pokemon} showDetailsLink={showDetailsLink} />)

    const pokemonActual = {
      type: getByTestId('pokemonType'),
      name:getByText(/pikachu/i),
      weight: getByText(/Average weight:6.0kg/i),
      image: getByAltText(/Pikachu sprite/i),
      details: getByText(/More details/i),
      favorite: getByAltText(/Pikachu is marked as favorite/i)
    }
    expect(pokemonActual.type.textContent).toBe('Electric')
    expect(pokemonActual.name).toBeInTheDocument()
    expect(pokemonActual.weight).toBeInTheDocument()
    expect(pokemonActual.image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png')
    expect(pokemonActual.details.href).toBe('http://localhost/pokemons/25')
    expect(pokemonActual.favorite).toBeInTheDocument()
    expect(pokemonActual.favorite.src).toBe('http://localhost/star-icon.svg')     
  });  
});


