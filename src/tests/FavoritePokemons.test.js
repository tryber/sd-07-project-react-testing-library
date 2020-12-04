import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";
import Favorite from "../components/FavoritePokemons";

describe('Testando o arquivo FavoritePokemons.js', () => {

  it('Teste se é exibido na tela a mensagem No favorite pokemon found,caso a pessoa não tenha pokémons favoritos.', () => {
    const { queryByText } = renderWithRouter(<Favorite />);
    const text = queryByText(/No favorite pokemon found/);

    expect(text).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados. ', () => {
    const mockFav =
      [
        {
          "id": 4, "name": "Charmander", "type": "Fire", "averageWeight": { "value": "8.5", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)", "foundAt": [{ "location": "Alola Route 3", "map": "https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png" }, { "location": "Kanto Route 3", "map": "https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png" }, { "location": "Kanto Route 4", "map": "https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png" }, { "location": "Kanto Rock Tunnel", "map": "https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png" }], "summary": "The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly."
        },
        {
          "id": 65, "name": "Alakazam", "type": "Psychic", "averageWeight": { "value": "48.0", "measurementUnit": "kg" }, "image": "https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png", "moreInfo": "https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)", "foundAt": [{ "location": "Unova Accumula Town", "map": "https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png" }], "summary": "Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes."
        }
      ]

    const { queryByText } = renderWithRouter(<Favorite pokemons={mockFav} />);
    const charmander = queryByText(/Charmander/);
    const alakazam = queryByText(/Alakazam/);

    expect(charmander).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();


  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado.', () => {

    const { queryByText } = renderWithRouter(<Favorite />);
    const charmander = queryByText(/Charmander/);
    const alakazam = queryByText(/Alakazam/);

    expect(charmander).not.toBeInTheDocument();
    expect(alakazam).not.toBeInTheDocument();

  });
});
