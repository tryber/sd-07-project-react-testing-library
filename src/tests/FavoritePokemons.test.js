import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import favPoke from '../mocks/pokeMocks';
import renderWithRouter from '../services/renderWithRouter';
import { screen } from '@testing-library/react';
import App from '../App';

describe('testing About.js', () => {

    test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
        renderWithRouter(
            <FavoritePokemons pokemons={ [] } />
        );
        const noFavoriteYet = screen.getByText(/No favorite pokemon found/i);
        expect(noFavoriteYet).toBeInTheDocument();
    });

    test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
        renderWithRouter(
            <FavoritePokemons history={ history } pokemons={ favPoke }/>,
        );
        favPoke.forEach((favorite) => {
            expect(screen.getByText(favorite.name)).toBeInTheDocument();
        });
    });
});
