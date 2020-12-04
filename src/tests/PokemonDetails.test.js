import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';
import { PokemonDetails } from '../components';

describe('Testando PokemonDetail', () => {

  it('deve mostrar os detalhes do pokemon', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)

    const nameDetailsTest = getByText(`${pikachu.name} Details`);

    expect(nameDetailsTest).toBeInTheDocument();
  });

  it('não deve mostrar o text detalhes do pokemon', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { queryByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)

    const moreDetailsTest = queryByText(/More Details/i);

    expect(moreDetailsTest).toBe(null);
  });

  it('deve conter um heading', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { getByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)

    const moreDetailsTest = getByRole('heading', { name: /Summary/i });

    expect(moreDetailsTest.tagName).toBe('H2');
    expect(moreDetailsTest.textContent).toBe(' Summary ');
  });

  it('deve conter um parágrafo de descrição', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { queryByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)

    const moreDetailsTest = queryByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);

    expect(moreDetailsTest.tagName).toBe('P');
  });

  it('deve conter um heading para a seção de mapas', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { queryByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)

    const moreDetailsTest = queryByText(`Game Locations of ${pikachu.name}`);

    expect(moreDetailsTest.tagName).toBe('H2');
  });

  it('deve conter as imagens de localização', () => {
    const pikachu = { "id": 25, "name": "Pikachu", "type": "Electric", "averageWeight": { "value": "6.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)", "foundAt": [{ "location": "Kanto Viridian Forest", "map": "https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png" }, { "location": "Kanto Power Plant", "map": "https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png" }], "summary": "This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat." }
    const favoritePokemon = () => { }
    const { queryAllByAltText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={{ [pikachu.id]: false }}
      match={{ params: { id: pikachu.id.toString() } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={favoritePokemon} />)
    
    const {foundAt} = pikachu

    const moreDetailsTest = queryAllByAltText(/Pikachu location/i);

    expect(moreDetailsTest.length).toBe(foundAt.length);
    expect(moreDetailsTest[0].src).toBe(foundAt[0].map);
    expect(moreDetailsTest[1].src).toBe(foundAt[1].map);
  });

  it('deve poder favoritar um pokemon', () => {
    //utilizado app uma vez que a função de favoritar é herdada do app
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText(/More details/);
    fireEvent.click(moreDetailsLink);

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();

    const checkbox = screen.getByLabelText(/Pokémon favoritado/);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});


