import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
    expect(screen.getByRole('heading', { name: /encountered pokémons/i }).tagName)
      .toBe('H2');
    expect(screen.getByRole('heading', { name: /encountered pokémons/i }))
      .toBeInTheDocument();
  });
  describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo clicado',
    () => {
      test('O botão deve conter o texto Próximo pokémon;', () => {
        renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
        expect(screen.getByText(/próximo pokémon/i)).toBeInTheDocument();
      });
      test('Os próximos Pokémons da lista devem ser mostrados, ao clicar no botão',
        () => {
          const { getByText } = renderWithRouter(<Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ {} }
          />);
          expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
          fireEvent.click(getByText(/próximo pokémon/i));
          expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
          fireEvent.click(getByText(/próximo pokémon/i));
          expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
          fireEvent.click(getByText(/próximo pokémon/i));
          expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
          fireEvent.click(getByText(/próximo pokémon/i));
          expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
          fireEvent.click(getByText(/próximo pokémon/i));
        });
      test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão',
        () => {
          renderWithRouter(<Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ {} }
          />);
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          fireEvent.click(screen.getByText(/próximo pokémon/i));
          expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
        });
      test('Teste se é mostrado apenas um Pokémon por vez.', () => {
        renderWithRouter(<Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ {} }
        />);
        expect(screen.getAllByTestId(/pokemon-name/i).length).toBe(1);
      });
    });
  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    test('O texto do botão deve corresponder ao nome do tipo',
      () => {
        renderWithRouter(<Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ {} }
        />);
        fireEvent.click(screen.getByText(/fire/i));
        const length = 2;
        expect(screen.getAllByText(/fire/i).length).toBe(length);
      });
    test('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />);
      fireEvent.click(screen.getByText(/fire/i));
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/próximo pokémon/i));
      expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    });
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />);
        expect(screen.getByText(/all/i)).toBeInTheDocument();
    })
    test('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado',
     () => {
     const { getByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ {} }
      />);
       const btnHome = getByText(/all/i);
       fireEvent.click(btnHome);
       expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })
    test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      renderWithRouter(<App />);
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    })
  })
});
