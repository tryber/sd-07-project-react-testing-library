import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testa PokemonsDetails.js-requisito7', () => {
  it('A página deve conter texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { name, id } = pokemon;
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const modelText = `${name} Details`;
    const pokemonName = getByText(modelText);
    expect(pokemonName.textContent).toBe('Pikachu Details');
  });
  it('Não deve existir link de navegação para detalhes do Pokémon selecionado.', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id } = pokemon;
    const { queryByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const moreDetails = queryByText('More Details');
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id } = pokemon;
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const summaryElement = getByText('Summary');
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.tagName).toBe('H2');
  });

  it('A seção detalhes deve conter um <p> com o resumo do Pokémon visualizado', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id, summary } = pokemon;
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const textElement = getByText(`${summary}`);
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
  });
  it('A seção detalhes dever ter um <h2> com o texto Game Locations of <name>;', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id, name } = pokemon;
    const { getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const modelText = `Game Locations of ${name}`;
    const pokemonLocation = getByText(modelText);
    expect(pokemonLocation.textContent).toBe('Game Locations of Pikachu');
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id, foundAt } = pokemon;
    const { getAllByAltText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const qntOfLocation = foundAt.length;
    const allLocations = getAllByAltText('Pikachu location');
    expect(allLocations.length).toEqual(qntOfLocation);
  });

  it('Devem ser exibidos, nome da localização e imagem em cada localização', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id, foundAt } = pokemon;
    const { getByText, getAllByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const locationName1 = foundAt[0].location;
    const locationName2 = foundAt[1].location;

    const pokemonLocation1 = getByText(locationName1);
    const pokemonLocation2 = getByText(locationName2);

    expect(pokemonLocation1.textContent).toBe('Kanto Viridian Forest');
    expect(pokemonLocation2.textContent).toBe('Kanto Power Plant');

    const locationImageSRCMap1 = foundAt[0].map;
    const locationImageSRCMap2 = foundAt[1].map;

    const allImages = getAllByRole('img');

    const image1 = allImages.some((image) => image.src === locationImageSRCMap1);
    expect(image1).toBe(true);

    const image2 = allImages.some((image) => image.src === locationImageSRCMap2);
    expect(image2).toBe(true);
  });
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const pokemon = pokemons[0];
    const isPokemonFavoriteById = {};
    const { id } = pokemon;
    const { queryByLabelText, getByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ { params: { id } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);

    const labelCheck = queryByLabelText('Pokémon favoritado?');
    expect(labelCheck).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(false);

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toEqual(true);
  });
});
