import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Testese há icone de estrela no pokemon favorito',
  () => {
    const { getByTestId, getByText, queryByRole, getByRole, container } = render(
      <MemoryRouter initialEntries={ ['/pokemons/25'] }>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();

    const detailslLink = queryByRole('link', { name: 'More details' });
    expect(detailslLink).toBeNull();

    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();

    const resume = getByText(/This intelligent Pokémon roasts hard/i);
    expect(resume).toBeInTheDocument();
  });

test('Teste em seção de mapas e localização do pokemon',
  () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/pokemons/25'] }>
        <App />
      </MemoryRouter>,
    );

    const location = getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(location).toBeInTheDocument();

    const localImage = getAllByRole('img', { name: 'Pikachu location' });
    const numberLocation = 2;
    expect(localImage.length).toBe(numberLocation);
    expect(localImage[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(localImage[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
  () => {
    const { getByAltText, getByLabelText } = render(
      <MemoryRouter initialEntries={ ['/pokemons/25'] }>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    const icon = getByAltText(/Pikachu is marked as favorite/i);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
