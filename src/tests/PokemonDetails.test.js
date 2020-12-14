import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Test screen PokemonDetails', () => {
  it('tests that the Details page is rendered according to the Pokémons home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const moreDet = getByText('More details');
    expect(moreDet).toBeInTheDocument();
    expect(moreDet.href).toContain('pokemons/25');

    fireEvent.click(moreDet);
    expect(history.location.pathname).toBe('/pokemons/25');

    const titleDetPoke = getByText('Pikachu Details');
    const titleSummary = getByText('Summary');
    const summary = getByText('This intelligent Pokémon roasts hard '
    + 'berries with electricity to make them tender enough to eat.');

    expect(titleDetPoke).toBeInTheDocument();
    expect(titleDetPoke.tagName).toBe('H2');
    expect(titleSummary).toBeInTheDocument();
    expect(titleSummary.tagName).toBe('H2');
    expect(moreDet).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('P');
  });
  it('Test if there are maps on the page containing the locations of the pokémon', () => {
    const { getByText, getAllByAltText, history, container } = renderWithRouter(<App />);

    const moreDet = getByText('More details');
    expect(moreDet).toBeInTheDocument();
    expect(moreDet.href).toContain('pokemons/25');

    fireEvent.click(moreDet);
    expect(history.location.pathname).toBe('/pokemons/25');

    const locationsTitle = getByText('Game Locations of Pikachu');
    const location = container.getElementsByClassName('pokemon-habitat');
    const locationPokemonImg = getAllByAltText('Pikachu location');
    //ideia vista no projeto da Vanessa Bidinotto- turma 07
    const amoutOfImg = 2;

    expect(locationsTitle).toBeInTheDocument();
    expect(locationsTitle.tagName).toBe('H2');
    expect(location.length).toBe(1);
    expect(location[0]).toBeInTheDocument();
    expect(locationPokemonImg.length).toBe(amoutOfImg);
    expect(locationPokemonImg[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationPokemonImg[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByLabelText, history } = renderWithRouter(<App />);

    const moreDet = getByText('More details');
    expect(moreDet).toBeInTheDocument();
    expect(moreDet.href).toContain('pokemons/25');

    fireEvent.click(moreDet);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkInput = getByLabelText('Pokémon favoritado?');
    expect(checkInput).toBeInTheDocument();
    expect(checkInput.checked).toBe(false);

    fireEvent.change(checkInput, ({ target: { checked: true } }));
    expect(checkInput.checked).toBe(true);
  });
});
