import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

//  Trying a different approach
beforeEach(() => {
  const poke = {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: 'Not that big of a deal.',
  };

  const favorite = true;
  renderWithRouter(
    <Pokemon
      pokemon={ poke }
      isFavorite={ favorite }
    />,
  );
});

afterEach(cleanup);

describe('Requirement 6: Testing Pokemon.js', () => {
  describe('test if a pokemon card is rendered correctly', () => {
    test('if the name is correct', () => {
      const pokeName = screen.getByText('Dragonair');
      expect(pokeName).toBeDefined();
    });

    test('if the type is correct', () => {
      const pokeType = screen.getByText('Dragon');
      expect(pokeType).toBeDefined();
    });

    test('if the weight is correct', () => {
      const weight = screen.getByText(/average weight/i);
      expect(weight).toBeInTheDocument();
      expect(weight).toHaveTextContent(/16.5/i);
      expect(weight).toHaveTextContent(/kg/i);
    });

    test('if the pokemon image is shown', () => {
      const linkToMatch = 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png';
      const img = screen.getAllByRole('img').find((each) => (each.src === linkToMatch));
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt');
      expect(img.alt).toBe('Dragonair sprite');
    });
  });

  test('if the card has a link to show details', () => {
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink.href).toMatch(/pokemons\/148/i);
  });

  test('if the user is redirected after clicking on the link', () => {
    cleanup();
    const poke = {
      id: 148,
      name: 'Dragonair',
      type: 'Dragon',
      averageWeight: {
        value: '16.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 45',
          map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
        },
        {
          location: 'Johto Dragon\'s Den',
          map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
        },
      ],
      summary: 'Not that big of a deal.',
    };

    const favorite = true;
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ poke }
        isFavorite={ favorite }
      />,
    );

    const detailsLink = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');
  });

  describe('if there is a star icon', () => {
    test('if the src of the icon is correct', () => {
      const starSrc = '/star-icon.svg';
      const starIcon = screen.getByAltText(/marked as favorite/i);
      expect(starIcon).toBeDefined();
      expect(starIcon.src).toMatch(starSrc);
      expect(starIcon.alt).toMatch(/dragonair/i);
    });
  });
});
