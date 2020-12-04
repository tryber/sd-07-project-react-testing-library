import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

it('should contain a h2 heading with the text: About Pokédex ', () => {
  const { getByText } = renderWithRouter(<About />);

  const heading = getByText(/About Pokédex/);
  expect(heading).toBeInTheDocument();
});

it('should contain an image of a pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const srcImgToFind = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = getByRole('img');

  expect(image.src).toBe(srcImgToFind);
});
