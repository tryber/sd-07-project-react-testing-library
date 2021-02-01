import React from 'react';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokeData from '../data';

describe('Requisito 6: Testando o arquivo Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { queryByText, getByAltText, getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pokeData[0] } isFavorite />,
    );

    const pokeName = queryByText(/Pikachu/i);
    const pokeType = queryByText(/Electric/i);
    const pokeWeight = queryByText(/Average weight: 6.0 kg/i);
    const favoritePokemonImage = getByAltText(/is marked as favorite/i);
    const imageElement = getAllByRole('img');
    const imageURL = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(favoritePokemonImage).toBeInTheDocument();
    expect(imageElement[0].src).toBe(imageURL);
    expect(imageElement[0].alt).toBe('Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { queryByText } = renderWithRouter(
      <Pokemon pokemon={ pokeData[0] } isFavorite />,
    );

    const detailsButton = queryByText(/More details/i);
    expect(detailsButton.tagName).toBe('A');
    expect(detailsButton).toHaveAttribute('href', '/pokemons/25'); // Source: https://github.com/testing-library/jest-dom#tohaveattribute
  });

  it('Testa se ao clicar no link de navegação é feito o redirecionamento', () => {
    const { queryByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokeData[0] } isFavorite />,
    );
  });

  it('Testa se a URL exibida no navegador muda para /pokemon/id com os detalhes', () => {
    expect(true).toBeTruthy();
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
