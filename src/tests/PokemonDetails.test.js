import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('if the pokemon details is displayed', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);

  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();

  const heading = getAllByRole('heading');
  expect(heading[2]).toHaveTextContent('Summary');

  const summaryParagraph = getByText(/This intelligent Pokémon roasts hard berries/);
  expect(summaryParagraph).toBeInTheDocument();
});
test('if exist all locations maps of the pokemon', () => {
  const { getByText, getAllByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);

  const headingLocation = getByText('Game Locations of Pikachu');
  expect(headingLocation).toBeInTheDocument();

  const mapsImages = getAllByAltText('Pikachu location');
  const viridian = getByText('Kanto Viridian Forest');
  const power = getByText('Kanto Power Plant');
  const two = 2;
  expect(mapsImages).toHaveLength(two);

  expect(viridian).toBeInTheDocument();
  expect(mapsImages[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapsImages[0].alt).toBe('Pikachu location');

  expect(power).toBeInTheDocument();
  expect(mapsImages[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(mapsImages[1].alt).toBe('Pikachu location');
});
test('whether the user can bookmark a Pokémon', () => {
  const { getByAltText, getByLabelText, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);

  const isFavorite = getByLabelText('Pokémon favoritado?');
  expect(isFavorite).toBeInTheDocument();

  fireEvent.click(isFavorite);
  const favoriteStar = getByAltText('Pikachu is marked as favorite');
  expect(favoriteStar).toBeInTheDocument();
  fireEvent.click(isFavorite);
  expect(favoriteStar).not.toBeInTheDocument();
});
