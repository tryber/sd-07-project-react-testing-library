import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test6 - Pokemon.js', () => {
  it('Should to show all info about pokemon', () => {
    const { getByText, getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );
    const pokemonName = getByText(pokemons[0].name);
    const pokemonType = getByText(pokemons[0].type);
    const pokeWeightValue = pokemons[0].averageWeight.value;
    const pokeWeightMeasure = pokemons[0].averageWeight.measurementUnit;
    const pokeWeight = `Average weight: ${pokeWeightValue} ${pokeWeightMeasure}`;
    const image = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(getByText(pokeWeight)).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('Should to contain a link with \'More details\'', () => {
    const { getByRole, history } = RenderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );
    const details = getByRole('link', {
      name: 'More details',
      src: `/pokemons/${pokemons[0].id}` });
    const pokImage = getByRole('img', { alt: `${pokemons[0].name} sprite` });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pokImage).toBeInTheDocument();
    expect(pokImage.alt).toBe(`${pokemons[0].name} sprite`);
    expect(pokImage.src).toBe(pokemons[0].image);
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('should be a star icon on favorited pokemons', () => {
    const { getAllByRole } = RenderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const imgSrc = '/star-icon.svg';
    const imgAlt = `${pokemons[0].name} is marked as favorite`;
    const image = getAllByRole('img', { src: imgSrc });
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src.endsWith('/star-icon.svg')).toBe(true);
    expect(image[1].alt).toBe(imgAlt);
  });
});
