import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithrouter from './renderWithrouter';
import App from '../App';
import pokemons from '../data';

describe('6. Testando o arquivo Pokemon.js', () => {
  test(`6.1.1 - Teste se é renderizado um card com as informações
  de determinado pokémon. O nome correto do Pokémon deve ser mostrado na tela`, () => {
    const { getByTestId, container } = renderWithrouter(<App />);
    const card = container.querySelector('.pokemon');
    expect(card).toBeInTheDocument();
    const buttonProximo = getByTestId('next-pokemon');
    const name = getByTestId('pokemon-name');
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(pokemon.name);
      fireEvent.click(buttonProximo);
    });
  });

  test(`6.1.2 - Teste se é renderizado um card com as informações
  de determinado pokémon. O tipo correto do pokémon deve ser mostrado na tela`, () => {
    const { getByTestId } = renderWithrouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    const type = getByTestId('pokemonType');
    pokemons.forEach((pokemon) => {
      expect(type).toHaveTextContent(pokemon.type);
      fireEvent.click(buttonProximo);
    });
  });

  test(`6.1.3 - Teste se é renderizado um card com as informações
  de determinado pokémon. O peso médio do pokémon deve ser exibido com um texto
  no formato Average weight: <value> <measurementUnit>;
  onde <value> e <measurementUnit> são, respectivamente, o peso
  médio do pokémon e sua unidade de medida.`, () => {
    const { getByTestId } = renderWithrouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    const weight = getByTestId('pokemon-weight');
    pokemons.forEach((pokemon) => {
      const { value, measurementUnit } = pokemon.averageWeight;
      expect(weight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      fireEvent.click(buttonProximo);
    });
  });

  test(`6.1.4 - Teste se é renderizado um card com as informações
  de determinado pokémon. A imagem do Pokémon deve ser exibida. Ela deve conter um
  atributo src com a URL da imagem e um atributo alt com o texto
  <name> sprite, onde <name> é o nome do pokémon`, () => {
    const { getByRole, getByTestId } = renderWithrouter(<App />);
    const pokemonImage = getByRole('img');
    const buttonProximo = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const { image, name } = pokemon;
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);
      fireEvent.click(buttonProximo);
    });
  });

  test(`6.2 - Teste se o card do Pokémon indicado na Pokédex contém um link
  de navegação para exibir detalhes deste Pokémon. O link deve possuir
  a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { getByText, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    const buttonProximo = getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      const { id } = pokemon;
      expect(linkDetails).toHaveAttribute('href', `/pokemons/${id}`);
      fireEvent.click(buttonProximo);
    });
  });

  test(`6.3 - Teste se ao clicar no link de navegação do Pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { getByText, history, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    const name = getByTestId('pokemon-name').innerHTML;
    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test(`6.4 - Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { getByText, history, getByTestId } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    const name = getByTestId('pokemon-name').innerHTML;
    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test(`6.5 - Teste se existe um ícone de estrela nos Pokémons favoritados.
  O ícone deve ser uma imagem com o atributo src contendo o caminho
  /star-icon.svg`, () => {
    const { getAllByRole, getByText, getByLabelText } = renderWithrouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    const img = getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
