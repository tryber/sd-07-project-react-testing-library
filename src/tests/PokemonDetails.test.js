import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('sétimo requisito', () => {
  test('se as informações detalhadas são mostradas na tela', () => {
    const history = createMemoryHistory();
    const { getByText, getAllByRole, queryByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(queryByText('More details')).not.toBeInTheDocument();
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const h2Tag = getAllByRole('heading');
    expect(h2Tag[2]).toHaveTextContent('Summary');
    expect(getByText('Summary').tagName).toBe('H2');
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const p1Part1 = 'This intelligent Pokémon roasts hard berries with electricity';
    const p1Part2 = ' to make them tender enough to eat.';
    const paragraph = getByText(p1Part1 + p1Part2);
    expect(paragraph.tagName).toBe('P');
  });

  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const history = createMemoryHistory();
    const { getByText, getAllByRole, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Poison'));
    expect(getByText('Ekans')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/23');
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const gameLocations = getByText('Game Locations of Ekans');
    expect(gameLocations).toBeInTheDocument();
    expect(gameLocations.tagName).toBe('H2');
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    expect(getByText('Goldenrod Game Corner')).toBeInTheDocument();
    // A imagem da localização deve ter um atributo src com a URL da localização;
    const images = getAllByRole('img');
    const DOIS = 2;
    expect(images.length).toBe(DOIS);
    expect(images[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
    );
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    expect(getByAltText('Ekans location')).toBeInTheDocument();
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Normal'));
    expect(getByText('Snorlax')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const labelInput = getByLabelText('Pokémon favoritado?');
    expect(labelInput.type).toBe('checkbox');
    expect(labelInput).toBeInTheDocument();
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(labelInput);
    expect(labelInput).toBeChecked();
    userEvent.click(labelInput);
    expect(labelInput).not.toBeChecked();
    userEvent.click(labelInput);
    expect(labelInput).toBeChecked();
  });
});
