import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    const { getByTestId, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

test('Teste se o card do Pokémon contém um link de navegação para exibir detalhes',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);

    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

test('Testese há icone de estrela no pokemon favorito',
  () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter initialEntries={ ['/pokemons/25'] }>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Pokémon favoritado?'));

    const icon = getByAltText(/Pikachu is marked as favorite/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
