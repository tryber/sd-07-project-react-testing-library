import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('A página deve mostrar fatos sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const textToCheck = getByText(/see more details/i);
  expect(textToCheck).toBeInTheDocument();
});

test('A página deve ter um h2 com texto "About Pokédex"', () => {
  const { getByText, container } = renderWithRouter(<About />);
  const textInPage = getByText(/about pokédex/i);
  expect(textInPage).toBeInTheDocument();
  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();
});

test('A página deve ter dois parágrafos falando sobre a Pokedéx', () => {
  const { container } = renderWithRouter(<About />);
  const paragraphs = container.querySelectorAll('p');
  const numOfParagraphs = 2;
  expect(paragraphs.length).toBe(numOfParagraphs);
});

test('Verificando se a imagem da pokedex aparece na página', () => {
  const { container } = renderWithRouter(<About />);
  const image = container.querySelector('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
