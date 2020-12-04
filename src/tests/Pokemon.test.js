import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import { pokemon } from './__mocks__/pokemons';

describe('6. Testando o arquivo Pokemon.js', () => {
  describe(`Teste se é renderizado um card com
   as informações de determinado pokémon.`, () => {
    it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const name = screen.getByTestId('pokemon-name');

      expect(name).toHaveTextContent('Pikachu');
    });

    it(`O peso médio do pokémon deve ser exibido com um texto no formato Average weight:
     <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
     respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const weight = screen.getByTestId('pokemon-weight');

      expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    });

    it('O tipo correto do pokémon deve ser exibido na tela.', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const type = screen.getByTestId('pokemonType');

      expect(type).toHaveTextContent('Electric');
    });

    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com
     a URL da imagem e um atributo alt com o texto <name>
      sprite, onde <name> é o nome do pokémon.`, () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const image = screen.getByRole('img', { name: /sprite/i });

      expect(image).toHaveAttribute('src');
      expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(image.alt).toMatch(/pikachu sprite/i);
    });
  });

  describe(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
   para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde
    <id> é o id do Pokémon exibido`, () => {
    it('should', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const link = screen.getByRole('link', { name: /more details/i });

      expect(link).toBeInTheDocument();
      expect(link.href).toMatch(/pokemons\/25/i);
    });
  });
});

describe(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
 da aplicação para a página de detalhes de Pokémon`, () => {
  it('should', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByRole('link', { name: /more details/i }));

    const { pathname } = history.location;
    expect(pathname).not.toBe('/');
  });
});

describe(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde
 <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
  it('should', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByRole('link', { name: /more details/i }));

    const { pathname } = history.location;
    expect(pathname).toMatch(/pokemons\/25/i);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  it(`O ícone deve ser uma imagem com o atributo src 
  contendo o caminho /star-icon.svg`, () => {
    const isFavorite = true;

    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(image).toBeInTheDocument();
    expect(image.src).toMatch(/star-icon\.svg/i);
  });

  it(`A imagem deve ter o atributo alt igual a <pokemon> is marked as
   favorite, onde <pokemon> é o nome do Pokémon exibido`, () => {
    const isFavorite = true;

    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const image = screen.getByRole('img', { name: /is marked as favorite/i });

    expect(image).toBeInTheDocument();
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
