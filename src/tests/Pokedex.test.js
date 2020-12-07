import React from 'react';
import { getByRole, render } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

test('Teste se contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = render(<Pokedex />);
  const h2 = getByRole(/h2/i);
  expect(h2).toBeInTheDocument()
});
