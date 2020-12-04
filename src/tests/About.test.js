import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('2. About.js file', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    expect(getByText(/simulates a Pokédex, a digital encliclopedi/i)).toBeInTheDocument();
  });
  test('h2 about pokedex', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  test('two paragraphs', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(getByText(/simulates a Pokédex, a digital encliclopedi/i)).toBeInTheDocument();
    expect(getByText(/ons by type, and see more details fo/i)).toBeInTheDocument();
  });
  test('test image existence', () => {
    const { getByText, container } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const img = container.querySelector(
      '[src = "https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"]',
    );
    expect(img).toBeInTheDocument();
  });
});
