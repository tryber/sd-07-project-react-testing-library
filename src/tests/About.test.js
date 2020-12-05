import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testing file About.js', () => {
  test('if the page contain informations about a pokedex', () => {
    const { getByText } = render(<About />);
    const pokedexInformations = getByText(
      /digital encliclopedia containing all Pokémons/i
    );
    expect(pokedexInformations).toBeInTheDocument();
  });
});
