import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('tests the use cases for the component Pokemon', () => {
  it('should render info of some pokemon', () => {
    const { getByTestId, getByRole } = RenderWithRouter(<App />);
    expect(getByTestId(/pokemon-name/i)).toHaveTextContent(/Pikachu/i);

    expect(getByTestId(/pokemonType/i)).toHaveTextContent(/Electric/i);

    expect(getByTestId(/pokemon-weight/i)).toHaveTextContent(/Average weight: 6.0 kg/i);

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('should have a link to details of this pokemon', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    const pikachuId = 25;
    expect(pathname).toBe(`/pokemons/${pikachuId}`);
  });

  it('should have a star icon in favorited pokemons', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const starredIcon = getByRole('img', { name: /Pikachu is marked as favorite/i });
    const pokemonName = 'Pikachu';
    expect(starredIcon.alt).toBe(`${pokemonName} is marked as favorite`);
    expect(starredIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
