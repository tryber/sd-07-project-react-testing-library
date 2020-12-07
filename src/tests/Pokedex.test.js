import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testing the Pokedex.js file', () => {
  it('Shold to test if the page contains the text Encountered Pokémon.', () => {
    const { container } = renderWithRouter(<App />);
    const tagH2 = container.querySelector('h2').innerHTML;
    expect(tagH2).toBe('Encountered pokémons');
  });
  it('Should if the next Pokémon is displayed when the same button is clicked.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const btnNextPokemon = getByTestId('next-pokemon');
    expect(btnNextPokemon.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(btnNextPokemon);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('Should to show only one Pokémon is shown at a time.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const btnNextPokemon = getByTestId('next-pokemon');
    fireEvent.click(btnNextPokemon);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    fireEvent.click(btnNextPokemon);
    const thirthPokemon = getByText(/Caterpie/i);
    expect(thirthPokemon).toBeInTheDocument();
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Should to test if the Pokédex has the filter buttons.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton[0]).toBeInTheDocument();
    fireEvent.click(typeButton[1]);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    fireEvent.click(typeButton[2]);
    const thirdPokemon = getByText(/Caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();
    fireEvent.click(typeButton[3]);
    const fourthPokemon = getByText(/Ekans/i);
    expect(fourthPokemon).toBeInTheDocument();
    fireEvent.click(typeButton[4]);
    const fifthPokemon = getByText(/Alakazam/i);
    expect(fifthPokemon).toBeInTheDocument();
    fireEvent.click(typeButton[5]);
    const sixthPokemon = getByText(/Snorlax/i);
    expect(sixthPokemon).toBeInTheDocument();
    fireEvent.click(typeButton[6]);
    const seventhPokemon = getByText(/Dragonair/i);
    expect(seventhPokemon).toBeInTheDocument();
  });
  it('Should to test if the Pokédex contains a button All to reset the filter', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const filterButton = getByText('All');
    fireEvent.select(filterButton);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
    fireEvent.click(filterButton);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Should to test if buttons are created dynamically for each type of Pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const filterButton = getByText('All');
    fireEvent.select(filterButton);
    const allTypesButtons = getAllByTestId('pokemon-type-button');
    expect(allTypesButtons[0].innerHTML).toBe('Electric');
    fireEvent.click(allTypesButtons[0]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[1].innerHTML).toBe('Fire');
    fireEvent.click(allTypesButtons[1]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[2].innerHTML).toBe('Bug');
    fireEvent.click(allTypesButtons[2]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[3].innerHTML).toBe('Poison');
    fireEvent.click(allTypesButtons[3]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[4].innerHTML).toBe('Psychic');
    fireEvent.click(allTypesButtons[4]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[5].innerHTML).toBe('Normal');
    fireEvent.click(allTypesButtons[5]);
    expect(filterButton).toBeInTheDocument();
    expect(allTypesButtons[6].innerHTML).toBe('Dragon');
    fireEvent.click(allTypesButtons[6]);
    expect(filterButton).toBeInTheDocument();
  });
  it('Should disable Next Pokémon button when has only one Pokémon selected.', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const allTypesButtons = getAllByTestId('pokemon-type-button');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(allTypesButtons[0]);
    expect(nextButton).not.toBe();
  });
});
