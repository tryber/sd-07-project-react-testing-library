import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);
describe('Testando o arquivo `Pokemon.js`', () => {
  it('Verifica se o nome do pokémon é exibido na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon.innerHTML).toBe('Pikachu');
  });

  it('Verifica se o tipo do pokémon é exibido na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const type = getByTestId('pokemonType');
    expect(type.innerHTML).toBe('Electric');
  });

  it('Verifica se o peso do pokémon é exibido na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const averageWeight = getByTestId('pokemon-weight');
    expect(averageWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('Verifica se a imagem do pokémon é exibido na tela', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const averageWeight = getByRole('img');
    const url = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(averageWeight.src).toBe(url);
    const alt = getByAltText('Pikachu sprite');
    expect(alt).toBeInTheDocument();
  });

  it('Verifica se o botão `More details` exibe os detalhes do pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const button = getByText('More details');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos pokémons favoritados', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favorite.checked).toBeTruthy();
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
