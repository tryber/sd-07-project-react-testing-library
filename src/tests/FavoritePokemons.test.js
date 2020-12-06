import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing file FavoritePokemons.js', () => {
    test('if favorite pokemons render No favorite pokemon found', () => {
        renderWithRouter(<App />);
        fireEvent.click(screen.getByText(/Favorite Pokémons/i));
        expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    })
  });
  