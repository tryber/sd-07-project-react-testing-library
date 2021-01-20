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
  it('Should to contain only one pokemon', () => {
    const { container } = RenderWithRouter(<App />);
    const pokemonsCard = container.querySelectorAll('.pokemon');
    expect(pokemonsCard.length).toBe(1);
  });
  it('Should contain filter buttons', () => {
    const { getAllByTestId, getByRole } = RenderWithRouter(<App pokemons={ pokemons } />);
    const filteredPoke = getAllByTestId('pokemon-type-button');
    const magicNumber = 7;
    expect(filteredPoke).toHaveLength(magicNumber);
    expect(filteredPoke[0].innerHTML).toBe(pokemons[0].type);
    expect(filteredPoke[1].innerHTML).toBe(pokemons[1].type);
    const especifcType = getByRole('button', { name: 'Electric' });
    expect(especifcType).toBeInTheDocument();
  });
  it('Should hava a button to clean felters', () => {
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
