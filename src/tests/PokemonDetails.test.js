import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa se as informações detalhadas são mostradas na tela', () => {
  it('A página deve conter name Details, onde name é o nome do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const nameDetails = getByText(`${pokemons[0].name} Details`);
    expect(nameDetails).toBeInTheDocument();
  });

  it('Não deve existir link de navegação para os detalhes do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    expect(detailsButton).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const heading = getByText(/Summary/i);
    expect(heading).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const summary = getByText(pokemons[0].summary);
    expect(summary).toBeInTheDocument();
  });
});

describe('Teste se há seção com os mapas contendo as localizações do pokémon', () => {
  it('Deverá existir um h2 com o texto Game Locations of <name>', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const titleLocations = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(titleLocations).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const locations = getAllByAltText(`${pokemons[0].name} location`);
    expect(locations.length).toBe(pokemons[0].foundAt.length);
    locations.map((location, index) => (
      expect(location).toHaveAttribute('src', pokemons[0].foundAt[index].map)));
  });
});

describe('Testa se o usuário pode favoritar um pokémon pela página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const label = getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
