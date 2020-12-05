const mockFavoritePokemons = {
  pokemons: [
    {
      id: 143,
      name: 'Snorlax',
      type: 'Normal',
      averageWeight: {
        value: '460.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Kanto Vermillion City',
          map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
        },
      ],
      summary: `What sounds like its cry may actually be its snores
       or the rumblings of its hungry belly.`,
    },
    {
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
      summary: `They say that if it emits an aura from its whole body, 
      the weather will begin to change instantly.`,
    },
  ],
};

export default mockFavoritePokemons;
