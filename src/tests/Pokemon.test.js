import React from 'react;
import { fireEvent } from '@testing-libray/react';
import RenderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

decribe('Test6 - Pokemon.js', () =>{
  it('Should to show all info about pokemon', () => {
    const { getByText, getByRole } = RenderWithRoute(<Pokemon pokemon={ pokemons[0] } />);    
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

  it('should to contain a link with More details', () =>{
    const { getByRole, history } = RenderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const details = getByRole('link', { name: 'More details', src: `/pokemons/${pokemons[0].id}` });
    const pokeImage = getByRole('img', { alt: `${pokemons[0].name} sprite` });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathName } = history.location;
    expetc(pokeImage).toBeInTheDocument();
    expect(pokeImage.alt).toBe(`${pokemons[0].name} sprite`);
    expect(pokeImage.src).toBe(pokemons[0].image);
    expect(pathName).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('should be a star icon on favorited pokemons', () => {
    const { getAllRole } = RenderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const imgSrc = '/star-icon.svg';
    const imgAlt = getAllByRole('img', { src: imgSrc });
    expect(image[1]).toBeInTheDocument();
    expect(image[1].src.endsWith('/star-icon.svg')).toBe(true);
    expect(image[1].alt).toBe(imgAlt);
  });
});
