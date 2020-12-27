import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

test('shold be the information about pokemons', () => {
  const { getByText } = renderWithRouter(<About />);

  const aboutAll = getByText(/This application simulates a Pokédex/i);
  expect(aboutAll).toBeInTheDocument();
});

test('shold be  a heading', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutAll = getByRole('heading', { level: 2 });
  expect(aboutAll).toHaveTextContent('About Pokédex');
  expect(aboutAll).toBeInTheDocument();
});

test('shold be the a two paragrafs', () => {
  const { container } = renderWithRouter(<About />);
  const paragrafs = container.querySelectorAll('p');
  const number = 2;
  expect(paragrafs.length).toBe(number);
});

test('shold be a image', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
