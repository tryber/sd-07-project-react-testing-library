import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('7 - Testing the PokemonDetails.js file', () => {
  it('Should to test if detailed about selected Pokémon is shown on the screen.', () => {
    const { queryByText } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const firstPokemonDetails = queryByText(/Pikachu details/i);
    expect(firstPokemonDetails).toBeInTheDocument();
    expect(firstPokemonDetails.innerHTML).toBe('Pikachu Details');
  });
  it('Details section should contain an heading h2 with the text Summary.', () => {
    const { queryByText } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    fireEvent.click(moreDetails);
    const summary = queryByText(/Summary/i);
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');
  });
  it('Details section should contain a paragraph below the summary.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const paragraph = container.querySelectorAll('p')[3];
    const start = 50;
    const end = 95;
    expect(paragraph).toBeInTheDocument();
    const blockParagraph = paragraph.innerHTML.substring(start, end);
    expect(blockParagraph).toBe('electricity to make them tender enough to eat');
  });
  it('Should have a h2: Game Locations of <name>, <name> is Pokémon displayed.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const allTagSubTitle = container.querySelectorAll('h2')[2];
    expect(allTagSubTitle).toBeInTheDocument();
    const contentH2 = allTagSubTitle.innerHTML;
    expect(contentH2).toBe('Game Locations of Pikachu');
  });
  it('Should all Pokémon locations must be shown in the details section;', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const mapsLocation = container.querySelectorAll('img');
    const number = 3;
    expect(mapsLocation.length).toBe(number);
  });
  it('Should location name and a map image must be displayed at each location;', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const imgMaps1 = container.querySelectorAll('img')[1];
    expect(imgMaps1).toBeInTheDocument();
    expect(imgMaps1.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const nameLocation = container.querySelectorAll('em')[0];
    expect(nameLocation).toBeInTheDocument();
    expect(nameLocation.innerHTML).toBe('Kanto Viridian Forest');
    const imgMaps2 = container.querySelectorAll('img')[2];
    expect(imgMaps2).toBeInTheDocument();
    expect(imgMaps2.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const nameLocation1 = container.querySelectorAll('em')[1];
    expect(nameLocation1).toBeInTheDocument();
    expect(nameLocation1.innerHTML).toBe('Kanto Power Plant');
  });
  it('Should location image must have an alt with the text <name> location.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const altText = container.querySelectorAll('img')[1];
    expect(altText).toBeInTheDocument();
    expect(altText.alt).toBe('Pikachu location');
    const altText2 = container.querySelectorAll('img')[2];
    expect(altText2).toBeInTheDocument();
    expect(altText2.alt).toBe('Pikachu location');
  });
  it('Should display a checkbox that allows you to favor the Pokémon.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    fireEvent.click(moreDetails);

    const checkFavorite = container.querySelector('input');
    expect(checkFavorite).toBeInTheDocument();
    expect(checkFavorite.type).toBe('checkbox');
  });
  it('Should alternating clicks add and remove from the list of favorites.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const favoritado = queryByText(/Pokémon favoritado?/i);
    fireEvent.click(favoritado);
    const classIcon = container.querySelector('.favorite-icon');
    expect(classIcon).toBeInTheDocument();
    expect(classIcon.src).toBe('http://localhost/star-icon.svg');

    fireEvent.click(favoritado);
    expect(classIcon).not.toBeInTheDocument();
  });
  it('Should the checkbox label contain the favorite Pokémon text?.', () => {
    const { queryByText, container } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const favoriteLabel = container.querySelector('label');
    expect(favoriteLabel).toBeInTheDocument();
    const start = 0;
    const end = 19;
    const textLabel = favoriteLabel.innerHTML.substring(start, end);
    expect(textLabel).toBe('Pokémon favoritado?');
  });
});
