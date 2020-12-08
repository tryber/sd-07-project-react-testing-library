import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

describe('Testa se é renderizado card com as informações do pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemonType');
    expect(type.innerHTML).toBe('Electric');
  });

  it('O peso deve ser no formato Average weight: value measurementUnit', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const weight = getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('A imagem deve conter src com URL da imagem e alt com o texto name sprite', () => {
    const { getByAltText } = renderWithRouter(<App />);
    const img = getByAltText(`${pokemons[0].name} sprite`);
    expect(img.src).toBe(pokemons[0].image);
  });
});

test('Testa se o card contém link para exibir detalhes com a URL /pokemons/id', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/i);
  expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
});

test('Testa se ao clicar no link de navegação, redireciona para detalhes', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);
  const summary = getByText('Summary');
  expect(summary).toBeInTheDocument();
});

test('Testa se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

describe('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  it('O ícone deve ser imagem com src contendo o caminho /star-icon.svg', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const icon = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(icon.src).toContain('/star-icon.svg');
  });
});
