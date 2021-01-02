// import React from 'react';
// import TestingRouter from '../components/TestingRouter';
// import { cleanup, fireEvent, render, screen } from '@testing-library/react';
// import { Pokedex, Pokemon } from '../components';
// import pokemons from '../data';

// afterEach(cleanup);

// describe('fifth requirement', () => {
//   // Inspirado no projeto de Alexandre Faustino
//   const favoritePokemonList = {
//     4: false,
//     10: false,
//     23: true,
//     25: true,
//     65: false,
//     78: false,
//     143: false,
//     148: false,
//     151: true,
//   };
//   it('should render an heading H2 with the text `Encountered pokémons`', () => {
//     const {} = TestingRouter(
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ favoritePokemonList }
//       />
//     );
//     const pokedexText = screen.getByText(/encountered pokémons/i);
//     expect(pokedexText).toBeInTheDocument();
//   });

//   it('should render the next pokémon when press next button', () => {
//     // Inspirado em Alexandre Faustino
//     const mockedPokemons = jest.fn(() => pokemons)
//     const {} = TestingRouter(
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ favoritePokemonList }
//       />
//     );
//     const nextBtn = screen.getByTestId('next-pokemon');
//     expect(nextBtn.innerHTML).toBe('Próximo pokémon');

//     pokemons.forEach((pokemon) => {
//       expect(screen.getByText(pokemon.name)).toBeInTheDocument();
//       fireEvent.click(nextBtn);
//     })
//     expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
//   });

//   it('should render just one Pokémon at time', () => {
//     const {} = TestingRouter(
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ favoritePokemonList }
//       />
//     );
//     const pokemon = screen.getAllByTestId('pokemon-name');
//     expect(pokemon.length).toBe(1);
//   })

//   it('should render filter buttons', () => {
//     const {} = TestingRouter(
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ favoritePokemonList }
//       />
//     );
//     const eletricBtn = (screen.getAllByTestId('pokemon-type-button'))[0];
//     fireEvent.click(eletricBtn);
//     expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
//     expect(screen.getByTestId('pokemonType').textContent).toBe('Electric');
//   })

//   it('should render All button', () => {
//     const {} = TestingRouter(
//       <Pokedex
//         pokemons={ pokemons }
//         isPokemonFavoriteById={ favoritePokemonList }
//       />
//     );
//     const allBtn = screen.getByText(/all/i);
//     expect(allBtn).toBeInTheDocument();
    
//   })
// });
