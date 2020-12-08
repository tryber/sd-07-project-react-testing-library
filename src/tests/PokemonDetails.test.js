import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testando renderização de informações detalhadas', () => {
  const { getByText } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  expect(details).toBeInTheDocument();
  fireEvent.click(details);
  const detailsPokemon = getByText(/Pikachu Details/i);
  expect(details).not.toBeInTheDocument();
  expect(detailsPokemon.innerHTML).toBe('Pikachu Details');
});

test('Testando tela de sumário e paragrafo de resumo', () => {
  const { queryByText, container, getByText } = renderWithRouter(<App />);
  const details = queryByText(/More details/i);
  fireEvent.click(details);
  const summary = getByText(/Summary/i);
  expect(summary).toBeInTheDocument();
  const h2 = summary.tagName;
  expect(h2).toBe('H2');
  expect(summary.innerHTML).toBe('Summary');
  const paragrafh = container.querySelectorAll('p');
  expect(paragrafh[3]).toBeInTheDocument();
  const strS = 0;
  const strE = 17;
  expect(paragrafh[3].textContent.substring(strS, strE)).toBe('This intelligent ');
});

test('Teste se existe na página com mapas com localizações do pokémon', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  expect(details).toBeInTheDocument();
  fireEvent.click(details);
  const h2Maps = container.querySelectorAll('h2');
  expect(h2Maps[2]).toBeInTheDocument();
  expect(h2Maps[2].innerHTML).toBe('Game Locations of Pikachu');
});

test('Teste primeiro mapa do pokemon', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  expect(details).toBeInTheDocument();
  fireEvent.click(details);
  const paragraphLocations = container.querySelectorAll('p');
  const imgsLocations = document.querySelectorAll('img');
  expect(imgsLocations[1].src).toContain('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgsLocations[1].alt).toBe('Pikachu location');
  expect(imgsLocations[2].src).toContain('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(imgsLocations[2].alt).toBe('Pikachu location');
  expect(paragraphLocations[4]).toBeInTheDocument();
  expect(paragraphLocations[5]).toBeInTheDocument();
});

test('Testando checkbox para favoritar pokemon.', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const details = queryByText(/More details/i);
  fireEvent.click(details);

  const checked = container.querySelector('input');
  expect(checked).toBeInTheDocument();
  expect(checked.type).toBe('checkbox');
});

test('Testando cliques alternados no checkbox', () => {
  const { queryByText, container } = renderWithRouter(<App />);
  const details = queryByText(/More details/i);
  fireEvent.click(details);
  const favorite = queryByText(/Pokémon favoritado?/i);
  fireEvent.click(favorite);
  const icon = container.querySelector('.favorite-icon');
  expect(icon).toBeInTheDocument();
  expect(icon.src).toBe('http://localhost/star-icon.svg');

  fireEvent.click(favorite);
  expect(icon).not.toBeInTheDocument();
});
