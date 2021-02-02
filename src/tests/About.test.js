import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('if about pokédex text is present on the page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  expect(getByText(/this application simulates/i)).toBeInTheDocument();
  expect(getByText(/One can filter Pokémons/i)).toBeInTheDocument();
});

test('if image is present on the page', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  expect(getByRole('img')).toHaveAttribute(
    'src',
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
  expect(getByRole('img')).toHaveAttribute(
    'class', 'pokedex-image',
  );
});
