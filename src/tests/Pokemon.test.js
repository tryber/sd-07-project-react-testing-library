import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokeData from '../data';

describe('Requisito 6: Testando o arquivo Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { queryByText, getByAltText, getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pokeData[0] } isFavorite />,
    );

    const pokeName = queryByText(pokeData[0].name);
    const pokeType = queryByText(pokeData[0].type);
    const avW = pokeData[0].averageWeight;
    const pokeWeight = queryByText(`Average weight: ${avW.value} ${avW.measurementUnit}`);
    const favoritePokemonImage = getByAltText(/is marked as favorite/i);
    const imageElement = getAllByRole('img');
    const imageURL = pokeData[0].image;

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(favoritePokemonImage).toBeInTheDocument();
    expect(imageElement[0].src).toBe(imageURL);
    expect(imageElement[0].alt).toBe(`${pokeData[0].name} sprite`);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { queryByText } = renderWithRouter(<App />);

    const detailsButton = queryByText(/More details/i);
    expect(detailsButton.tagName).toBe('A');
    expect(detailsButton).toHaveAttribute('href', `/pokemons/${pokeData[0].id}`); // Source: https://github.com/testing-library/jest-dom#tohaveattribute
  });

  it('Testa se ao clicar no link de navegação é feito o redirecionamento', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    const moreDetails = queryByText(/More details/i);
    fireEvent.click(moreDetails);

    expect(history.location.pathname).toBe(`/pokemons/${pokeData[0].id}`);
    const pokeName = queryByText(`${pokeData[0].name} Details`);
    expect(pokeName.tagName).toBe('H2');
  });

  it('Testa se a URL exibida no navegador muda para /pokemon/id com os detalhes', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const moreDetailsTwo = queryByText(/More details/i);
    fireEvent.click(moreDetailsTwo);

    expect(history.location.pathname).toBe(`/pokemons/${pokeData[0].id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokeData[0] } isFavorite />,
    );
    const imageURL = '/star-icon.svg';
    const favoritePokemonImage = getByAltText(/is marked as favorite/i);

    expect(favoritePokemonImage).toHaveAttribute('src', imageURL);
  });
});
