import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('deve conter um texto <name> Details', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const pika = screen.getByText('Pikachu Details');
  expect(pika).toBeInTheDocument();
});

test('Não deve existir o link de navegação', () => {
  renderWithRouter(<App />);
  const click = screen.getByText('More details');
  fireEvent.click(click);
  expect(click).not.toBeInTheDocument();
});

test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const h2 = screen.getByRole('heading', { name: 'Summary' });
  expect(h2.tagName).toBe('H2');
});

test('deve conter um parágrafo com o resumo do Pokémon', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const p = document.getElementsByTagName('p');
  const contain = 'This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.';
  expect(p[3].innerHTML).toBe(contain);
});

test('deverá existir um heading h2 com o texto Game Locations ', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const h2 = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
  expect(h2.tagName).toBe('H2');
});

test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const h2 = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
  expect(h2).toBeInTheDocument();
});

test('se é exibidos, o nome da localização e uma imagem do mapa', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const alt = screen.getAllByAltText('Pikachu location');
  const kantoF = screen.getByText('Kanto Viridian Forest');
  const kantoP = screen.getByText('Kanto Power Plant');
  expect(alt[0]).toBeInTheDocument();
  expect(alt[1]).toBeInTheDocument();
  expect(kantoF.innerHTML).toBe('Kanto Viridian Forest');
  expect(kantoP.innerHTML).toBe('Kanto Power Plant');
});

test('A imagem da localização deve ter um atributo src com a URL da localização', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const alt = screen.getAllByAltText('Pikachu location');
  expect(alt[0].src).toBe(pokemons[0].foundAt[0].map);
  expect(alt[1].src).toBe(pokemons[0].foundAt[1].map);
});

test('A imagem deve ter um atributo alt com o texto <name> location', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const alt = screen.getAllByAltText('Pikachu location');
  expect(alt[0]).toBeInTheDocument();
  expect(alt[1]).toBeInTheDocument();
});

test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox.type).toBe('checkbox');
});

test('Cliques alternados no checkbox devem adicionar e remover', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const checkbox = screen.getByRole('checkbox');
  if (checkbox.checked) fireEvent.click(checkbox);
  expect(checkbox.checked).toBeFalsy();
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBeTruthy();
  const starOn = screen.getByAltText('Pikachu is marked as favorite');
  expect(starOn).toBeInTheDocument();
});

test('O label do checkbox deve conter o texto Pokémon favoritado', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByText('More details'));
  const label = screen.getByLabelText('Pokémon favoritado?');
  expect(label.type).toBe('checkbox');
});
