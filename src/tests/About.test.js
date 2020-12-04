import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('Testando se a página contém informações sobre a Pokédex.', () => {
  const { queryAllByTestId } = renderWithRouter(<About />);
  const pokeInfos = queryAllByTestId('pokedex-info');

  pokeInfos.forEach((pokeInfo) => expect(pokeInfo).toBeInTheDocument());
});

test('Testando se a página contém um <h2> com a frase "About Pokédex."', () => {
  const { container } = renderWithRouter(<About />);
  const h2 = container.querySelector('h2');

  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('About Pokédex');
});

test('Testando se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { container, getByText } = renderWithRouter(<About />);
  const p1 = container.querySelector('p');
  const p2 = getByText('One can filter Pokémons by type,'
  + ' and see more details for each one of them');

  expect(p1).toBeInTheDocument();
  expect(p1.tagName).toBe('P');

  expect(p2).toBeInTheDocument();
  expect(p2.tagName).toBe('P');
});

test('Testando se a página contém uma imagem especifica.', () => {
  const { container } = renderWithRouter(<About />);
  const image = container.querySelector('img');

  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
