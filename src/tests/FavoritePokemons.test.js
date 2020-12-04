import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('testing about component', () => {
  test('if it contains information about `Pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('if it contains information about `Pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  // test('if it contains a heading', () => {
  //   const { container } = renderWithRouter(<About />);

  //   const title = container.querySelectorAll('h2');
  //   expect(title.length).toBe(1);
  // });

  // test('if it contains two paragraphs', () => {
  //   const { container } = renderWithRouter(<About />);

  //   const paragraphs = container.querySelectorAll('p');
  //   const numberOfParagraphs = 2;
  //   expect(paragraphs.length).toBe(numberOfParagraphs);
  // });

  // test('if hs the correct URL', () => {
  //   const { getByRole } = renderWithRouter(<About />);

  //   const image = getByRole('img');
  //   expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  // });
});
