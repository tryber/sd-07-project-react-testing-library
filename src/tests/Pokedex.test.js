import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

test('Teste se página contém um heading h2',
  () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
  });

test(
  'Teste se é exibido o próximo Pokémon dalista quando o botão Próximo pokémon é clicado',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const button = getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();

    const primeiroPokemon = getByText('Pikachu');
    expect(primeiroPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const segundoPokemon = getByText('Charmander');
    expect(segundoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const terceiroPokemon = getByText('Caterpie');
    expect(terceiroPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const quartoPokemon = getByText('Ekans');
    expect(quartoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const quintoPokemon = getByText('Alakazam');
    expect(quintoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const sextoPokemon = getByText('Mew');
    expect(sextoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const setimoPokemon = getByText('Rapidash');
    expect(setimoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const oitavoPokemon = getByText('Snorlax');
    expect(oitavoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    const nonoPokemon = getByText('Dragonair');
    expect(nonoPokemon).toBeInTheDocument();

    fireEvent.click(button);

    expect(primeiroPokemon).toBeInTheDocument();
  });

test('Teste se é mostrado apenas um Pokémon por vez',
  () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const pokemons = getAllByTestId('pokemon-name');
    expect(pokemons.length).toBe(1);
  });

test('Teste se a Pokédex tem os botões de filtro',
  () => {
    const { getAllByTestId, getByRole, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const numeroTipos = 7;

    const pokemons = getAllByTestId('pokemon-type-button');
    expect(pokemons.length).toBe(numeroTipos);

    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    fireEvent.click(buttonPsychic);
    const psychicPokemon = getByText('Alakazam');
    expect(psychicPokemon).toBeInTheDocument();

  });

test('Teste se a Pokédex contém um botão para resetar o filtro',
  () => {
    const { getAllByTestId, getByRole, getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const numeroTipos = 7;

    const pokemons = getAllByTestId('pokemon-type-button');
    expect(pokemons.length).toBe(numeroTipos);

    const buttonAll = getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    const primeiroPokemon = getByText('Pikachu');
    expect(primeiroPokemon).toBeInTheDocument();

    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    fireEvent.click(buttonPsychic);
    const psychicPokemon = getByText('Alakazam');
    expect(psychicPokemon).toBeInTheDocument();

  });
