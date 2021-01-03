import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testing About Pokedéx page', () => {
  it('contains info about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const expectedText = getByText(/This application simulates a Pokédex/i);
    expect(expectedText).toBeInTheDocument();
  });
  it('contains a heading h2 with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const expectedText = /About Pokédex/i;
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(expectedText);
  });
  it('contains two paragraphs with text about the Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const expectedParagraphs = 2;
    const paragraph = container.getElementsByTagName('p');
    expect(paragraph).toHaveLength(expectedParagraphs);
  });
  it('displays an image of a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const expectedImageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', expectedImageUrl);
  });
});
