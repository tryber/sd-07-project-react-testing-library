import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithrouter from './renderWithrouter';
import App from '../App';
import pokemons from '../data';

describe('6. Testinf Pokemon.js file', () => {
  test(`If render a card with the infos.
   The correct Pokémon name must show up.`, () => {
    const { getByTestId, container } = renderWithrouter(<App />);
    const card = container.querySelector('.pokemon');
    expect(card).toBeInTheDocument();
    const buttonProximo = getByTestId('next-pokemon');
    const name = getByTestId('pokemon-name');
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(pokemon.name);
      fireEvent.click(buttonProximo);
    });
  });

  test(`If render a card with the infos.
   The correct type must show up`, () => {
    const { getByTestId } = renderWithrouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    const type = getByTestId('pokemonType');
    pokemons.forEach((pokemon) => {
      expect(type).toHaveTextContent(pokemon.type);
      fireEvent.click(buttonProximo);
    });
  });

  test(`If render a card with the infos.
  The mean weight must show up with a text 
  Average weight: <value> <measurementUnit>;
  where <value> e <measurementUnit> are mean weight
  and length unit`, () => {
    const { getByTestId } = renderWithrouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    const weight = getByTestId('pokemon-weight');
    pokemons.forEach((pokemon) => {
      const { value, measurementUnit } = pokemon.averageWeight;
      expect(weight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      fireEvent.click(buttonProximo);
    });
  });

  test(`If render a card with the infos.
  The correct img must show up.`, () => {
    const { getByRole, getByTestId } = renderWithrouter(<App />);
    const pokemonImage = getByRole('img');
    const buttonProximo = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const { image, name } = pokemon;
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
      fireEvent.click(buttonProximo);
    });
  });

  test(`Test if the pok on pokedex has a link to show more details. 
  Link must have 
  URL /pokemons/<id>,
  where <id> is the id from the Pokémon`, () => {
    const { getByText, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    const buttonProximo = getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);
      fireEvent.click(buttonProximo);
    });
  });

  test('6.3', () => {
    const { getByText, history, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    const name = getByTestId('pokemon-name').innerHTML;
    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('6.4', () => {
    const { getByText, history, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    const name = getByTestId('pokemon-name').innerHTML;
    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('6.5', () => {
    const { getAllByRole, getByText, getByLabelText } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
