import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se as informações detalhadas mostram-se corretamente', () => {
  it('Deve conter um texto `<name> Details onde `<name>` é o nome do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const pikachuDetails = getByText(/pikachu details/i);
    expect(pikachuDetails).toBeInTheDocument();
  });

  it('Sumário', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const summary = container.querySelectorAll('h2');
    expect(summary[1].textContent).toBe('Summary');
  });

  it('Sumário deve ter um paragraph falando sobre o pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(getByText(/More details/i));
    expect(
      getByText(
        /This intelligent Pokémon/i,
      ),
    ).toBeInTheDocument();
  });
});

test('Mapa com localização do pokémon.', () => {
  const { getByText } = renderWithRouter(<App />);

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();
});

test('Imagem da localidade do pokemon.', () => {
  const { getByText, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const imgs = container.querySelectorAll('img');
  expect(imgs[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(imgs[2].alt).toBe('Pikachu location');
});

test('"Pokémon Favoritado?" está na página', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
});
