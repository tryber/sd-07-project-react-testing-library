import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('7 - Testando o arquivo PokemonDetails.js', () => {
  test(`7.1 - Teste se as informações detalhadas do Pokémon selecionado
  são mostradas na tela.
  1 - A página deve conter um texto <name> Details;
  2 - Não deve existir o link de navegação para os detalhes na pagina detalhes;
  3 - A seção de detalhes deve conter um heading h2 com o texto Summary;
  4 - A seção de detalhes deve conter um parágrafo com o resumo do
  Pokémon específico sendo visualizado.`, () => {
    const { getByText, history, getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name').innerHTML;
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const { pathname } = history.location;
    const { id } = pokemons.find((pokemon) => pokemon.name === name);

    expect(pathname).toBe(`/pokemons/${id}`);

    const localPokemon = getByText(`Game Locations of ${name}`);
    console.log(localPokemon.innerHTML);
    expect(localPokemon).toBeInTheDocument();

    expect(getByText(/Summary/i)).toBeInTheDocument();

    const p = getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make/i,
    );
    expect(p).toBeInTheDocument();
  });

  test(`7.2 - Na seção de detalhes deverá existir um heading h2 com o texto Game
  Locations of <name>; onde <name> é o nome do Pokémon exibido.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
  });

  test(`7.5 - Todas as localizações do Pokémon devem ser mostradas na seção
  de detalhes`, () => {
    const { getByText, getByTestId, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const name = getByTestId('pokemon-name').innerHTML;
    const { foundAt } = pokemons.find((pokemon) => pokemon.name === name);
    const divLocatins = container.querySelector('.pokemon-habitat');
    const imgs = container.querySelectorAll('.pokemon-habitat img');
    const namesLocal = container.querySelectorAll('.pokemon-habitat p');

    imgs.forEach((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', foundAt[index].map);
      expect(img).toHaveAttribute('alt', `${name} location`);
    });

    namesLocal.forEach((local) => { expect(local).toBeInTheDocument(); });
    expect(divLocatins).toBeInTheDocument();
  });

  test(`7.11 - A página deve exibir um checkbox
  que permite favoritar o Pokémon`, () => {
    const { getByText, container, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));

    const checkbox = container.querySelector('#favorite');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);

    expect(getByLabelText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});
