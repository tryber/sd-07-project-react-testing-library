import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Página contém um heading h2 com o texto " About Pokédex"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText('About Pokédex');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
});

test('Página contém um heading h2 com o texto " About Pokédex"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText('About Pokédex');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
});

test('Página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );

  const textP11 = 'This application simulates a Pokédex, a';
  const textP12 = ' digital encliclopedia containing all Pokémons';
  const p1 = getByText(textP11 + textP12);
  const p2 = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(p1.tagName).toBe('P');
  expect(p2.tagName).toBe('P');
});

test('Página contém a seguinte imagem de uma Pokédex', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const altImgText = getByAltText('Pokédex');
  expect(altImgText.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
