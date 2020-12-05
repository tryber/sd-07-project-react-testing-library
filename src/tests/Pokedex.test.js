import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

describe('Testando o arquivo Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const heading = getByRole('heading');
    expect(heading.textContent).toBe('Encountered pokémons');
  });
});

describe(`Teste se é exibido o próximo Pokémon da lista quando o botão
  Próximo pokémon é clicado.`, () => {
  it('O botão deve conter o texto Próximo pokémon;', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const button = getByTestId('next-pokemon');
    expect(button.textContent).toBe('Próximo pokémon');
  });
  it(`Os próximos Pokémons da lista devem ser mostrados, um a um,
      ao clicar sucessivamente no botão;`, () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const nextButton = getByTestId('next-pokemon');
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon.textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Caterpie');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Ekans');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Alakazam');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Mew');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Rapidash');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Snorlax');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Dragonair');
  });

  it(`O primeiro Pokémon da lista deve ser mostrado
      ao clicar no botão, se estiver no último Pokémon da lista;`, () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const nextButton = getByTestId('next-pokemon');
    const pokemon = getByTestId('pokemon-name');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Dragonair');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Pikachu');
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  it('', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it(`A partir da seleção de um botão de tipo, a Pokédex
     deve circular somente pelos pokémons daquele tipo;`, () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const fire = getByText('Fire');
    const nextButton = getByTestId('next-pokemon');
    const pokemon = getByTestId('pokemon-name');
    fireEvent.click(fire);
    expect(pokemon.textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Rapidash');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Charmander');
  });

  it(`O texto do botão deve corresponder ao nome do tipo,
      ex. Psychic;`, () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const psychic = getByText('Psychic');
    const pokemon = getByTestId('pokemonType');
    fireEvent.click(psychic);
    expect(pokemon.textContent).toBe('Psychic');
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All;', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const all = getByText('All');
    expect(all).toBeInTheDocument();
  });

  it(`A Pokedéx deverá mostrar os Pokémons normalmente
      (sem filtros) quando o botão All for clicado;`, () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const all = getByText('All');
    const psychic = getByText('Psychic');
    const pokemon = getByTestId('pokemon-name');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(psychic);
    fireEvent.click(all);
    expect(pokemon.textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Charmander');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const pokemon = getByTestId('pokemon-name');
    const nextButton = getByTestId('next-pokemon');
    expect(pokemon.textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Charmander');
  });
});

describe(`Teste se é criado, dinamicamente, um botão de filtro
  para cada tipo de Pokémon.`, () => {
  it('Os botões de filtragem devem ser dinâmicos;', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const typeButtons = getAllByTestId('pokemon-type-button');
    const pokemonTypes = pokemons.map(({ type }) => type)
      .reduce((acc, type) => {
        if (!acc.includes(type)) {
          return [...acc, type];
        }
        return acc;
      }, []);
    expect(typeButtons.length).toBe(pokemonTypes.length);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon disponível', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const pokemonTypes = pokemons.map(({ type }) => type)
      .reduce((acc, type) => {
        if (!acc.includes(type)) {
          return [...acc, type];
        }
        return acc;
      }, []);
    pokemonTypes.forEach((type) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
  });
});

describe(`O botão de Próximo pokémon deve ser desabilitado quando a lista
  filtrada de Pokémons tiver um só pokémon.`, () => {
  it('', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavorite }
      />,
    );
    const electric = getByRole('button', { name: 'Electric' });
    const pokemon = getByTestId('pokemon-name');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(electric);
    expect(pokemon.textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
