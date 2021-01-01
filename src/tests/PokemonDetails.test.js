import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste se as informações detalhadas do Pokémon.', () => {
  it('A página deve conter um texto Details', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const info = getByText(/Pikachu Details/i);
    expect(info).toBeInTheDocument();
  });
  it('Não deve existir o link de navegação para os detalhes do Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/More details/i);
    fireEvent.click(link);
    expect(link).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const tagH2 = getByRole('heading', { name: /Summary/i });
    expect(tagH2).toBeInTheDocument();
    expect(tagH2.tagName).toBe('H2');
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const tagP = document.getElementsByTagName('p');
    expect(tagP[3].innerHTML)
      .toBe('This intelligent Pokémon roasts hard berries with electricity '
    + 'to make them tender enough to eat.');
  });
});
describe('teste seção com os mapas contendo as localizações do pokémon', () => {
  it('deverá existir um heading h2 com o texto Game Locations of pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const tagH2 = getByRole('heading', { name: /Game Locations/i });
    expect(tagH2).toBeInTheDocument();
    expect(tagH2.tagName).toBe('H2');
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const tagH2 = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(tagH2.parentNode.tagName).toBe('SECTION');
  });
  it('Testa a localização e uma imagem do mapa em cada localização', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const tagH2 = getByRole('heading', { name: /Game Locations/i });
    const PokeDwell = tagH2.nextElementSibling;
    expect(PokeDwell.className).toBe('pokemon-habitat');
    const field = PokeDwell.childNodes;
    const magicNumber = 2;
    field.forEach((pokemonHabitat) => {
      expect(pokemonHabitat.childNodes.length).toBe(magicNumber);
      const img = pokemonHabitat.childNodes[0];
      const p = pokemonHabitat.childNodes[1];
      expect(img).toBeInTheDocument();
      expect(p).toBeInTheDocument();
    });
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const h2 = getByRole('heading', { name: /Game Locations/i });
    const pokemonHabitat = h2.nextElementSibling;
    const habitats = pokemonHabitat.childNodes;
    habitats.forEach((habitat, index) => {
      const img = habitat.childNodes[0];
      expect(img.src).toBe(pokemons[0].foundAt[index].map);
    });
  });
  it('Imagem da localização deve ter atributo alt com o texto location', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const h2 = getByRole('heading', { name: /Game Locations/i });
    const pokemonHabitat = h2.nextElementSibling;
    const habitats = pokemonHabitat.childNodes;
    habitats.forEach((habitat) => {
      const img = habitat.childNodes[0];
      expect(img.alt).toBe(`${pokemons[0].name} location`);
    });
  });
});

describe('Teste se o usuário pode favoritar um pokémon', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
  });
  it('Cliques alternados no checkbox devem adicionar e remover', () => {
    const { getByAltText, getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const checkbox = getByRole('checkbox');
    if (checkbox.checked) fireEvent.click(checkbox);
    // (checkbox.checked && fireEvent.click(checkbox));
    expect(checkbox.checked).toBeFalsy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const star = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star).toBeInTheDocument();
  });
  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const label = getByLabelText('Pokémon favoritado?');
    expect(label.type).toBe('checkbox');
  });
});
