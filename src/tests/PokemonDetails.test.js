import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Informations of the pokemon in page details', () => {
  test('if the page contains a text with the name of the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const textDetails = getByText(/Pikachu Details/i);

    expect(textDetails).toBeInTheDocument();
  });

  test('if the page does not have the link button anymore', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);

    let detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    detailsBtn = queryByText(/More Details/i);

    expect(detailsBtn).toBeNull();
  });

  test('if the page has a summary heading', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const summaryText = getByText(/Summary/i);

    expect(summaryText).toBeInTheDocument();
  });

  test('if the page contains a brief description of the pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const descriptionText = getByText(
      /This intelligent Pokémon roasts hard berries [A-Z]+./i,
    );

    expect(descriptionText).toBeInTheDocument();
  });
});

describe('Pages contains the maps and locations of the pokemon', () => {
  test('if there is a heading of the game locations', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const gameLocationsText = getByText(/Game Locations of Pikachu/i);

    expect(gameLocationsText).toBeInTheDocument();
  });

  test('if it shows all map names', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const mapTextOne = getByText(/Kanto Viridian Forest/i);
    const mapTextTwo = getByText(/Kanto Power Plant/i);

    expect(mapTextOne).toBeInTheDocument();
    expect(mapTextTwo).toBeInTheDocument();
  });

  test('if it shows the image of the maps locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    const LENGHT_IMG = 2;
    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const images = getAllByAltText('Pikachu location');

    expect(images.length).toBe(LENGHT_IMG);

    expect(images[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('The user should be able to put on favorite', () => {
  test('if the page has a checkbox', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  test('if the checkbox works', () => {
    const { getByText, getByRole, queryByAltText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const checkbox = getByRole('checkbox');

    let altFavoriteIcon = queryByAltText(/Pikachu is marked as favorite/i);
    expect(altFavoriteIcon).toBeNull();

    fireEvent.click(checkbox);

    altFavoriteIcon = queryByAltText(/Pikachu is marked as favorite/i);
    expect(altFavoriteIcon).not.toBeNull();
  });

  test('if the label is there', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsBtn = getByText(/More Details/i);
    fireEvent.click(detailsBtn);

    const labelText = getByText(/Pokémon favoritado\?/i);
    expect(labelText).toBeInTheDocument();
  });
});
