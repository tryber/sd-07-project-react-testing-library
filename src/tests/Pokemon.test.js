import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemons/25');
  });

  it('se ao clicar no link, é feito o redirecionamento para a página de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
  });

  it('se a URL exibida no navegador muda para o id do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    const favoriteButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteButton);
    expect(getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
