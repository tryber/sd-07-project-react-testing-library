import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('if there is a heading containning About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const headingElement = getByRole('heading');
  expect(headingElement).toHaveTextContent('About Pokédex');
});
test('if there are two paragraphs', () => {
  const { container } = renderWithRouter(<About />);

  const number = 2;
  const paragraphElements = container.querySelectorAll('p');
  expect(paragraphElements.length).toBe(number);
});
test('if there is an specific image', () => {
  const { getByRole } = renderWithRouter(<About />);

  const imageContent = getByRole('img');
  expect(imageContent.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
