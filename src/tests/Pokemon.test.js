import React from 'react';
import RenderWithRouter from './RenderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

describe('Test 6 - Pokemon.js', () => {
  it('', () => {
    const { getByText } = RenderWithRouter(<App pokemons={ pokemons } />);
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
});
});