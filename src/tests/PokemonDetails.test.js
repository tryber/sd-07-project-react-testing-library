import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';

import pokemons from './__mocks__/pokemons';
import isPokemonFavoriteById from './__mocks__/isPokemonFavoriteById';
import App from '../App';

const match = {
  isExact: true,
  params: { id: '25' },
  path: 'pokemons/:id',
  url: 'pokemons/25',
};

const onUpdateFavoritePokemons = () => { };

describe('7. Testando o arquivo PokemonDetails.js', () => {
  describe(`Teste se as informações detalhadas do 
  Pokémon selecionado são mostradas na tela.`, () => {
    it(`A página deve conter um texto <name> Details, 
    onde <name> é o nome do Pokémon`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const detailsTitle = screen.getByRole('heading', { name: /Details/i });

      expect(detailsTitle).toBeInTheDocument();
      expect(detailsTitle).toHaveTextContent('Pikachu Details');
    });

    it(
      'Não deve existir o link de navegação para os detalhes do Pokémon selecionado',
      () => {
        renderWithRouter(
          <PokemonDetails
            isPokemonFavoriteById={ isPokemonFavoriteById }
            match={ match }
            onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
            pokemons={ pokemons }
          />,
        );

        const moreDetailsLink = screen.queryByRole('link', { name: /more details/i });

        expect(moreDetailsLink).not.toBeInTheDocument();
      },
    );

    it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const summaryHeadingToExist = screen.getByRole('heading', { name: /summary/i });

      expect(summaryHeadingToExist.innerHTML).toBe('Summary');
      expect(summaryHeadingToExist.innerHTML).not.toBe(' Summary ');
    });

    it(`A  seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico
    sendo visualizado.`, () => {
      const summary = new RegExp(
        'This intelligent Pokémon roasts hard berries with electricity '
        + 'to make them tender enough to eat.', 'i',
      );

      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const paragraphDetails = screen.getByText(summary);

      expect(paragraphDetails).toBeInTheDocument();
    });
  });

  describe(`Teste se existe na página uma seção com os mapas 
  contendo as localizações do pokémon`, () => {
    it(`Deverá conter, na seção de detalhes, um heading h2 com o texto Game 
    Locations of <name>; onde <name> é o nome do Pokémon exibido`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const locationsHeading = screen.getByRole(
        'heading',
        { name: /Game Locations of Pikachu/i },
      );

      expect(locationsHeading).toBeInTheDocument();
    });

    it(`Todas as localizações do Pokémon devem ser mostradas
     na seção de detalhes`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const allLocations = 2;
      const pokemonLocations = screen.getAllByRole('img', { name: /pikachu location/i });

      expect(pokemonLocations).toHaveLength(allLocations);
    });

    it(`Devem ser exibidos, o nome da localização e
     uma imagem do mapa em cada localização`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const locationTitle1 = screen.getByText(/kanto viridian forest/i);
      const locationTitle2 = screen.getByText(/kanto power plant/i);

      const pokemonLocations = screen.getAllByRole('img', { name: /pikachu location/i });

      expect(locationTitle1).toBeInTheDocument();
      expect(locationTitle2).toBeInTheDocument();
      expect(pokemonLocations[0]).toHaveAttribute('src');
      expect(pokemonLocations[1]).toHaveAttribute('src');
    });

    it(`A imagem da localização deve ter um atributo src
     com a URL da localização`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const locationImagePath1 = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const locationImagePath2 = 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

      const pokemonLocations = screen.getAllByRole('img', { name: /pikachu location/i });

      expect(pokemonLocations[0].src).toBe(locationImagePath1);
      expect(pokemonLocations[1].src).toBe(locationImagePath2);
    });

    it(`A imagem da localização deve ter um atributo alt com o
     texto <name> location, onde <name> é o nome do Pokémon`, () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const pokemonLocations = screen.getAllByRole('img', { name: /location/i });

      expect(pokemonLocations[0].alt).toBe('Pikachu location');
      expect(pokemonLocations[1].alt).toBe('Pikachu location');
    });
  });

  describe(`Teste se o usuário pode favoritar um pokémon
   através da página de detalhes`, () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const favoriteCheckbox = screen.getByRole(
        'checkbox', { name: /pokémon favoritado\?/i },
      );

      expect(favoriteCheckbox).toBeInTheDocument();
    });

    it(`Cliques alternados no checkbox devem adicionar e
     remover o Pokémon da lista de favoritos`, () => {
      renderWithRouter(<App />);
      const altText = { name: /pikachu is marked as favorite/i };

      fireEvent.click(screen.getByRole('link', { name: /more details/i }));

      const favoriteIconFirstTime = screen.queryByRole('img', altText);
      expect(favoriteIconFirstTime).not.toBeInTheDocument();

      const favoriteButton = screen.getByRole(
        'checkbox', { name: /pokémon favoritado\?/i },
      );

      fireEvent.click(favoriteButton);

      const favoriteIconFirstSecondTime = screen.getByRole('img', altText);
      expect(favoriteIconFirstSecondTime).toBeInTheDocument();

      fireEvent.click(favoriteButton);

      const favoriteIconFirstThirdTime = screen.queryByRole('img', altText);
      expect(favoriteIconFirstThirdTime).not.toBeInTheDocument();
    });

    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      renderWithRouter(
        <PokemonDetails
          isPokemonFavoriteById={ isPokemonFavoriteById }
          match={ match }
          onUpdateFavoritePokemons={ onUpdateFavoritePokemons }
          pokemons={ pokemons }
        />,
      );

      const favoriteCheckboxText = screen.getByText(/pokémon favoritado?/i);

      expect(favoriteCheckboxText).toHaveTextContent('Pokémon favoritado?');
    });
  });
});
