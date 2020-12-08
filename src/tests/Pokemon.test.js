import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('6. Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent(/Electric/i);
    expect(name).toHaveTextContent(/Pikachu/i);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
 + 'para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
 + 'onde <id> é o id do Pokémon exibido', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const linkDetails = getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon,'
+ 'é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const linkDetails = getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const starImage = getByAltText(/Pikachu is marked as favorite/i);
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
