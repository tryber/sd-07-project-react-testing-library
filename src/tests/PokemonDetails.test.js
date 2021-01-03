test('', () => {});
// import React from 'react';
// import { cleanup, fireEvent, getByRole, queryByAltText } from '@testing-library/react';
// import App from '../App';
// import TestingRouter from '../components/TestingRouter';
// import pokemons from '../data';
// import PokemonDetails from '../components/PokemonDetails';

// afterEach(cleanup);

// describe('seventh requirement', () => {
//   it('should render detail informations of a given Pokémon', () => {
//     // referência: Alexandre Faustino
//     const { getByText, queryByRole } = TestingRouter(<PokemonDetails
//       isPokemonFavoriteById={ { 25: true } }
//       match={ { params: { id: '25' } } }
//       pokemons={ pokemons }
//       onUpdateFavoritePokemons={ () => {} }
//     />);
//     const pokemonName = getByText(/pikachu details/i);
//     const detailsBtn = queryByRole('url');
//     const heading = getByText('Summary');
//     const summary = getByText(
//       'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.'
//     );

//     expect(pokemonName).toBeInTheDocument();
//     expect(detailsBtn).not.toBeInTheDocument();
//     expect(heading.tagName).toBe('H2');
//     expect(summary).toBeInTheDocument();
//   });

//   it('should render a map section of a given Pokémon', () => {
//     const { getByText, getByRole, queryAllByAltText } = TestingRouter(<PokemonDetails
//       isPokemonFavoriteById={ { 25: true } }
//       match={ { params: { id: '25' } } }
//       pokemons={ pokemons }
//       onUpdateFavoritePokemons={ () => {} }
//     />);
//     const pokemonLocation = getByText(/game locations of Pikachu/i);
//     const imagesMaps = queryAllByAltText(/Pikachu location/i);
//     const detailSec = getByRole('pokemon-details');

//     expect(pokemonLocation).toBeInTheDocument();
//     expect(pokemonLocation.tagName).toBe('H2');
//     console.log(detailSec);
//   })
// });
