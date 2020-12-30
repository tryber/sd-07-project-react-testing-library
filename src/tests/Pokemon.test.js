import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste se é renderizado um card com as informações de '
+ 'determinado pokémon.', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const name = screen.getByTestId('pokemon-name');
    expect(name.textContent).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const type = screen.getByTestId('pokemonType');
    expect(type.textContent).toBe('Electric');
  });

  it('O peso médio do pokémon deve ser exibido com um texto '
  + 'no formato Average weight: <value> <measurementUnit>; onde '
  + '<value> e <measurementUnit> são, respectivamente, o peso '
  + 'médio do pokémon e sua unidade de medida', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const weigth = screen.getByTestId('pokemon-weight').innerHTML;
    expect(weigth).toBe('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida. Ela deve conter '
  + 'um atributo src com a URL da imagem e um atributo alt '
  + 'com o texto <name> sprite, onde <name> é o nome do '
  + 'pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const image = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(image.src)
      .toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
});

describe('Teste da URL e do mais detalhes', () => {
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de '
  + 'navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const link = screen.getByText('More details');
    expect(link.tagName).toBe('A');
  });

  it('O link deve possuir a URL /pokemons/<id>, onde <id> é o id '
  + 'do Pokémon exibido;', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const link = screen.getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');
  });
});

describe('Teste do redirecionamento da página', () => {
  it('Teste se ao clicar no link de navegação do Pokémon, é feito '
  + 'o redirecionamento da aplicação para a página de detalhes de '
  + 'Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const subTitle = screen.getByText(/Summary/);
    expect(subTitle).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para '
  + '/pokemons/<id>, onde <id> é o id do Pokémon cujos detalhes '
  + 'se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  it('O ícone deve ser uma imagem com o atributo src contendo o caminho '
  + '/star-icon.svg', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const image = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });

  it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde '
  + '<pokemon> é o nome do Pokémon exibido', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ isPokemonFavoriteById[25] }
      />,
    );
    const image = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
