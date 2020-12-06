import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test 5 - Pokedex.js', () => {
  it('Should to countain a h2 heading with \'Encountered pokémons\'', () => {
    const { container } = RenderWithRouter(<App pokemons={ pokemons } />);
    const tagH2Title = container.querySelector('h2');
    const textH2 = tagH2Title.innerHTML;
    expect(textH2).toContain('Encountered pokémons');
  });
  it('', () => {
    const { getByRole } = RenderWithRouter(<App pokemons={ pokemons } />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    expect(pokemons[0].name).toBe('Pikachu');
    fireEvent.click(button);
    expect(pokemons[1].name).toBe('Charmander');
    fireEvent.click(button);
    expect(pokemons[2].name).toBe('Caterpie');
    fireEvent.click(button);
    expect(pokemons[pokemons.length - 1].name).toBe('Dragonair');
    fireEvent.click(button);
    expect(pokemons[0].name).toBe('Pikachu');
  });
});
