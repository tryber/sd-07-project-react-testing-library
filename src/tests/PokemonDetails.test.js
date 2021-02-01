import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokeData from '../data';

describe('Requisito 7: Testando o arquivo PokemonDetails.js', () => {
  it('Testa se as informações detalhadas são mostradas na tela', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);

    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokeData[0].id}`);

    const pokemonDetails = queryByText(`${pokeData[0].name} Details`);
    const textSummary = queryByText(/Summary/i);
    const resume = queryByText(pokeData[0].summary);

    expect(pokemonDetails).toBeInTheDocument();
    expect(textSummary.tagName).toBe('H2');
    expect(resume).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { queryByText, history, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);

    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokeData[0].id}`);

    const headingLocations = queryByText(`Game Locations of ${pokeData[0].name}`);
    expect(headingLocations).toBeInTheDocument();
    expect(headingLocations.tagName).toBe('H2');

    const imageLocations = getAllByAltText(`${pokeData[0].name} location`);

    pokeData[0].foundAt.forEach((location, index) => {
      expect(imageLocations[index].src).toBe(location.map); // source: https://github.com/tryber/sd-07-project-react-testing-library/blob/AndreHorman-React-Testing-Library/src/tests/PokemonDetails.test.js
      // console.log(location);
    });
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { queryByText, history, getByAltText } = renderWithRouter(<App />);
    const moreDetails = queryByText(/More details/i);

    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokeData[0].id}`);

    const favoritePokemon = queryByText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();

    fireEvent.click(favoritePokemon);
    const favoritePokemonImage = getByAltText(/is marked as favorite/i);
    expect(favoritePokemonImage).toBeInTheDocument();

    fireEvent.click(favoritePokemon);
    expect(favoritePokemonImage).not.toBeInTheDocument();

    expect(favoritePokemon.tagName).toBe('LABEL');
  });
});
