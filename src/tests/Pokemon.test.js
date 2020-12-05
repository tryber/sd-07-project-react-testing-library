import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste se é renderizado um card com as informações de determinado pokémon.
test('if pokemon with correct information is rendered', () => {
  const { getByTestId, container } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  expect(pokemon.innerHTML).toBe('Pikachu');
  const type = getByTestId('pokemonType');
  expect(type.innerHTML).toBe('Electric');
  const weight = getByTestId('pokemon-weight');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  const image = container.getElementsByTagName('img')[0];
  expect(image.alt).toBe('Pikachu sprite');
});
// Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para
// exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id>
// é o id do Pokémon exibido;
test('if pokemon contains correct link', () => {
  const { container } = renderWithRouter(<App />);
  const link = container.getElementsByTagName('a')[3];
  expect(link.href).toBe('http://localhost/pokemons/25');
});
// Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.

// Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;

// Teste se existe um ícone de estrela nos Pokémons favoritados.

//        O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;

//        A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
