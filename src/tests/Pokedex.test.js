import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokemons = [{
  id: 23,
  name: 'Ekans',
  type: 'Poison',
  averageWeight: {
    value: '6.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Goldenrod Game Corner',
      map: 'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
    },
  ],
  summary: `It can freely detach its jaw to swallow large 
  prey whole. It can become too heavy to move, however.`,
},
{
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: `Closing both its eyes heightens all its 
  other senses. This enables it to use its abilities to their extremes.`,
}];

const isPokemonFavoriteById = {
  23: true,
  65: false,
};

describe('testes do arquivo Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const [h2] = container.getElementsByTagName('h2');
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  test(`Teste se é exibido o próximo Pokémon da lista 
quando o botão Próximo pokémon é clicado.`,
  () => {
    const { container } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const [button] = container.getElementsByClassName('pokedex-button');
    expect(button).toHaveTextContent('Próximo pokémon');
  });

  test('Os próximos Pokémons devem ser mostrados, ao clicar sucessivamente no botão',
    () => {
      const { container, getByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const [button] = container.getElementsByClassName('pokedex-button');
      fireEvent.click(button);
      const pokemon = getByText(/Alakazam/i);
      expect(pokemon).toHaveTextContent('Alakazam');
    });

  test('O primeiro Pokémon deve ser mostrado ao clicar no botão, se estiver no último',
    () => {
      const { container, getByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const [button] = container.getElementsByClassName('pokedex-button');
      fireEvent.click(button);
      fireEvent.click(button);
      const pokemon = getByText(/Ekans/i);
      expect(pokemon).toHaveTextContent('Ekans');
    });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const filterButtons = ['Poison', 'Psychic'];
    filterButtons.forEach((filter) => {
      const button = getByRole('button', { name: filter });
      expect(button).toBeDefined();
      fireEvent.click(button);
      const type = getByTestId('pokemonType');
      expect(type).toHaveTextContent(filter);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { container, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const [buttonAll] = container.getElementsByClassName('button-text filter-button');
    expect(buttonAll).toBeDefined();
    expect(buttonAll).toHaveTextContent(/All/i);
    fireEvent.click(buttonAll);
    const pokemon = getByText(/Ekans/i);
    expect(pokemon).toBeInTheDocument();
  });

  test('Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
    () => {
      const { getByRole, getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const button = getByRole('button', { name: 'Poison' });
      fireEvent.click(button);
      const nextButton = getByTestId('next-pokemon');
      expect(nextButton).toBeDisabled();
    });

  test(`O botão de Próximo pokémon deve ser desabilitado
  quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const types = 2;
    const button = getAllByTestId('pokemon-type-button');
    const all = getByText('All');
    expect(button.length).toBe(types);
    expect(all).toBeInTheDocument();
  });
});
