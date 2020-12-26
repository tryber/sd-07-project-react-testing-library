import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('if is there a heading containning About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const headingElement = getByRole('heading');
  expect(headingElement).toHaveTextContent('About Pokédex');
});

test('if there two paragraphs', () => {
  const { getByText } = renderWithRouter(<About />);

  const paragraph1 = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
  const paragraph2 = getByText('One can filter Pokémons by type, and see more details for each one of them');
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('if there is an specific image', () => {
  const { getByRole } = renderWithRouter(<About />);

  const imageContent = getByRole('img');
  expect(imageContent.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
