import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('A página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('Exibir o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextPokémonButton = getByRole('button', { name: /Próximo pokémon/i });
  expect(nextPokémonButton).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Caterpie')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Ekans')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Mew')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Rapidash')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Snorlax')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Dragonair')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('É mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByTestId(/pokemon-name/).length).toBe(1);
});

test('A Pokédex tem os botões de filtro', () => {
  const { getByTestId, getAllByTestId, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonType = getByTestId('pokemonType');
  const pokemonTypeButton = getAllByTestId('pokemon-type-button');
  const nextPokémonButton = getByRole('button', { name: /Próximo pokémon/i });
  pokemonTypeButton.forEach((type) => {
    fireEvent.click(type);
    expect(pokemonType.textContent).toBe(type.textContent);
    fireEvent.click(nextPokémonButton);
    expect(pokemonType.textContent).toBe(type.textContent);
  });
});

test('A Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const allPokemonsButton = getByRole('button', { name: /All/i });
  const nextPokémonButton = getByRole('button', { name: /Próximo pokémon/i });
  fireEvent.click(allPokemonsButton);
  expect(nextPokémonButton).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Caterpie')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Ekans')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Mew')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Rapidash')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Snorlax')).toBeInTheDocument();
  fireEvent.click(nextPokémonButton);
  expect(getByText('Dragonair')).toBeInTheDocument();
});

test('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByTestId, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonTypeButton = getAllByTestId('pokemon-type-button');
  const allPokemonsButton = getByRole('button', { name: /All/i });
  const numberOfTypeButtons = 7;
  expect(pokemonTypeButton.length).toBe(numberOfTypeButtons);
  expect(allPokemonsButton).toBeInTheDocument();
});

test('Desabilitar o botão de Próximo pokémon quando tiver um só pokémon', () => {
  const { getAllByRole, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokedexButtonPanel = getAllByRole('button');
  const bugTypeButton = pokedexButtonPanel[3];
  const nextPokémonButton = getByRole('button', { name: /Próximo pokémon/i });
  fireEvent.click(bugTypeButton);
  expect(nextPokémonButton).toBeDisabled();
});
