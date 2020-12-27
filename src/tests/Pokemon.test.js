import { fireEvent, getAllByRole } from '@testing-library/react';
import React from 'react';
import App from '../App';
// import Pokemons from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokem = getByTestId('pokemon-name');
  const wheigt = getByTestId('pokemon-weight');
  const pType = getByTestId('pokemonType');
  expect(pokem).toHaveTextContent('Pikachu');
  expect(pType).toHaveTextContent('Electric');
  expect(wheigt).toHaveTextContent('Average weight: 6.0 kg');
});

test('Exibe imagem com atributo src', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);

  const image = getByRole('img');
  const imageAlt = getByAltText('Pikachu sprite');
  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imageAlt).toBeInTheDocument();
});

test(' Teste se o card do Pokémon,contem link de navegação', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/more details/i)).toHaveAttribute('href', '/pokemons/25');
});

test('Ao clicar no link de navegação do Pokémon', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
  const moreDetail = getByText(/more details/i);
  fireEvent.click(moreDetail);
  const check = getByRole('checkbox');
  fireEvent.click(check);
  expect(check.checked).toEqual(true);
  const imageAlts = getByAltText('Pikachu is marked as favorite');
  expect(imageAlts).toBeInTheDocument();
  expect(imageAlts.src).toBe('http://localhost/star-icon.svg');
});
