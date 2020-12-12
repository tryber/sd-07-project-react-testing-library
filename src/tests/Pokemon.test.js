import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Pokemon component', () => {
  test('if the correct card is shown in the card', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name').innerHTML;
    const type = screen.getByTestId('pokemonType').innerHTML;
    const weight = screen.getByTestId('pokemon-weight').innerHTML;
    const imagePath = screen.getByAltText(`${name} sprite`).src;

    expect(name).toBe('Pikachu');
    expect(type).toBe('Electric');
    expect(weight).toBe('Average weight: 6.0 kg');
    expect(imagePath).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should has a link that leads to detail page with the right ID', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);

    expect(detailsLink.href).toBe('http://localhost/pokemons/25');
  });

  it('should redirect to pkemon details', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);

    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const path = history.location.pathname;

    expect(path).toBe('/pokemons/25');
  });

  it('should render a star icon for favorites pokemons', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/more details/i);

    fireEvent.click(detailsLink);

    const favoritCheck = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoritCheck);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favIcon).toBeInTheDocument();
    expect(favIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
