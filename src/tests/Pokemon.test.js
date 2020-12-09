import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

const pokemon = {
  id: 25,
  averageWeight: { value: '6.0', measurementUnit: 'kg' },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  name: 'Pikachu',
  summary:
    'This intelligent Pokémon roasts hard berries with electricity'
    + 'to make them tender enough to eat.',
  type: 'Electric',
};

describe('Teste se é renderizado um card com as informações de'
+ 'determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    await queryByTestId('pokemon-name');
    const pokemonName = queryByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    await queryByTestId('pokemonType');
    const pokemonType = queryByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato Average'
  + 'weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,'
  + 'respectivamente, o peso médio do pokémon e sua unidade de medida', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    await queryByTestId('pokemon-weight');
    const pokemonWeight = queryByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com '
  + 'a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do'
  + 'pokémon;', async () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    await container.getElementsByTagName('img');
    const img = container.getElementsByTagName('img');
    expect(img[0].getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img[0].getAttribute('alt')).toBe('Pikachu sprite');
  });
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
+ 'para exibir detalhes deste Pokémon.'
+ 'O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon'
+ 'exibido;', () => {
  const { container, getByText } = renderWithRouter(
    <Pokemon pokemon={ pokemon } />,
  );
  const link = getByText(/More details/);
  expect(link).toBeInTheDocument();
  const tagA = container.getElementsByTagName('a');
  expect(tagA[0].getAttribute('href')).toBe('/pokemons/25');
});
test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
+ 'da aplicação para a página de detalhes de Pokémon.', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } />
    </Router>,
  );
  fireEvent.click(getByText(/More details/));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
test('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
+ 'onde <id> é o id do Pokémon cujos detalhes se deseja ver;', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={ history }>
      <Pokemon pokemon={ pokemon } />
    </Router>,
  );
  fireEvent.click(getByText(/More details/));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
