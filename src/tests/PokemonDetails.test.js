import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('should have a h2 heading with pokemon name and a Summary', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);

  const { textContent } = getByTestId('pokemon-name');
  fireEvent.click(getByText(/More details/));

  const title = getByRole('heading', { name: `${textContent} Details` });
  const titleSummary = getByRole('heading', { name: 'Summary' });
  const description = titleSummary.nextSibling;

  expect(title.textContent).toBe(`${textContent} Details`);
  expect(title.textContent).not.toBe('');
  expect(title.textContent).not.toBe(' Details');

  expect(titleSummary).toBeInTheDocument();
  expect(titleSummary.textContent).not.toBe('');

  expect(description).toBeInTheDocument();
  expect(description.textContent).not.toBe('');
});

it('should have a heading and description of the location', () => {
  const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);

  const { textContent } = getByTestId('pokemon-name');
  fireEvent.click(getByText(/More details/));

  const location = getByRole('heading', { name: `Game Locations of ${textContent}` });

  expect(location).not.toBe('');
  expect(location).not.toBe('Game Locations of ');
});

it('should have image corresponding of currents pokemon location', () => {
  const { getByText, getByTestId, getAllByRole } = renderWithRouter(<App />);

  const { textContent } = getByTestId('pokemon-name');
  fireEvent.click(getByText(/More details/));

  const imageLocations = getAllByRole('img', { name: `${textContent} location` });

  imageLocations.forEach((location) => {
    expect(location.src).not.toBe('');
    expect(location.alt).not.toBe('');
    expect(location.alt).toBe(`${textContent} location`);
  });
});

it('should have a checkbox for the user be able to Favorite a pokemon', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText(/More details/));

  const favorite = getByRole('checkbox', { name: /Pokémon favoritado?/ });

  expect(favorite).toBeInTheDocument();
});
