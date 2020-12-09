import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import data from '../data';

describe('6. Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const numberCaterpie = 2;
    const CaterpiePokemon = data[numberCaterpie];
    const { name, type, image } = CaterpiePokemon;
    const { value, measurementUnit } = CaterpiePokemon.averageWeight;

    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ CaterpiePokemon } isFavorite={ false } />,
    );

    const nameScreen = getByTestId('pokemon-name');
    const typeScreen = getByTestId('pokemonType');
    const weightScreen = getByTestId('pokemon-weight');
    const img = getByAltText(`${name} sprite`);

    expect(nameScreen.textContent).toBe(name);
    expect(typeScreen.textContent).toBe(type);
    expect(weightScreen.textContent).toBe(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  it('Link de navegação para exibir detalhes deste Pokémon', () => {
    const numberCaterpie = 2;
    const CaterpiePokemon = data[numberCaterpie];
    const { id } = CaterpiePokemon;

    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ CaterpiePokemon } isFavorite={ false } />,
    );

    const link = getByText('More details');

    expect(link).toBeInTheDocument();
    expect(link.href).toContain(`/pokemons/${id}`);

    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste o redirecionamento da aplicação para a página de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);

    const link = getByText(/More details/i);

    fireEvent.click(link);
    const h2 = getByText(/Pikachu Details/i);
    expect(h2).toBeInTheDocument();
  });

  it('A URL exibida no navegador muda para /pokemon/<id>', () => {
    const numberCaterpie = 2;
    const CaterpiePokemon = data[numberCaterpie];
    const { id } = CaterpiePokemon;

    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ CaterpiePokemon } isFavorite={ false } />,
    );

    const link = getByText(/More details/i);

    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const numberCaterpie = 2;
    const CaterpiePokemon = data[numberCaterpie];
    const { name } = CaterpiePokemon;

    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ CaterpiePokemon } isFavorite />,
    );

    const starImg = getByAltText(`${name} is marked as favorite`);
    expect(starImg).toBeInTheDocument();

    expect(starImg.src).toContain('/star-icon.svg');
  });
});
