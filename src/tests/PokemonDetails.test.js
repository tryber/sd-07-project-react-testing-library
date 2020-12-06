import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.
//     A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
//     Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
//     A seção de detalhes deve conter um heading h2 com o texto Summary.
//     A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.

test('if correct information appears on screen', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const button = getByText(/more details/i);
  fireEvent.click(button);
  const name = getByText(/Pikachu details/i);
  const h2 = container.getElementsByTagName('h2')[1];
  const paragraph = container.getElementsByTagName('p')[3];
  const content = 'This intelligent Pokémon roasts hard berries with electricity';
  expect(name).toBeInTheDocument();
  expect(button).not.toBeInTheDocument();
  expect(h2.innerHTML).toBe('Summary');
  expect(paragraph).toHaveTextContent(content);
});

// Teste se existe na página uma seção com os mapas contendo as localizações do pokémon
// Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>;
// Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
// Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
// A imagem da localização deve ter um atributo src com a URL da localização;
// A imagem da localização deve ter um atributo alt com o texto <name> location,
test('if location section has correct information', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const button = getByText(/more details/i);
  fireEvent.click(button);
  const heading = getByText(/Game Locations of Pikachu/i);
  expect(heading).toBeInTheDocument();
  const img = container.getElementsByTagName('img');
  expect(img[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[1].alt).toBe('Pikachu location');
  expect(img[2].alt).toBe('Pikachu location');
  expect(img[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  const loc1 = getByText(/Kanto Viridian Forest/i);
  expect(loc1).toBeInTheDocument();
  const loc2 = getByText(/Kanto Power Plant/i);
  expect(loc2).toBeInTheDocument();
});

// Teste se o usuário pode favoritar um pokémon através da página de detalhes.
// A página deve exibir um checkbox que permite favoritar o Pokémon;
// Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
// O label do checkbox deve conter o texto Pokémon favoritado?;

test('if Pokemon can be added to favorite', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const button = getByText(/more details/i);
  fireEvent.click(button);
  const checkbox = container.getElementsByTagName('input')[0];
  expect(checkbox.type).toBe('checkbox');
  const label = container.getElementsByTagName('label')[0];
  expect(label).toContainHTML('Pokémon favoritado?');
  fireEvent.click(getByText(/Pokémon favoritado/i));
  const starIcon = container.getElementsByClassName('favorite-icon')[0];
  expect(starIcon).toBeInTheDocument();
  fireEvent.click(getByText(/Pokémon favoritado/i));
  expect(starIcon).not.toBeInTheDocument();
});
