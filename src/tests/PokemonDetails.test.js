import React from 'react';
import { fireEvent } from '@testing-library/react';
// import renderWithrouter from './renderWithrouter';
import { renderWithRouter } from 'react-router-dom'
import App from '../App';
import pokemons from '../data';

describe('7- Testing PokemonDetails.js', () => {
  test(`Testing the Pokémon info details
  1 - Text <name> Details;
  2 - No nav link;
  3 - Heading h2 with text Summary;
  4 - Parahraph with the sumary of the Pokemon selected `, () => {
    const { getByText, history, getByTestId } = renderWithrouter(<App />);
    const name = getByTestId('pokemon-name').innerHTML;
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);

    expect(pathname).toBe(`/pokemons/${id}`);

    const localPokemon = getByText(`Game Locations of ${name}`);
    console.log(localPokemon.innerHTML);
    expect(localPokemon).toBeInTheDocument();

    expect(getByText(/Summary/i)).toBeInTheDocument();

    const p = getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make/i,
    );
    expect(p).toBeInTheDocument();
  });

  test(`7.2 Details section must have heading h2 text Game
  Locations of <name>; where <name> is the Pokémon name selected.`, () => {
    const { getByText } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
  });

  test(`7.5 All the pok locations must appear in details`, () => {
    const { getByText, getByTestId, container } = renderWithrouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const name = getByTestId('pokemon-name').innerHTML;
    const { foundAt } = pokemons.find((pokemon) => pokemon.name === name);
    const divLocatins = container.querySelector('.pokemon-habitat');
    const imgs = container.querySelectorAll('.pokemon-habitat img');
    const namesLocal = container.querySelectorAll('.pokemon-habitat p');

    imgs.forEach((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', foundAt[index].map);
      expect(img).toHaveAttribute('alt', `${name} location`);
    });

    namesLocal.forEach((local) => { expect(local).toBeInTheDocument(); });
    expect(divLocatins).toBeInTheDocument();
  });

  test(`7.11 Checkbox to mark as favorite`, () => {
    const { getByText, container, getByLabelText } = renderWithrouter(<App />);
    fireEvent.click(getByText(/More details/i));

    const checkbox = container.querySelector('#favorite');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);

    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
