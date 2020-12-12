import React from 'react';
import { fireEvent, getByTitle, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import favoritePokemons from '../mocks/pokeMocks';
import renderWithRouter from '../services/renderWithRouter';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';

describe('testing About.js', () => {

    test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={ history }>
                <App />
            </Router>,
        );
        fireEvent.click(getByText(/Favorite Pokémons/i));
        const noFavoriteYet = getByText(/No favorite pokemon found/i);
        expect(noFavoriteYet).toBeInTheDocument();
    });

    test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
        renderWithRouter(
            <FavoritePokemons history={ history } pokemons={ favoritePokemons } />,
          );
          favoritePokemons.forEach((favorite) => {
            expect(screen.getByText(favorite.name)).toBeInTheDocument();
          });
        });
  });
