import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from './fixtures/Pokemons';

describe('Tests the elements of the Pokemon.js component:', () => {
  describe('', () => {
    it('tests if the pokemon`s information is rendered correctly', () => {
      const { getByTestId } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink={ false }
        isFavorite={ false }
      />);

      const pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Charmander');
      const pokemonType = getByTestId(/pokemonType/);
      expect(pokemonType.innerHTML).toBe('Fire');
    });

    it('shows the Average weight with the value and measurement unit', () => {
      const { getByTestId } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink={ false }
        isFavorite={ false }
      />);
      const pokemonWeight = getByTestId(/pokemon-weight/);
      expect(pokemonWeight.innerHTML).toBe('Average weight: 8.5 kg');
    });

    it('shows the pokemon image with the correct URL and Alt text', () => {
      const { container } = renderWithRouter(<Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink={ false }
        isFavorite={ false }
      />);
      const pokemonImage = container.querySelector('img');
      expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
      expect(pokemonImage).toHaveAttribute('alt', 'Charmander sprite');
    });
  });

  it('tests if the Pokémon card contains the correct link to `More Details`', () => {
    const { container } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);
    const detailsLink = container.querySelector('a');
    expect(detailsLink).toHaveAttribute('href', '/pokemons/4');
    expect(detailsLink.innerHTML).toBe('More details');
  });

  it('`More Details`link: tests the redirection and URL of the page', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);
    const detailsLink = getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.getAttribute('href')).toBe('/pokemons/4');

    // teste abaixo feito com a ajuda do código do Rafael Guimarães
    fireEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/4');
  });

  it('Test if there is a star icon on favorite Pokémons', () => {
    const { container } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite
    />);
    const starIcon = container.getElementsByClassName('favorite-icon');
    console.log(starIcon);
    expect(starIcon[0]).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon[0]).toHaveAttribute('alt', 'Charmander is marked as favorite');
  });
});
