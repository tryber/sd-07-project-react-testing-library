// import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import Pokedex from '../components/Pokedex';

// const mockedPokemons = [
//   {
//     id: 25,
//     name: 'Pikachu',
//     type: 'Electric',
//     averageWeight: {
//       value: '6.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Viridian Forest',
//         map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//       },
//       {
//         location: 'Kanto Power Plant',
//         map:
//           'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//       },
//     ],
//     summary:
//       'This intelligent ... to make them tender enough to eat.',
//   },
//   {
//     id: 4,
//     name: 'Charmander',
//     type: 'Fire',
//     averageWeight: {
//       value: '8.5',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
//     moreInfo:
//       'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Alola Route 3',
//         map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 3',
//         map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 4',
//         map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
//       },
//       {
//         location: 'Kanto Rock Tunnel',
//         map:
//           'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
//       },
//     ],
//     summary:
//       'The flame on ... life force. If it is weak, the flame also burns weakly.',
//   },
//   {
//     id: 10,
//     name: 'Caterpie',
//     type: 'Bug',
//     averageWeight: {
//       value: '2.9',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Johto Route 30',
//         map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
//       },
//       {
//         location: 'Johto Route 31',
//         map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
//       },
//       {
//         location: 'Ilex Forest',
//         map:
//           'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
//       },
//       {
//         location: 'Johto National Park',
//         map:
//           'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
//       },
//     ],
//     summary:
//       'For protection, it releases ... enemies.',
//   },
//   {
//     id: 23,
//     name: 'Ekans',
//     type: 'Poison',
//     averageWeight: {
//       value: '6.9',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Goldenrod Game Corner',
//         map:
//           'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
//       },
//     ],
//     summary:
//       'It can freely ... large prey whole. It can become too heavy to move, however.',
//   },
//   {
//     id: 65,
//     name: 'Alakazam',
//     type: 'Psychic',
//     averageWeight: {
//       value: '48.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Unova Accumula Town',
//         map:
//           'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
//       },
//     ],
//     summary:
//       'Closing both its eyes heightens all its other senses. This enables ... extremes.',
//   },
//   {
//     id: 151,
//     name: 'Mew',
//     type: 'Psychic',
//     averageWeight: {
//       value: '4.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Faraway Island',
//         map:
//           'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
//       },
//     ],
//     summary:
//       'Apparently, ... a strong desire to see it.',
//   },
//   {
//     id: 78,
//     name: 'Rapidash',
//     type: 'Fire',
//     averageWeight: {
//       value: '95.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Route 28',
//         map: 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
//       },
//       {
//         location: 'Johto Mount Silver',
//         map: 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
//       },
//     ],
//     summary:
//       'At full gallop, ... incredibly fast.',
//   },
//   {
//     id: 143,
//     name: 'Snorlax',
//     type: 'Normal',
//     averageWeight: {
//       value: '460.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Vermillion City',
//         map:
//           'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
//       },
//     ],
//     summary:
//       'What ... its hungry belly.',
//   },
//   {
//     id: 148,
//     name: 'Dragonair',
//     type: 'Dragon',
//     averageWeight: {
//       value: '16.5',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
//     moreInfo:
//       'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Johto Route 45',
//         map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
//       },
//       {
//         location: 'Johto Dragons Den',
//         map:
//           'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
//       },
//     ],
//     summary:
//       'They ... instantly.',
//   },
// ];

// const mockedPokemonFavoriteById = {
//   4: false,
//   10: false,
//   23: false,
//   25: false,
//   65: false,
//   78: false,
//   143: false,
//   148: false,
//   151: false,
// };

// const mockedOnlyPokemon = [
//   {
//     id: 25,
//     name: 'Pikachu',
//     type: 'Electric',
//     averageWeight: {
//       value: '6.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Viridian Forest',
//         map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//       },
//       {
//         location: 'Kanto Power Plant',
//         map:
//           'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//       },
//     ],
//     summary:
//       'This intelligent ... to make them tender enough to eat.',
//   },
// ];

// test('contains an h2 heading with the text Encountered Pokémon', () => {
//   const { container } = renderWithRouter(<Pokedex
//     pokemons={ mockedPokemons }
//     isPokemonFavoriteById={ mockedPokemonFavoriteById }
//   />);
//   const [h2] = container.getElementsByTagName('h2');

//   expect(h2).toBeInTheDocument();
//   expect(h2).toHaveTextContent(/Encountered pokémons/i);
// });

// describe('the next Pokémon in list is displayed when the Next button is clicked', () => {
//   test('button must contain the text Next pokémon', () => {
//     const { getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const btnNextPokemon = getByText(/Próximo pokémon/i);
//     fireEvent.click(btnNextPokemon);
//     const nextPokemonByData = mockedPokemons[1].name;
//     const nextPokemon = getByText(nextPokemonByData);

//     expect(nextPokemon).toBeInTheDocument();
//   });
//   test('Pokemons in list must be shown, one by one, by clicking button', () => {
//     const { getAllByTestId } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const boxesInTheDocument = getAllByTestId(/pokemon-name/i);

//     expect(boxesInTheDocument.length).toBe(1);
//   });
//   test('first Pokémon shown by clicking button, if is on the last on the list', () => {
//     const { getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const button = getByText(/Próximo pokémon/i);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     fireEvent.click(button);
//     const pokemon = getByText(/Pikachu/i);

//     expect(pokemon).toBeInTheDocument();
//   });
// });

// test('shown only one Pokémon at a time', () => {
//   const { getAllByTestId } = renderWithRouter(<Pokedex
//     pokemons={ mockedPokemons }
//     isPokemonFavoriteById={ mockedPokemonFavoriteById }
//   />);
//   const pokemon = getAllByTestId(/pokemon-name/i);

//   expect(pokemon).toHaveLength(1);
// });

// describe('Pokédex has the filter buttons', () => {
//   test('Pokédex should only circulate through Pokémon of that type', () => {
//     const { getByRole, getByTestId } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const filterButtons = ['Poison', 'Psychic'];
//     filterButtons.forEach((filter) => {
//       const button = getByRole('button', { name: filter });
//       expect(button).toBeDefined();
//       fireEvent.click(button);
//       const type = getByTestId(/pokemonType/i);
//       expect(type).toHaveTextContent(filter);
//     });
//   });
//   test('button text must match the type name', () => {
//     const { getByRole, getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const buttonAll = getByRole('button', { name: 'All' });

//     expect(buttonAll).toBeDefined();
//     expect(buttonAll).toHaveTextContent(/All/i);

//     fireEvent.click(buttonAll);
//     const pokemon = getByText(/Pikachu/i);

//     expect(pokemon).toBeInTheDocument();
//   });
// });

// describe('Pokédex contains a button to reset the filter', () => {
//   test('button text must be All', () => {
//     const { getByRole, getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const noFilter = getByRole('button', { name: 'All' });
//     fireEvent.click(noFilter);

//     const pikachu = getByText(/Pikachu/i);
//     expect(pikachu).toBeInTheDocument();

//     const btnNextPokemon = getByText(/Próximo pokémon/i);
//     fireEvent.click(btnNextPokemon);

//     const charmander = getByText(/Charmander/i);
//     expect(charmander).toBeInTheDocument();
//   });
//   test('show Pokémon normally (without filters) when the All button clicked', () => {
//     const { getByRole, getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const bugFilter = getByRole('button', { name: 'Bug' });
//     fireEvent.click(bugFilter);
//     const caterpie = getByText(/Caterpie/i);

//     expect(caterpie).toBeInTheDocument();

//     const noFilter = getByRole('button', { name: 'All' });
//     fireEvent.click(noFilter);
//     const pikachu = getByText(/Pikachu/i);

//     expect(pikachu).toBeInTheDocument();
//   });
//   test('load the page, the selected filter should be All', () => {
//     const { getByText } = renderWithRouter(<Pokedex
//       pokemons={ mockedPokemons }
//       isPokemonFavoriteById={ mockedPokemonFavoriteById }
//     />);
//     const pikachu = getByText(/Pikachu/i);
//     expect(pikachu).toBeInTheDocument();

//     const btnNextPokemon = getByText(/Próximo pokémon/i);
//     fireEvent.click(btnNextPokemon);

//     const charmander = getByText(/Charmander/i);
//     expect(charmander).toBeInTheDocument();

//     fireEvent.click(btnNextPokemon);
//     const caterpie = getByText(/Caterpie/i);
//     expect(caterpie).toBeInTheDocument();
//   });
// });

// test('The filter buttons must be dynamic', () => {
//   const { getByRole, getByTestId } = renderWithRouter(<Pokedex
//     pokemons={ mockedPokemons }
//     isPokemonFavoriteById={ mockedPokemonFavoriteById }
//   />);
//   const filteredAll = getByRole('button', { name: 'All' });
//   expect(filteredAll).toBeInTheDocument();

//   const filteredElectric = getByRole('button', { name: 'Electric' });
//   expect(filteredElectric).toBeInTheDocument();

//   fireEvent.click(filteredElectric);
//   const typeElectricPokemon = getByTestId(/pokemonType/i);
//   expect(typeElectricPokemon).toBeInTheDocument();
//   expect(typeElectricPokemon).toHaveTextContent(/Electric/i);

//   expect(filteredAll).toBeInTheDocument();

//   const filteredFire = getByRole('button', { name: 'Fire' });
//   expect(filteredFire).toBeInTheDocument();

//   fireEvent.click(filteredFire);
//   const typeFirePokemon = getByTestId(/pokemonType/i);
//   expect(typeFirePokemon).toBeInTheDocument();
//   expect(typeFirePokemon).toHaveTextContent(/Fire/i);

//   expect(filteredAll).toBeInTheDocument();
// });

// test('Next button be disabled when filtered list of Pokémon has only one', () => {
//   const { getByText } = renderWithRouter(<Pokedex
//     pokemons={ mockedOnlyPokemon }
//     isPokemonFavoriteById={ mockedPokemonFavoriteById }
//   />);
//   const btn = getByText(/Próximo pokémon/i);

//   expect(btn).toBeInTheDocument();
//   expect(btn).toHaveAttribute('disabled');
// });

// test('tests the index', () => {
//   const { } = renderWithRouter()
// })

import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
test('se a página possui o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});
test('se ao clicar no botão Próximo Pokemon, o próximo é mostrado na tela', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const btnNext = getByTestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();
  expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  pokemons.forEach((element) => {
    expect(getByText(element.name)).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
  const zero = 0;
  const nine = 9;
  for (let index = zero; index < nine; index += 1) {
    fireEvent.click(btnNext);
  }
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});
test('se a Pokedex tem os botões de filtro', () => {
  const { getAllByText, getAllByTestId } = renderWithRouter(<App />);
  const buttonsType = getAllByTestId('pokemon-type-button');
  const sevenButons = 7;
  expect(buttonsType.length).toBe(sevenButons);
  pokemons.forEach((element) => {
    expect(getAllByText(element.type)[0]).toBeInTheDocument();
  });
});
test('se a página possui o botão All', async () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  const buttonAll = getByText(/All/i);
  expect(buttonAll).toBeInTheDocument();
  fireEvent.click(getByText(/Dragon/i));
  expect(queryByText(/Pikachu/i)).toBeNull();
  fireEvent.click(buttonAll);
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});