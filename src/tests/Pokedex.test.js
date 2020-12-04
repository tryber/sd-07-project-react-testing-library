import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Find heading h2 with text`Encountered pokémons`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
  expect(heading.innerHTML).toBe('Encountered pokémons');
});

test('Show text next pokemon on button', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const buttonNextPokemon = getByTestId('next-pokemon');
  expect(buttonNextPokemon.innerHTML).toBe('Próximo pokémon');

  fireEvent.click(buttonNextPokemon);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Show next pokemon when click button next pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNextPokemon = getByText(/Próximo pokémon/i);
  fireEvent.click(buttonNextPokemon);

  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Show next pokemon one a one', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const buttonNextPokemon = getByTestId('next-pokemon');

  fireEvent.click(buttonNextPokemon);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const caterpie = getByText(/Caterpie/i);
  expect(caterpie).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const ekans = getByText(/Ekans/i);
  expect(ekans).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const alakazam = getByText(/Alakazam/i);
  expect(alakazam).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const mew = getByText(/Mew/i);
  expect(mew).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const rapidash = getByText(/Rapidash/i);
  expect(rapidash).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const snorlax = getByText(/Snorlax/i);
  expect(snorlax).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const dragonair = getByText(/Dragonair/i);
  expect(dragonair).toBeInTheDocument();

  fireEvent.click(buttonNextPokemon);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Rendering just one pokemon', () => {
  const { container } = renderWithRouter(<App />);
  const numberPokemons = container.querySelectorAll('.pokemon');
  const pokemon = 1;
  expect(numberPokemons.length).toBe(pokemon);
});

test('Pokedex contains filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const typeButtons = getAllByTestId('pokemon-type-button');
  const seven = 7;
  expect(typeButtons.length).toBe(seven);
});

test('Must rendering pokemons same types', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonEletric = getAllByTestId('pokemonType')[0];

  fireEvent.click(buttonEletric);
  const pokemons = getAllByTestId('pokemon-name');
  expect(pokemons.length).toBe(1);
});

test('Text button must match with type name', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const typeButtons = getAllByTestId('pokemon-type-button');

  fireEvent.click(typeButtons[0]);
  let typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[0].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[1]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[1].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[2]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[2].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[3]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[3].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[4]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[4].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[5]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[5].innerHTML).toBe(typePokemon);

  fireEvent.click(typeButtons[6]);
  typePokemon = getByTestId('pokemonType').innerHTML;
  expect(typeButtons[6].innerHTML).toBe(typePokemon);
});

test('Pokedex contains reset button with text `All`', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All').innerHTML;
  expect(buttonAll).toBe('All');
});

test('Pokedex must explorer all pokemons', () => {
  const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
  const buttonEletric = getAllByTestId('pokemon-type-button')[0];
  fireEvent.click(buttonEletric);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  const buttonNext = getByTestId('next-pokemon');
  fireEvent.click(buttonNext);
  expect(pikachu).toBeInTheDocument();

  const buttonAll = getByText(/All/i);
  fireEvent.click(buttonAll);
  fireEvent.click(buttonNext);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Loading page filter All selected', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const buttonNext = getByTestId('next-pokemon');
  fireEvent.click(buttonNext);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();
});

test('Create buttons filter to each type pokemon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const typeButtons = getAllByTestId('pokemon-type-button');
  const seven = 7;
  expect(typeButtons.length).toBe(seven);
  expect(typeButtons[0]).toBeInTheDocument();
  expect(typeButtons[1]).toBeInTheDocument();
  expect(typeButtons[2]).toBeInTheDocument();
  expect(typeButtons[3]).toBeInTheDocument();
  expect(typeButtons[4]).toBeInTheDocument();
  expect(typeButtons[5]).toBeInTheDocument();
  expect(typeButtons[6]).toBeInTheDocument();
});

test('All types pokemons button', () => {
  const { getAllByTestId, getByText, queryAllByText } = renderWithRouter(<App />);
  const typeButtons = getAllByTestId('pokemon-type-button');

  const buttonElectric = queryAllByText(/Electric/i)[1].innerHTML;
  expect(typeButtons[0].innerHTML).toBe(buttonElectric);
  const buttonFire = getByText(/Fire/i).innerHTML;
  expect(typeButtons[1].innerHTML).toBe(buttonFire);
  const buttonBug = getByText(/Bug/i).innerHTML;
  expect(typeButtons[2].innerHTML).toBe(buttonBug);
  const buttonPoison = getByText(/Poison/i).innerHTML;
  expect(typeButtons[3].innerHTML).toBe(buttonPoison);
  const buttonPsychic = getByText(/Psychic/i).innerHTML;
  expect(typeButtons[4].innerHTML).toBe(buttonPsychic);
  const buttonNormal = getByText(/Normal/i).innerHTML;
  expect(typeButtons[5].innerHTML).toBe(buttonNormal);
  const buttonDragon = getByText(/Dragon/i).innerHTML;
  expect(typeButtons[6].innerHTML).toBe(buttonDragon);
});

test('Button next pokemon disable when type has just one pokemon', () => {
  const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
  const buttonEletric = getAllByTestId('pokemon-type-button')[0];
  fireEvent.click(buttonEletric);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  const buttonNext = getByTestId('next-pokemon');
  fireEvent.click(buttonNext);
  expect(pikachu).toBeInTheDocument();
});
