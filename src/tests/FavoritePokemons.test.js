import React from 'react';
import { fireEvent, getByTitle, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={ history }>
                <App />
            </Router>,
        );
        fireEvent.click(getByText(/Favorite Pokémons/i));
        //clicar no pokemon
        //clicar em favorito
        //checar pokemons favoritos
    });
});
