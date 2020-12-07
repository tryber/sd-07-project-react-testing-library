import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('pokedex', () => {
  it('test card pikachu', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);
    let index;
    const cliks = 10;
    for (index = 1 - 1; index < cliks; index += 1) {
      let i;
      if (index < cliks - 1) {
        i = index;
      } else {
        i = 1 - 1;
      }
      const { name, type, averageWeight, image } = pokemon[i];
      const { value, measurementUnit } = averageWeight;
      const Pname = getByTestId('pokemon-name');
      const Ptype = getByTestId('pokemonType');
      const Ppeso = getByTestId('pokemon-weight');
      const Pimg = getByAltText(`${name} sprite`);
      expect(Pname.innerHTML).toEqual(name);
      expect(Ptype.innerHTML).toEqual(type);
      expect(Ppeso.innerHTML).toEqual(`Average weight: ${value} ${measurementUnit}`);
      expect(Pimg.src).toEqual(image);
      fireEvent.click(getByTestId('next-pokemon'));
    }
  });

  it('test todos card', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    let index;
    const cliks = 10;
    for (index = 1 - 1; index < cliks; index += 1) {
      let i;
      if (index < cliks - 1) {
        i = index;
      } else {
        i = 1 - 1;
      }
      const { id } = pokemon[i];
      const link = getByText('More details');
      expect(link.href).toEqual(`http://localhost/pokemons/${id}`);
      fireEvent.click(getByTestId('next-pokemon'));
    }
  });

  it('test card pikachu', () => {
    const { getByText } = renderWithRouter(<App />);
    const { name } = pokemon[0];
    fireEvent.click(getByText('More details'));
    const titulo = getByText(`${name} Details`);
    expect(titulo).toBeInTheDocument();
  });

  it('test favoritos pikachu', () => {
    const { getByText, getByAltText, history } = renderWithRouter(<App />);
    const { name } = pokemon[0];
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    history.push('/');
    const etrela = getByAltText(`${name} is marked as favorite`);
    expect(etrela.src).toEqual('http://localhost/star-icon.svg');
  });
});
