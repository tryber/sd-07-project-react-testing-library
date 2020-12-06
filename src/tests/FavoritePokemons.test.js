import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('testing FavoritePokemons.js Checks if:', () => {

  test("the message 'No favorite pokemon found", () => {
    const { getByText } = render(<FavoritePokemons />);    
    const noFavorite = getByText(/(No favorite) (pokemon found)/i)
    expect(noFavorite).toBeInTheDocument();
  });

  test('all favirited pokémons are rendered. NOT IMPLEMENTED', () => {})

  test("not favorited pokémons aren't rendered. NOT IMPLEMENTED", () => {})

});
