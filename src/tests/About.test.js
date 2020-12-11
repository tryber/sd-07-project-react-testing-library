import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('whether the page contains information about Pokédex', () => {
  const { getByText, getByRole } = render(<About />);

  const heading = getByRole('heading');
  expect(heading).toHaveTextContent('About Pokédex');

  const describe = getByText(/This application simulates a Pokédex/i);
  expect(describe).toBeInTheDocument();

  const details = getByText(/One can filter Pokémons by type/i);
  expect(details).toBeInTheDocument();

  const image = getByRole('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
