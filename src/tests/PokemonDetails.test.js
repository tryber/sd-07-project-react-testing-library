import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('detailed information of the selected Pokémon is shown on the screen.', () => {
  test('page must contain <name> text', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name} Details`)).toBeInTheDocument();
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });

  test('There should be no navigation link for Pokémon details', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach(() => {
      expect(screen.queryByText('More Details')).toBeNull();
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });

  test('The details section must contain an heading h2 with the text Summary', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach(() => {
      expect(screen.getByText('Summary')).toBeInTheDocument();
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });

  test('details should contain a paragraph with the Pokémon summary.', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.summary)).toBeInTheDocument();
      expect(screen.getByText(pokemon.summary).tagName).toBe('P');
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });
});

describe('se existe na página uma seção com os mapas contendo as localizações', () => {
  test('there must be an heading h2 with the text Game Locations of <name>', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Game Locations of ${pokemon.name}`).tagName).toBe('H2');
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });

  test('Pokémon locations should be shown in the section', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByText(/More details/i);
    const home = screen.getByText(/Home/i);
    expect(btnDetails).toBeInTheDocument();
    fireEvent.click(btnDetails);
    const zero = 0;
    let number = zero;
    pokemons.forEach((pokemon) => {
      const { foundAt } = pokemon;
      foundAt.forEach((item, index) => {
        const altText = screen.getAllByAltText(`${pokemon.name} location`);
        expect(screen.getByText(item.location)).toBeInTheDocument();
        expect(altText[index].src).toBe(item.map);
      });
      fireEvent.click(home);
      for (let index = zero; index <= number; index += 1) {
        fireEvent.click(screen.getByTestId('next-pokemon'));
      }
      number += 1;
      fireEvent.click(screen.getByText(/More details/i));
    });
  });
  test('an image with the src attribute containing the /star-icon.svg path', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/More details/i);
    fireEvent.click(details);
    const btnFavorit = screen.getByText(/Pokémon favoritado?/i);
    fireEvent.click(btnFavorit);
    expect(screen.getByAltText('Pikachu is marked as favorite').src).toBe('http://localhost/star-icon.svg');
  });
});
