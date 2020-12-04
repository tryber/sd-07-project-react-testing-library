import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo Pokedex', () => {
  it('Informações sobre Pokedex', () => {
    const { getByText } = renderWithRender(<App />);
    const Encountered = getByText(/Encountered pokémons/i);
    expect(Encountered.tagName).toBe('H2');   
  });

  it('Informações Botoes Pokedex', () => {
    const { getByText, getByTestId } = renderWithRender(<App />);

    const buttonNext = getByText(/Próximo pokémon/i);

    fireEvent.click(buttonNext);

    const PokedexNextChamp = getByTestId('pokemon-name');

    expect(PokedexNextChamp.innerHTML).toBe('Charmander');

    fireEvent.click(buttonNext);

    const PokedexNextChamp2 = getByText(/Caterpie/i);

    expect(PokedexNextChamp2).toBeInTheDocument();
  });

  it('Informações Filter Pokedex', () => {
    const { getByText, getAllByTestId } = renderWithRender(<App />);

    const buttonPoke = getAllByTestId('pokemon-type-button');

    buttonPoke.map(buton => expect(buton).toBeInTheDocument());

    fireEvent.click(getByText(/Psychic/i));

    const PokedexFilter = getByText(/Alakazam/i);

    expect(PokedexFilter).toBeInTheDocument();

    fireEvent.click(getByText(/Bug/i));

    const PokedexFilter2 = getByText(/Caterpie/i);

    expect(PokedexFilter2).toBeInTheDocument();
    
    
    fireEvent.click(getByText(/All/i));

    const PokedexFilter3 = getByText(/Pikachu/i);

    expect(PokedexFilter3).toBeInTheDocument();

  });

});
