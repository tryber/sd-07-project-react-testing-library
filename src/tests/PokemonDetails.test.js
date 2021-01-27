import React from 'react';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../renderWithRouter';

describe('Testing PokemonDetails page', () => {
  test('if specific information for the selected Pokémon is shown on the screen.', () => {
    const { getByText, queryByText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        isPokemonFavoriteById={ { id: { 25: false } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();

    const notBeHeader = queryByText('More Details');
    expect(notBeHeader).not.toBeInTheDocument();

    const summaryHeader = getAllByRole('heading', { level: 2 })[1];
    expect(summaryHeader).toHaveTextContent('Summary');

    const summaryParagraph1 = 'This intelligent Pokémon roasts hard berries with';
    const summaryParagraph2 = ' electricity to make them tender enough to eat.';
    const summaryAll = getByText(summaryParagraph1 + summaryParagraph2);
    expect(summaryAll).toBeInTheDocument();
  });

  test('if is a sect on the page with maps containing the locations', () => {
    const { getAllByRole, getAllByAltText } = renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
      isPokemonFavoriteById={ { 25: false } }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[2]).toHaveTextContent('Game Locations of Pikachu');

    const firstPikachuLocation = getAllByAltText('Pikachu location')[0];
    const secondPikahcuLocation = getAllByAltText('Pikachu location')[1];

    expect(firstPikachuLocation.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(secondPikahcuLocation.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('if the user can favor a Pokémon through the details page.', () => {
    const { queryByLabelText, getByRole } = renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
      isPokemonFavoriteById={ { 25: false } }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const checkboxLabel = queryByLabelText('Pokémon favoritado?');
    expect(checkboxLabel).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox.checked).toBe(false);
  });
});
