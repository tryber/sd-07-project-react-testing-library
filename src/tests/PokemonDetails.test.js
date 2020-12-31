import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../components/renderWithRouter';
// import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Teste se as informações detalhadas do Pokémon selecionado são '
+ 'mostradas na tela', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome '
  + 'do Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const title = screen.getByText(/Pikachu Details/i);
    expect(title).toBeInTheDocument();
  });

  it('Não deve existir o link de navegação para os detalhes do Pokémon '
  + 'selecionado', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(/More details/i);
    fireEvent.click(link);
    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByRole('heading', { name: /Summary/i });
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon '
  + 'específico sendo visualizado', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const p = document.getElementsByTagName('p');
    expect(p[3].innerHTML)
      .toBe('This intelligent Pokémon roasts hard berries with electricity '
      + 'to make them tender enough to eat.');
  });
});

describe('Teste se existe na página uma seção com os mapas contendo as '
+ 'localizações do pokémon', () => {
  it('Na seção de detalhes deverá existir um heading h2 com o texto Game Locations '
  + 'of <name>; onde <name> é o nome do Pokémon exibido', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByRole('heading', { name: /Game Locations/i });
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByText(`Game Locations of ${pokemons[0].name}`);
    expect(h2.parentNode.tagName).toBe('SECTION');
  });

  it('Devem ser exibidos, o nome da localização e uma imagem do mapa em '
  + 'cada localização', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByRole('heading', { name: /Game Locations/i });
    const pokemonHabitat = h2.nextElementSibling;
    expect(pokemonHabitat.className).toBe('pokemon-habitat');
    const habitats = pokemonHabitat.childNodes;
    habitats.forEach((habitat) => {
      expect(habitat.childNodes.length).toBe(2);
      const img = habitat.childNodes[0];
      const p = habitat.childNodes[1];
      expect(img).toBeInTheDocument();
      expect(p).toBeInTheDocument();
    });
  });

  it('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByRole('heading', { name: /Game Locations/i });
    const pokemonHabitat = h2.nextElementSibling;
    const habitats = pokemonHabitat.childNodes;
    habitats.forEach((habitat, index) => {
      const img = habitat.childNodes[0];
      expect(img.src).toBe(pokemons[0].foundAt[index].map);
    });
  });

  it('A imagem da localização deve ter um atributo alt com o texto <name> location, '
  + 'onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const h2 = screen.getByRole('heading', { name: /Game Locations/i });
    const pokemonHabitat = h2.nextElementSibling;
    const habitats = pokemonHabitat.childNodes;
    habitats.forEach((habitat) => {
      const img = habitat.childNodes[0];
      expect(img.alt).toBe(`${pokemons[0].name} location`);
    });
  });
});

describe('Teste se o usuário pode favoritar um pokémon através da '
+ 'página de detalhes.', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
  });

  it('Cliques alternados no checkbox devem adicionar e remover '
  + 'respectivamente o Pokémon da lista de favoritos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkbox = screen.getByRole('checkbox');
    if (checkbox.checked) fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    // const starOff = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    // console.log(starOff)
    // expect(screen.getByAltText(`${pokemons[0].name} is marked as favorite`))
    //   .not.toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const starOn = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(starOn).toBeInTheDocument();
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const labelElement = screen.getByLabelText('Pokémon favoritado?');
    expect(labelElement.type).toBe('checkbox');
  });
});
