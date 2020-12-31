import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste se as informações detalhadas do Pokémon '
+ 'selecionado são mostradas na tela.', () => {
  test('A página deve conter um texto <name> Details,'
+ ' onde <name> é o nome do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });
  test('Não deve existir o link de navegação para os '
+ 'detalhes do Pokémon selecionado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(/more details/i);
    fireEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
  });
  test('A seção de detalhes deve conter um heading '
+ 'h2 com o texto Summary.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const h2 = getByRole('heading', { name: 'Summary' });
    expect(h2.tagName).toBe('H2');
  });
  test('A seção de detalhes deve conter um parágrafo com'
+ ' o resumo do Pokémon específico sendo visualizado.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const p = document.getElementsByTagName('p');
    expect(p[3].innerHTML).toBe('This intelligent Pokémon roasts '
    + 'hard berries with electricity to make them tender enough to eat.');
  });
});
describe('Teste se existe na página uma seção com os mapas '
+ 'contendo as localizações do pokémon', () => {
  test('Na seção de detalhes deverá existir um heading h2 com o texto Game'
  + ' Locations of <name>; onde <name> é o nome do Pokémon exibido.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const location = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(location.tagName).toBe('H2');
    expect(location.innerHTML).toBe('Game Locations of Pikachu');
  });
  test('Todas as localizações do Pokémon devem ser mostradas na'
  + ' seção de detalhes;', () => {
    const magicNumber = 2;
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const image = getAllByAltText('Pikachu location');
    expect(image.length).toBe(magicNumber);
  });
  test('Devem ser exibidos, o nome da localização e uma imagem do mapa em cada'
  + ' localização;', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    const map = getAllByAltText('Pikachu location');
    expect(map[0].src).toContain('Kanto');
  });
  test('A imagem da localização deve ter um atributo src com a URL'
  + ' da localização', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const map = getAllByAltText('Pikachu location');
    expect(map[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  test('A imagem da localização deve ter um atributo alt com o texto <name>'
  + ' location, onde <name> é o nome do Pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const map = getAllByAltText('Pikachu location');
    expect(map[0].alt).toContain('Pikachu');
  });
});
describe('Teste se o usuário pode favoritar um pokémon através da '
+ 'página de detalhes.', () => {
  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const favoriteCheckBox = getByRole('checkbox');
    expect(favoriteCheckBox.id).toBe('favorite');
    fireEvent.click(favoriteCheckBox);
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
  test('Cliques alternados no checkbox devem adicionar e remover '
  + 'respectivamente o Pokémon da lista de favoritos', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const favoriteCheckBox = getByRole('checkbox');
    const favorite = getByAltText('Pikachu is marked as favorite');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favoriteCheckBox);
    expect(favorite).not.toBeInTheDocument();
  });
  test('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const label = getByText('Pokémon favoritado?');
    expect(label.tagName).toBe('LABEL');
    expect(label.firstChild.nodeValue).toBe('Pokémon favoritado?');
  });
});
