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

describe('Testing the FavoritePokemons.js file', () => {
  it('Test the message No favorite pokemon found, without favorite pokemon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const notFound = getByText(/No favorite Pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Test whether all favorite Pokémon cards are displayed.', () => {
    const { queryByText, queryByLabelText, getByText } = renderWithRouter(<App />);
    const buttonDetails = queryByText('More details');
    fireEvent.click(buttonDetails);
    const checkbox = queryByLabelText('Pokémon favoritado?');
    fireEvent.click(checkbox);

    const home = queryByText('Home');
    fireEvent.click(home);
    const poison = queryByText('Poison');
    fireEvent.click(poison);
    const pokemonDetails = queryByText('More details');
    fireEvent.click(pokemonDetails);
    const checkedPoison = queryByText('Pokémon favoritado?');
    fireEvent.click(checkedPoison);

    const favorites = queryByText('Favorite Pokémons');
    fireEvent.click(favorites);
    const pikachu = queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const favoriteEkans = getByText('Ekans');
    expect(favoriteEkans).toBeInTheDocument();
  });
  it('Test if no Pokémon card is displayed, if it is not favored.', () => {
    const { getByText } = renderWithRouter(<App />);
    const pikachu = getByText('Pikachu');
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    expect(pikachu).not.toBeInTheDocument();
  });
});
// Link consultado:
// https://app.betrybe.com/course/front-end/react/tests/rtl-react-router
// https://app.betrybe.com/course/front-end/react/tests/rtl-queries-events-asyncq
// https://www.youtube.com/watch?v=ZmVBCpefQe8
// https://www.youtube.com/watch?v=sdkgUu5hr6g
// https://www.robinwieruch.de/react-testing-library
