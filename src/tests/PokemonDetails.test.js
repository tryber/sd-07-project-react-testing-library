import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonDetailsButton = getByText(/More details/i);
  fireEvent.click(pokemonDetailsButton);
  const pokemonDetailsName = getByText(/Pikachu Details/i);
  expect(pokemonDetailsName).toBeInTheDocument();
  const pokemonDetailsSummary = getByRole('heading', { name: 'Summary', level: 2 });
  expect(pokemonDetailsSummary).toBeInTheDocument();
  const pokemonDetailsSummaryText = getByText(
    /Pokémon roasts hard berries with electricity/i,
  );
  expect(pokemonDetailsSummaryText).toBeInTheDocument();
});

test('Existe na página uma seção com os mapas contendo as localizações do pokémon',
  () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetailsButton = getByText(/More details/i);
    fireEvent.click(pokemonDetailsButton);
    const pokemonLocations = getByText(/Game Locations of Pikachu/i);
    expect(pokemonLocations).toBeInTheDocument();
    const pokemonFirstLocal = getByText(/Kanto Viridian Forest/i);
    expect(pokemonFirstLocal).toBeInTheDocument();
    const pokemonSecondLocal = getByText(/Kanto Power Plant/i);
    expect(pokemonSecondLocal).toBeInTheDocument();
    const images = getAllByAltText(/Pikachu location/i);
    expect(images[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

test('O usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonDetailsButton = getByText(/More details/i);
  fireEvent.click(pokemonDetailsButton);
  const favoritePokemon = getByText(/Pokémon favoritado?/i);
  expect(favoritePokemon).toBeInTheDocument();
  const favoritePokemonCheckbox = getByRole('checkbox');
  fireEvent.click(favoritePokemonCheckbox);
  expect(favoritePokemonCheckbox.checked).toBeTruthy();
});
