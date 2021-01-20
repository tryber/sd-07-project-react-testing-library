import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test5 - Pokedex.js', () => {
  it('should to contain a h2 with text Encountered pokémons', () => {
    const { container } = RenderWithRouter(<App pokemons={ pokemons } />);
    const tagH2Title = container.querySelector('h2');
    const h2Text = tagH2Title.innerHTML;
    expect(h2Text).toContain('Encountered pokémons');
  });

  it('should have a button next pokemon', () => {
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

  it('should to contain just one pokemon', () => {
    const { container } = RenderWithRouter(<App />);
    const pokemonsCard = container.querySelectorAll('.pokemon');
    expect(pokemonsCard.length).toBe(1);
  });

  it('should have a button to clean filters', () => {
    const { getByRole, getByText, getByTestId } = RenderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    expect(buttonAll).toBeEnabled();
    const nextPokemon = getByTestId('next-pokemon');
    pokemons.forEach(() => fireEvent.click(nextPokemon));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Should disable button next pokemon when there is only one pokemon.', () => {
    const { getByTestId, getByRole } = RenderWithRouter(<App />);
    const disable = getByTestId('next-pokemon');
    const especifcType = getByRole('button', { name: 'Electric' });
    fireEvent.click(especifcType);
    expect(disable).toBeDisabled();
  });
});
