import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import Pokedex from '../components/Pokedex';

import pokemons, { onlyThreePokemons } from './__mocks__/pokemons';
import isPokemonFavoriteById from './__mocks__/isPokemonFavoriteById';
import pokemonsByType from './__mocks__/pokemonsByType';

import renderWithRouter from './renderWithRouter';

describe('5. Testando o arquivo Pokedex.js', () => {
  describe('test 1', () => {
    it(
      'Teste se é exibido o próximo Pokémon da lista quando '
      + 'o botão Próximo pokémon é clicado.', () => {
        renderWithRouter(
          <Pokedex
            isPokemonFavoriteById={ isPokemonFavoriteById }
            pokemons={ pokemons }
          />,
        );

        const pokemon1 = screen.getByText(/pikachu/i);
        expect(pokemon1).toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
        fireEvent.click(nextButton);

        const pokemon2 = screen.getByText(/charmander/i);
        expect(pokemon2).toBeInTheDocument();
      },
    );

    it('O botão deve conter o texto `Próximo pokémon`.', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );
      const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

      expect(nextButton).toHaveTextContent('Próximo pokémon');
    });

    it(
      'Os próximos Pokémons da lista devem ser mostrados, um a um, '
      + 'ao clicar sucessivamente no botão.', () => {
        const { getByRole } = renderWithRouter(
          <Pokedex
            isPokemonFavoriteById={ isPokemonFavoriteById }
            pokemons={ pokemons }
          />,
        );

        const pokemon1 = screen.getByText(/pikachu/i);
        expect(pokemon1).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: /próximo pokémon/i }));

        const pokemon1IsGone = screen.queryByText(/pikachu/i);
        const pokemon2 = screen.getByText(/charmander/i);
        expect(pokemon1IsGone).not.toBeInTheDocument();
        expect(pokemon2).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: /próximo pokémon/i }));

        const pokemon2IsGone = screen.queryByText(/charmander/i);
        const pokemon3 = screen.getByText(/caterpie/i);
        expect(pokemon2IsGone).not.toBeInTheDocument();
        expect(pokemon3).toBeInTheDocument();
      },
    );

    it(
      'O primeiro Pokémon da lista deve ser mostrado ao clicar '
      + 'no botão se estiver no último Pokémon da lista.', () => {
        renderWithRouter(
          <Pokedex
            isPokemonFavoriteById={ isPokemonFavoriteById }
            pokemons={ onlyThreePokemons }
          />,
        );

        const firstPokemon = screen.getByText(/pikachu/i);
        expect(firstPokemon).toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);

        const firstPokemonAgain = screen.getByText(/pikachu/i);
        expect(firstPokemonAgain).toBeInTheDocument();
      },
    );
  });

  describe('test 2', () => {
    it('Teste se é mostrado apenas um Pokémon por vez.', () => {
      const onlyOnePokemonAtATime = 1;
      const { getByRole } = renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const pokemonsFound = screen.queryAllByRole('img', { name: /sprite/i });
      expect(pokemonsFound).toHaveLength(onlyOnePokemonAtATime);

      fireEvent.click(getByRole('button', { name: /próximo pokémon/i }));

      const pokemonsFoundNewSearch = screen.queryAllByRole('img', { name: /sprite/i });
      expect(pokemonsFoundNewSearch).toHaveLength(onlyOnePokemonAtATime);
    });
  });

  describe('3. Teste se a Pokédex tem os botões de filtro', () => {
    it(`Os Pokémons do tipo selecionado através do botão
     de tipo devem estar circulados.`, () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const buttonFire = screen.getByRole('button', { name: /fire/i });
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      fireEvent.click(buttonFire);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();

      fireEvent.click(buttonNext);
      expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

      fireEvent.click(buttonNext);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const buttonFire = screen.getByRole('button', { name: /fire/i });
      const buttonNormal = screen.getByRole('button', { name: /normal/i });

      fireEvent.click(buttonFire);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      expect(buttonFire).toHaveTextContent('Fire');

      fireEvent.click(buttonNormal);
      expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
      expect(buttonNormal).toHaveTextContent('Normal');
    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    it('O texto do botão deve ser `All`', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const buttonAll = screen.getByRole('button', { name: /all/i });

      expect(buttonAll).toHaveTextContent('All');
    });

    it(`A Pokedéx deverá voltar a circular por todos
     os Pokémons quando o botão for clicado`, () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const buttonAll = screen.getByRole('button', { name: /all/i });
      const buttonFire = screen.getByRole('button', { name: /fire/i });
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      fireEvent.click(buttonFire);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();

      fireEvent.click(buttonNext);
      expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

      fireEvent.click(buttonAll);
      fireEvent.click(buttonNext);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      fireEvent.click(buttonNext);
      expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    });

    it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const buttonAll = screen.getByRole('button', { name: /all/i });
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      fireEvent.click(buttonNext);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      fireEvent.click(buttonNext);
      expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

      fireEvent.click(buttonAll);
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      fireEvent.click(buttonNext);
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      fireEvent.click(buttonNext);
      expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    });
  });

  describe(`Teste se é criado, dinamicamente, um botão de 
  filtro para cada tipo de Pokémon`, () => {
    it('Os botões de filtragem devem ser dinâmicos.', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemonsByType }
        />,
      );

      const onlyOneButton = 1;
      const noButton = 0;

      expect(screen.getAllByRole(
        'button', { name: /Electric/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Fire/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Psychic/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Normal/i },
      )).toHaveLength(onlyOneButton);

      expect(screen.queryAllByRole('button', { name: /Dragon/i })).toHaveLength(noButton);
      expect(screen.queryAllByRole('button', { name: /Bug/i })).toHaveLength(noButton);
    });

    it(`Deve existir um botão de filtragem para cada tipo de Pokémon
     disponível nos dados, independente de quais ou quantos sejam, sem
      repetição de tipos. Ou seja, a sua Pokédex deve possuir pokémons
       do tipo Fire, Psychic, Electric e Normal.`, () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const onlyOneButton = 1;

      expect(screen.getAllByRole(
        'button', { name: /Electric/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Fire/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Bug/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Poison/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Psychic/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Normal/i },
      )).toHaveLength(onlyOneButton);
      expect(screen.getAllByRole(
        'button', { name: /Dragon/i },
      )).toHaveLength(onlyOneButton);
    });

    it(`Deve ser mostrado como opção de filtro, um botão para cada
     um dos tipos. Além disso, o botão All precisa estar sempre visível.`, () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      const onlyOneButton = 1;
      const allTypes = 7;

      expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /All/i })).toHaveLength(onlyOneButton);

      expect(screen.getByRole('button', { name: /Electric/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Fire/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Bug/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Poison/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Psychic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Normal/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Dragon/i })).toBeInTheDocument();

      expect(screen.queryAllByTestId('pokemon-type-button')[0]).toBeInTheDocument();
      expect(screen.queryAllByTestId('pokemon-type-button')).toHaveLength(allTypes);
    });
  });

  describe(`O botão de Próximo pokémon deve ser desabilitado quando a
   lista filtrada de Pokémons tiver um só pokémon`, () => {
    it('should', () => {
      renderWithRouter(
        <Pokedex
          isPokemonFavoriteById={ isPokemonFavoriteById }
          pokemons={ pokemons }
        />,
      );

      fireEvent.click(screen.getByRole('button', { name: /electric/i }));
      expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeDisabled();

      fireEvent.click(screen.getByRole('button', { name: /bug/i }));
      expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeDisabled();

      fireEvent.click(screen.getByRole('button', { name: /fire/i }));
      expect(screen.getByRole('button', { name: /próximo pokémon/i })).toBeEnabled();
    });
  });
});
