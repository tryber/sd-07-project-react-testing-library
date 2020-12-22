// import React from 'react';
// import { Router } from 'react-router-dom';
// import { render, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import App from '../App';

// describe('sétimo requisito', () => {
//   test('se as informações detalhadas são mostradas na tela', () => {
//     const history = createMemoryHistory();
//     const { getByText, getAllByRole } = render(
//       <Router history={ history }>
//         <App />
//       </Router>,
//     );

//     // const moreDetails = getByText('More Details');
//     const pikachuPage = '/pokemons/25';
//     history.push(pikachuPage);
//     const pikachuDetails = getByText('Pikachu Details');
//     expect(pikachuDetails).toBeInTheDocument();
//     // expect(moreDetails).not.toBeInTheDocument();
//     const h2Tag = getAllByRole('heading', { level: 2 });
//     const h2Text = getByText('Summary');
//     expect(h2Tag[0]).toBeInTheDocument();
//     expect(h2Text).toBeInTheDocument();
//     const p1Part1 = 'This intelligent Pokémon roasts hard berries with electricity';
//     const p1Part2 = 'to make them tender enough to eat.';
//     const paragraph = getByText(`${p1Part1} ${p1Part2}`);
//     expect(paragraph.tagName).toBe('P');
//   });

//   test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
//     const history = createMemoryHistory();
//     const { getByText, getAllByRole, getAllByAltText } = render(
//       <Router history={ history }>
//         <App />
//       </Router>,
//     );

//     const pikachuPage = '/pokemons/25';
//     history.push(pikachuPage);
//     const gameLocations = getByText('Game Locations of Pikachu');
//     expect(gameLocations).toBeInTheDocument();
//     expect(gameLocations.tagName).toBe('H2');
//     const localization1 = getByText('Kanto Viridian Forest');
//     const localization2 = getByText('Kanto Power Plant');
//     expect(localization1).toBeInTheDocument();
//     expect(localization2).toBeInTheDocument();
//     const images = getAllByRole('img');
//     expect(images.length).toBe(3);
//     expect(images[1].src).toBe(
//       'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//     );
//     expect(images[2].src).toBe(
//       'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//     );
//     const locationsAlt = getAllByAltText('Pikachu location');
//     expect(locationsAlt[0]).toBeInTheDocument();
//     expect(locationsAlt[1]).toBeInTheDocument();
//   });

//   test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
//     const history = createMemoryHistory();
//     const { getByText, getAllByRole, getAllByAltText } = render(
//       <Router history={ history }>
//         <App />
//       </Router>,
//     );

//     const pikachuPage = '/pokemons/25';
//     history.push(pikachuPage);
//     // const gameLocations = getByText('Game Locations of Pikachu');
//     // expect(gameLocations).toBeInTheDocument();
//     // expect(gameLocations.tagName).toBe('H2');
//     // const localization1 = getByText('Kanto Viridian Forest');
//     // const localization2 = getByText('Kanto Power Plant');
//     // expect(localization1).toBeInTheDocument();
//     // expect(localization2).toBeInTheDocument();
//     // const images = getAllByRole('img');
//     // expect(images.length).toBe(3);
//     // expect(images[1].src).toBe(
//     //   'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//     // );
//     // expect(images[2].src).toBe(
//     //   'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//     // );
//     // const locationsAlt = getAllByAltText('Pikachu location');
//     // expect(locationsAlt[0]).toBeInTheDocument();
//     // expect(locationsAlt[1]).toBeInTheDocument();
//   });
// })
