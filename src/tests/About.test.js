import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('', () => {
  test('if contains all information about the POKEDEX', () => {
    const { getByText } = render(<About />);

    const aboutMessage = getByText(/About Pokédex/i);
    expect(aboutMessage).toBeInTheDocument();
  });

  test('if contains all information about the POKEDEX', () => {
    const { getByText } = render(<About />);

    const aboutDetails = getByText(/This application simulates a Pokédex/i);
    expect(aboutDetails).toBeInTheDocument();
  });

  test('if contains the Heading About Pokédex', () => {
    const { getByText } = render(<About />);

    const aboutHeading = getByText(/About Pokédex/i);
    expect(aboutHeading).toBeInTheDocument();
  });

  test('if the path of the image is in the document', () => {
    const { getByAltText } = render(<About />);

    const altText = getByAltText(/Pokédex/i);
    expect(altText).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
