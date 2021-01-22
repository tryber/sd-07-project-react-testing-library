import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: `This intelligent Pokémon roasts hard berries 
    with electricity to make them tender enough to eat.`,
  },
];

const render = () => renderWithRouter(
  <PokemonDetails
    pokemons={ pokemon }
    isPokemonFavoriteById={ { 25: false } }
    onUpdateFavoritePokemons={ () => {} }
    match={ { params: { id: '25' } } }
  />,
);

test('Teste se as informações detalhadas do Pokémon selecionado.', () => {
  const { getByText, queryByText } = render();
  const nameDetails = getByText(/Pikachu Details/i);
  const summary = getByText(/Summary/i);
  const detailsParagraph = getByText('This intelligent Pokémon roasts hard berries'
  + ' with electricity to make them tender enough to eat.');

  expect(nameDetails).toBeInTheDocument();
  expect(queryByText(/More details/i)).not.toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(summary.tagName).toBe('H2');
  expect(detailsParagraph).toBeInTheDocument();
  expect(detailsParagraph.tagName).toBe('P');
});

test('Teste a sessão de mapas da página.', () => {
  const { getByText, container, getAllByAltText } = render();
  const headingDetails = getByText(/Game Locations of Pikachu/i);
  const locationDetails = container.querySelector('div.pokemon-habitat');
  const location1 = getByText(/Kanto Viridian Forest/i);
  const location2 = getByText(/Kanto Power Plant/i);
  const locationsImages = getAllByAltText('Pikachu location');

  expect(headingDetails).toBeInTheDocument();
  expect(headingDetails.tagName).toBe('H2');
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
  expect(locationDetails).toBeInTheDocument();
  expect(locationsImages[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationsImages[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Testando a opção de favoritar', () => {
  const { getByLabelText, getByText, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const getFavorite = getByLabelText(/Pokémon favoritado?/i);
  const checkbox = container.querySelector('#favorite');

  expect(getFavorite).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  expect(container.querySelector('.favorite-icon')).not.toBeInTheDocument();
  fireEvent.click(getFavorite);
  expect(container.querySelector('.favorite-icon')).toBeInTheDocument();
  fireEvent.click(getFavorite);
  expect(container.querySelector('.favorite-icon')).not.toBeInTheDocument();
});
