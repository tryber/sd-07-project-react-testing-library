import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';

const data = pokemons;

describe('Testando o arquivo PokemonDetails.js', () => {
  it('verifica as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [data[0].id]: false } }
        match={ { params: { id: data[0].id.toString() } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ data }
      />,
    );
    const nameDetailsTest = getByText(`${data[0].name} Details`);
    expect(nameDetailsTest).toBeInTheDocument();

    const moreDetailsTest = queryByText(/More Details/i);
    expect(moreDetailsTest).toBe(null);

    const headingText = getByRole('heading', { name: /Summary/i });
    expect(headingText.tagName).toBe('H2');
    expect(headingText.textContent).toBe('Summary');

    const paragrath = queryByText(/This intelligent Pokémon/i);
    expect(paragrath.tagName).toBe('P');
  });

  it('verifica se existe uma seção com mapas contendo as localizações do pokémon', () => {
    const { queryByText, queryAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { [data[0].id]: false } }
        match={ { params: { id: data[0].id.toString() } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ data }
      />,
    );
    const { name, foundAt } = data[0];
    const gameLocations = queryByText(`Game Locations of ${name}`);
    expect(gameLocations.tagName).toBe('H2');

    const mapas = queryAllByAltText(/Pikachu location/i);
    expect(mapas.length).toBe(foundAt.length);
    expect(mapas[0].src).toBe(foundAt[0].map);
    expect(mapas[1].src).toBe(foundAt[1].map);
  });

  it('verifica se o usuário pode favoritar na página de detalhes.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);
    fireEvent.click(detailsLink);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();

    const checkbox = screen.getByLabelText(/Pokémon favoritado/i);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
