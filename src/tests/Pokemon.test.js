import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  test('renderiza um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemons/25');
  });

  it('é feito o redirecionamento para a página de detalhes ao clicar no link', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
  });

  it('URL exibida no navegador muda para o id do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    const favoriteBtn = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);
    expect(getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
