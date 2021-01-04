import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Tests if detailed info are displayed', () => {
  const selectedPokemonMew = pokemons[5];
  const { getByText } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ { 151: false } }
      match={ { params: { id: '151' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );
  it('contains "Pokémon Details" text', () => {
    const pokemonTitle = getByText(`${selectedPokemonMew.name} Details`);
    const expectedTitle = 'Mew Details';
    expect(pokemonTitle.textContent).toBe(expectedTitle);
  });
  it('should NOT exist a navigation link for details', () => {
    const moreDetailsLink = screen.queryByText(/More details/i);
    expect(moreDetailsLink).not.toBeInTheDocument();
  });
  it('contains a heading with the text "Summary"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const heading = getByText(/Summary/i);
    expect(heading).toBeInTheDocument();
  });
  it('must have a paragraph with the summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const paragraph = getByText(/Apparently, it appears only to those people/i);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Tests if there is a section with maps', () => {
  const selectedCard = pokemons[6];
  it('contains a heading with the text "Game Locations"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    const heading = getByText(/Game Locations of Rapidash/i);
    expect(heading).toBeInTheDocument();
  });
  it('displays all pokémon locations', () => {
    // Fonte: Estudante Ana Karine
    // https://github.com/tryber/sd-07-project-react-testing-library/pull/91/
    const { getAllByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    const image = getAllByRole('img', { name: `${selectedCard.name} location` });
    selectedCard.foundAt.forEach((local, indexLocal) => {
      const imageLocal = image[indexLocal];
      expect(imageLocal).toBeInTheDocument();
      const nameLocal = getByText(local.location);
      expect(nameLocal).toBeInTheDocument();
      const srcImageLocal = local.map;
      expect(imageLocal).toHaveAttribute('src', srcImageLocal);
    });
  });
});

describe('Tests if the user can favorite a pokémon', () => {
  it('have a checkbox to favorite a pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    const checkbox = getByText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
  });
  it('alternates between added and removed from favorites', () => {
    // Fonte: Estudante Ana Karine
    // https://github.com/tryber/sd-07-project-react-testing-library/pull/91/
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/78');
    const checkbox = getByText(/Pokémon favoritado?/i);
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toEqual(true);
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toEqual(false);
  });
});
