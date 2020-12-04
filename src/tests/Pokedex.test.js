import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import { Pokedex } from '../components';
import { fireEvent } from '@testing-library/react';

describe('Testando Pokedex', () => {

  it('deve trocar de pokemon ao clicar no "Próximo Pokemon"', () => {
    const pokemons = [{ "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { getByText } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)

    const nextPokemon = getByText(/Próximo pokémon/i);
    let actualPokemon = getByText(pokemons[0].name)
    expect(actualPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon)
    actualPokemon = getByText(pokemons[1].name)
    expect(actualPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon)
    actualPokemon = getByText(pokemons[2].name)
    expect(actualPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon)
    actualPokemon = getByText(pokemons[0].name)
    expect(actualPokemon).toBeInTheDocument();
  });

  it('deve mostrar apenas um pokemon por vez', () => {
    const pokemons = [{ "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { queryByText } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)

    const nextPokemon = queryByText(/Próximo pokémon/i);
    let actualPokemon = queryByText(pokemons[0].name)
    expect(actualPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon)
    actualPokemon = queryByText(pokemons[1].name)
    const previousPokemon = queryByText(pokemons[0].name)
    expect(actualPokemon).toBeInTheDocument();
    expect(previousPokemon).not.toBeInTheDocument();
  });

  it('deve ter os botões de filtro', () => {
    const pokemons = [{ "id": 10, "name": "Pikacho", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { queryByTestId, queryAllByTestId } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)

    const btnsTypes = queryAllByTestId('pokemon-type-button')

    fireEvent.click(btnsTypes[0])
    const btnNext = queryByTestId('next-pokemon')

    expect(btnNext.disabled).toBe(false);

    fireEvent.click(btnsTypes[1])

    const pokemonType = queryByTestId('pokemonType')

    expect(btnsTypes[1].textContent).toBe(pokemonType.textContent);
  });

  it('deve ter o botão para limpar o filtro ALL', () => {
    const pokemons = [{ "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { queryByTestId, queryAllByTestId, queryByText } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)

    const btnsTypes = queryAllByTestId('pokemon-type-button')
    const btnAll = queryByText('All')

    fireEvent.click(btnsTypes[0])
    let btnNext = queryByTestId('next-pokemon')
    expect(btnNext.disabled).toBe(true);

    fireEvent.click(btnAll)
    btnNext = queryByTestId('next-pokemon')
    expect(btnNext.disabled).toBe(false);
  });

  it('deve ter um botão para cada tipo de pokemon listado', () => {
    const pokemons = [{ "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { queryByTestId, queryAllByTestId, } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)
    const types = ['eletric', 'fire', 'bug']
    const btnsTypes = queryAllByTestId('pokemon-type-button')

    expect(btnsTypes.length).toBe(types.length);
  });

  it('Deve possuir o texto encountered pokemons', () => {
    const pokemons = [{ "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }, { "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly." }, { "id": 10, "name": "Caterpie", "type": "Bug", "averageWeight": { "value": "2.9", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)", "foundAt": [{ "location": "Johto Route 30", "map": "https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png" }, { "location": "Johto Route 31", "map": "https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png" }, { "location": "Ilex Forest", "map": "https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png" }, { "location": "Johto National Park", "map": "https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png" }], "summary": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies." }]
    const isPokemonFavoriteById = { "4": true, "10": false, "23": false, "25": true, "65": false, "78": false, "143": false, "148": false, "151": false }
    const { queryByText } = renderWithRouter(<Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />)
    const headingText = queryByText('Encountered pokémons')

    expect(headingText.tagName).toBe('H2');
  });
});

