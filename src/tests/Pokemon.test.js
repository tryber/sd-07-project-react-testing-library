import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';
import App from '../App';

const maracutaia = true;

describe('Teste se é renderizado um card com as'
+ ' informações de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const name = getByTestId('pokemon-name');
    expect(name.textContent).toBe('Pikachu');
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const type = getByTestId('pokemonType');
    expect(type.textContent).toBe('Electric');
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato Average '
  + 'weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, '
  + 'respectivamente, o peso médio do pokémon e sua unidade de medida.', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const weight = getByTestId('pokemon-weight');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL '
  + 'da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do '
  + 'pokémon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const img = getByAltText('Pikachu sprite');
    expect(img.alt).toBe('Pikachu sprite');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
+ ' para exibir detalhes deste Pokémon.', () => {
  const { getByText } = renderWithRouter(<Pokemon
    pokemon={ data[0] }
    isFavorite={ maracutaia }
  />);
  const link = getByText('More details');
  expect(link.tagName).toBe('A');
});

test('O link deve possuir a URL /pokemons/<id>, onde <id> é o '
+ 'id do Pokémon exibido;', () => {
  const { getByText } = renderWithRouter(<Pokemon
    pokemon={ data[0] }
    isFavorite={ maracutaia }
  />);
  const link = getByText('More details');
  expect(link.href).toBe('http://localhost/pokemons/25');
});

test('Teste se ao clicar no link de navegação do Pokémon, '
+ 'é feito o redirecionamento da aplicação para a página de '
+ 'detalhes de Pokémon.', () => {
  const { getByText } = renderWithRouter(<App />);
  const link = getByText(/More details/i);
  fireEvent.click(link, { button: 0 });
  const title = getByText(/Pikachu Detail/i);
  expect(title.textContent).toBe('Pikachu Details');
});

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, '
+ ' onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/more details/i), { button: 0 });
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('O ícone deve ser uma imagem com o atributo src contendo o caminho '
  + '/star-icon.svg', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
  test('A imagem deve ter o atributo alt igual a <pokemon> is marked as'
  + ' favorite, onde <pokemon> é o nome do Pokémon exibido.', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite={ maracutaia }
    />);
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.alt).toBe('Pikachu is marked as favorite');
  });
});
