import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

const data = pokemons;

describe('Testando o arquivo Pokemon.js', () => {
  it('verifica se é renderizado as informações de determinado pokémon.', () => {
    const { getByText, getByTestId, container } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ data[0] } />,
    );
    const { name, type, averageWeight, image } = data[0];
    const pikachu = getByText(name);
    expect(pikachu).toBeInTheDocument();
    expect(pikachu.innerHTML).toBe(name);

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(type);

    const pikachuAverage = getByTestId('pokemon-weight');
    expect(pikachuAverage).toBeInTheDocument();
    expect(pikachuAverage.innerHTML).toBe(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`
    );

    const pikachuImage = container.querySelector('img');
    expect(pikachuImage.alt).toBe('Pikachu sprite');
    expect(pikachuImage.src).toBe(image);
  });

  it('verifica se contém um link de navegação para exibir detalhes.', () => {
    const { getByText } = renderWithRouter(
      <Pokemon isFavorite={ false } pokemon={ data[0] } />,
    );
    const { id } = data[0];
    const link = getByText(/More details/i);
    expect(link).toBeInTheDocument();
    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
  });

  it('deve testar o redirecionamento para a tela de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const summary = getByText(/Summary/i);
    expect(summary).toBeInTheDocument();
  });

  it('verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText, getByText } = renderWithRouter(
      <Pokemon isFavorite={ true } pokemon={ data[0] } />,
    );
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favoriteIcon = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
