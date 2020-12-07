import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando funcionamento do pokemon card.', () => {
  it('', () => {});

  it('Deve mostrar o nome certo do pokemon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(getByText(/More details/i));
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName.textContent).toBe('Pikachu');
  });

  it('O tipo correto do pokemon deve aparecer', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Verificando se apresentaçao de tamanho e peso estão corretas', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Testando propriedades da imagem', () => {
    const { container } = renderWithRouter(<App />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
});

test('Se clicar em mais detalhes, redireciona para /pokemons/idPokemon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  expect(moreDetails).toBeInTheDocument();
  fireEvent.click(moreDetails);
  const pathName = history.location.pathname;
  expect(pathName).toBe('/pokemons/25');
});

test('Se o redirecionamento ocorre', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
  expect(getByText(/More details/i).href).toBe('http://localhost/pokemons/25');
});

describe('Testando efeitos de pokémons favoritados', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const moreDetails = getByText(/more details/i);
  fireEvent.click(moreDetails);
  const favoritePoke = getByText(/pokémon favoritado/i);
  fireEvent.click(favoritePoke);
  const home = getByText(/home/i);
  fireEvent.click(home);
  const images = container.querySelectorAll('img');
  expect(images[1].src).toBe('http://localhost/star-icon.svg');
});
