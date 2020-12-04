import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Verifica se a pagina About renderiza as informações da Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const informations = getByText(/About Pokédex/i);
  expect(informations).toBeInTheDocument();
});

test('Verifica se a pagina About renderiza um H2', () => {
  const { container } = renderWithRouter(<About />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('About Pokédex');
});

test('Verifica se a pagina About renderiza dois <p>', () => {
  const { container } = renderWithRouter(<About />);
  const [p] = container.getElementsByTagName('p');
  expect(p).toBeInTheDocument();
});

test('Verifica se a pagina About renderiza uma img', () => {
  const { container } = renderWithRouter(<About />);
  const [img] = container.getElementsByClassName('pokedex-image');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
