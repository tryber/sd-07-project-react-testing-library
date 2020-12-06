import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requiriment 02', () => {
  test('1/4', () => {
    renderWithRouter(<About />);

    const aboutMessage = screen.getByText(
      /this application simulates a pokédex/i
    );

    expect(aboutMessage).toBeInTheDocument();
  });

  test('2/4', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByText(/about pokédex/i);

    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle.tagName).toBe('H2');
  });

  test('3/4', () => {
    renderWithRouter(<About />);

    const aboutParagraphOne = screen.getByText(/this application simulates a pokédex/i);
    const aboutParagraphTwo = screen.getByText(/one can filter pokémons by type/i);

    expect(aboutParagraphOne).toBeInTheDocument();
    expect(aboutParagraphTwo).toBeInTheDocument();

    expect(aboutParagraphOne.tagName).toBe('P');
    expect(aboutParagraphTwo.tagName).toBe('P');
  });

  test('4/4', () => {
    renderWithRouter(<About />);

    const aboutImage = screen.getByRole('img');

    expect(aboutImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
