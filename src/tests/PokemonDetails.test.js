import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('EX07 - Testando o arquivo PokemonDetails.js', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon roasts hard berries',
  };

  test('texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { getByText } = RenderWithRouter(<App />);
    const { name } = pokemon;

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const nameDetails = getByText(`${name} Details`);
    expect(nameDetails).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes', () => {
    const { getByText } = RenderWithRouter(<App />);

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);
    expect(linkDetails).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = RenderWithRouter(<App />);

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const h2Summary = getByText(/Summary/i);
    expect(h2Summary.tagName).toBe('H2');
    expect(h2Summary).toBeInTheDocument();
  });

  test('parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const { getByText } = RenderWithRouter(<App />);

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const pDetails = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(pDetails.tagName).toBe('P');
    expect(pDetails).toBeInTheDocument();
  });

  test('heading h2 com o texto Game Locations of <name>', () => {
    const { getByText } = RenderWithRouter(<App />);
    const { name } = pokemon;

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const h2Locations = getByText(`Game Locations of ${name}`);
    expect(h2Locations.tagName).toBe('H2');
    expect(h2Locations).toBeInTheDocument();
  });

  test('Todas as localizações do Pokémon devem ser mostradas', () => {
    const { getByText, container } = RenderWithRouter(<App />);
    const { foundAt } = pokemon;

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    foundAt.forEach((location) => {
      const nameLocation = getByText(location.location);
      expect(nameLocation).toBeInTheDocument();
    });

    const containerLocation = container.querySelector('.pokemon-habitat')
      .childElementCount;

    expect(foundAt).toHaveLength(containerLocation);
  });

  test('imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { getByText, getAllByAltText } = RenderWithRouter(<App />);
    const { name, foundAt } = pokemon;

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const imgLocation = getAllByAltText(`${name} location`);

    foundAt.forEach((location, index) => {
      expect(imgLocation[index].src).toBe(location.map);
    });
  });

  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByLabelText } = RenderWithRouter(<App />);

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const inputFavorite = getByLabelText(/Pokémon favoritado?/i);
    expect(inputFavorite).toBeInTheDocument();
  });

  test('checkbox devem adicionar e remover respectivamente', () => {
    const { getByText, getByLabelText, getByAltText } = RenderWithRouter(
      <App />,
    );

    const linkDetails = getByText(/More details/i);
    fireEvent.click(linkDetails);

    const inputFavorite = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(inputFavorite);

    const imgFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(imgFavorite).toBeInTheDocument();

    fireEvent.click(inputFavorite);
    expect(imgFavorite).not.toBeInTheDocument();
  });
});
