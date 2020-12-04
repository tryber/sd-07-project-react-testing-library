const mockedFavoritesPokemons = {
  pokemons: [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo:
        'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      foundAt: [
        { location: 'Kanto Viridian Forest', map: 'https://c…' },
        { location: 'Kanto Power Plant', map: 'https://cdn.b…' },
      ],
      summary: `This intelligent Pokémon roasts hard berries with electricity to 
      make them tender enough to eat.`,
    },
    {
      id: 151,
      name: 'Mew',
      type: 'Psychic',
      averageWeight: {
        value: '4.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
      foundAt: [{ location: 'Faraway Island', map: 'https://cdn.bulb…' }],
      summary: `Apparently, it appears only to those people who are pure of heart
      and have a strong desire to see it.`,
    },
  ],
};

export default mockedFavoritesPokemons;
