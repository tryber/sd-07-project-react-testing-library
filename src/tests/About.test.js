import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('A página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Pokédex')).toBeInTheDocument();
});

test('A página contém um heading h2 com o texto About Pokédex', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getAllByRole('heading');
  expect(heading[1]).toHaveTextContent('About Pokédex');
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const totalParagraps = 2;
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs.length).toBe(totalParagraps);
});

test('A página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const img = getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
