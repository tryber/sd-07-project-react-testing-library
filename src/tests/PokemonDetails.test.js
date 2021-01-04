import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';
import App from '../App';

afterEach(cleanup);

const pokemon = data[6];
const Render = () => (
  RenderWithRouter(
    <PokemonDetails
      pokemons={ [pokemon] }
      isPokemonFavoriteById={ { 78: false } }
      onUpdateFavoritePokemons={ () => {} }
      match={ { params: { id: '78' } } }
    />,
  )
);

test(
  'whether detailed information about the selected'
  + 'Pokémon is shown on the screen',
  () => {
    const { getByText, container } = Render();
    expect(getByText(/Rapidash Details/i)).toBeInTheDocument();
    expect(container.querySelector('a')).not.toBeInTheDocument();
    expect(getByText(/Summary/i)).toBeInTheDocument();
    expect(getByText(/Summary/i).tagName).toBe('H2');
    expect(
      getByText(
        'At full gallop, its four hooves barely'
        + ' touch the ground because it moves so incredibly fast.',
      ).tagName,
    ).toBe('P');
  },
);

test(
  'if there is a section on the page with maps'
  + ' containing the locations of the pokémon',
  () => {
    const { getByText, queryAllByAltText } = Render();
    expect(getByText(/Game Locations of Rapidash/i)).toBeInTheDocument();
    expect(getByText(/Game Locations of Rapidash/i).tagName).toBe('H2');
    expect(getByText(/Kanto Route 28/i)).toBeInTheDocument();
    expect(getByText(/Johto Mount Silver/i)).toBeInTheDocument();
    expect(queryAllByAltText(/Rapidash Location/i)[0]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    );
    expect(queryAllByAltText(/Rapidash Location/i)[1]).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    );
  },
);

test('if the user can favor a pokémon through the details page', () => {
  const { getByText, getByLabelText, container } = RenderWithRouter(<App />);
  fireEvent.click(getByText(/More Details/i));
  const favorite = getByLabelText('Pokémon favoritado?');
  expect(favorite).toBeInTheDocument();
  fireEvent.click(favorite);
  const icon = container.querySelector('.favorite-icon');
  expect(icon).toBeInTheDocument();
  fireEvent.click(favorite);
  expect(icon).not.toBeInTheDocument();
});
