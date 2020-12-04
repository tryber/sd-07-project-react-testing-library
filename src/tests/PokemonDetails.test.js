import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { PokemonDetails } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'pikachu',
  type: 'electric',
  averageWeight: { value: '5', measurementUnit: 'kg' },
  image: 'pikachu-image',
  foundAt: [
    { location: 'location1', map: 'anywhere' },
    { location: 'location2', map: 'faraway' },
  ],
  summary: 'A pokemon',
};

const Rendering = () => renderWithRouter(
  <PokemonDetails
    pokemons={ [pokemon] }
    isPokemonFavoriteById={ { 25: false } }
    onUpdateFavoritePokemons={ () => {} }
    match={ { params: { id: '25' } } }
  />,
);

describe('Testa se as informações do Pokémon selecionado são mostradas na tela.', () => {
  it('A página deve conter um texto <name> Details.', () => {
    Rendering();
    const name = screen.getByText(/Pikachu Details/i);

    expect(name).toBeInTheDocument();
  });
  it('NÃO deve existir o link de navegação para os detalhes do Pokémon.', () => {
    const { container } = Rendering();
    const details = container.querySelector('a');

    expect(details).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um h2 com o texto Summary.', () => {
    Rendering();
    const summary = screen.getByText(/Summary/i);

    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon.', () => {
    Rendering();
    const details = screen.getByText(/A pokemon/i);

    expect(details).toBeInTheDocument();
    expect(details.tagName).toBe('P');
  });
});

describe('Testa se existe na página uma seção com os mapas do pokémon', () => {
  it('deve existir um h2 com o texto Game Locations of <name>.', () => {
    Rendering();
    const locationTitle = screen.getByText(/Game Locations of pikachu/i);

    expect(locationTitle).toBeInTheDocument();
    expect(locationTitle.tagName).toBe('H2');
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção.', () => {
    Rendering();
    const location1 = screen.getByText(/location1/i);
    const location2 = screen.getByText(/location2/i);

    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });
  it('Devem ser exibidos, o nome da localização e uma imagem de cada local.', () => {
    const { container } = Rendering();
    const locationInfo = container.querySelector('div.pokemon-habitat');

    expect(locationInfo).toBeInTheDocument();
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização;', () => {
    Rendering();
    const allImages = screen.queryAllByAltText(/pikachu location/i);

    expect(allImages[0]).toHaveAttribute('src', 'anywhere');
    expect(allImages[1]).toHaveAttribute('src', 'faraway');
  });
  it('A imagem da localização deve ter um "alt" com o texto <name> location', () => {
    Rendering();
    const allImages = screen.queryAllByAltText(/pikachu location/i);

    expect(allImages[0]).toHaveAttribute('alt', 'pikachu location');
    expect(allImages[1]).toHaveAttribute('alt', 'pikachu location');
  });
});

describe('Testa se o usuário pode favoritar um pokémon.', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon.', () => {
    Rendering();
    const checkbox = screen.getByLabelText(/Pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
  });

  it('Clique alternados no checkbox devem adicionar/remover dos favoritos.', () => {
    const { container } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More Details/i));

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favorite);

    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(favorite);

    expect(favoriteIcon).not.toBeInTheDocument();
  });

  it('O label do checkbox deve conter o texto "Pokémon favoritado?"', () => {
    Rendering();

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
  });
});
