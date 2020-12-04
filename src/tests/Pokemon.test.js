import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getByRole, queryAllByRole, getByTestId } = renderWithRouter(
      <App />,
    );
    const pokeName = getByTestId('pokemon-name').innerHTML;
    const pokeWeight = getByTestId('pokemon-weight').innerHTML;
    const pokeImgSrc = getByRole('img').src;
    const pokeImgAlt = getByRole('img').alt;

    const btnDetail = getByText('More details');
    fireEvent.click(btnDetail);

    const pokeNameDetail = getByText(pokeName);
    expect(pokeNameDetail).toBeInTheDocument();

    const pokeWeightDetail = getByText(pokeWeight);
    expect(pokeWeightDetail).toBeInTheDocument();

    const pokeImgSrcDetail = queryAllByRole('img').find((img) => img.src === pokeImgSrc);
    expect(pokeImgSrcDetail).not.toBe(null);

    const pokeImgAltDetail = queryAllByRole('img').find((img) => img.Alt === pokeImgAlt);
    expect(pokeImgAltDetail).not.toBe(null);

    const pokeType = getByTestId('pokemonType');
    expect(pokeType.innerHTML).toBe('Electric');
  });

  it('Teste se o card ... onde <id> é o id do Pokémon exibido;', () => {
    const { getByText, history, getByTestId } = renderWithRouter(<App />);

    const pokeName = getByTestId('pokemon-name').innerHTML;
    const pokemon = data.find((pokemon2) => pokemon2.name === pokeName);

    const btnDetail = getByText('More details');
    fireEvent.click(btnDetail);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);

    const btnDetail = getByText('More details');
    fireEvent.click(btnDetail);

    const btnFav = getByLabelText(/Pokémon favoritado/);
    fireEvent.click(btnFav);

    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).not.toBe(null);
  });

  it('Matando Mutantes', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const btnDetail = getByText('More details');
    fireEvent.click(btnDetail);

    const imgPika = getByRole('img', { name: /pikachu sprite/i });
    expect(imgPika.alt).toBe('Pikachu sprite');
    expect(imgPika.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Matando Mutantes 2.0', () => {
    const pokeFav = true;

    renderWithRouter(
      <Pokemon pokemon={ data[0] } showDetailsLink={ false } isFavorite={ pokeFav } />,
    );

    const starImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starImg.src).toMatch(/star-icon.svg/);

    const mut1 = screen.getByText(/6.0/);
    expect(mut1).toBeInTheDocument();

    const mut2 = screen.getByText(/Average weight/);
    expect(mut2).toBeInTheDocument();

    const mut3 = screen.getByText(/kg/);
    expect(mut3).toBeInTheDocument();
  });
});
