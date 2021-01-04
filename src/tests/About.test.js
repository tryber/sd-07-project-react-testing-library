import React from 'react';
import RenderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Testing use cases in the `About` page', () => {
  it('should contains Pokédex info', () => {
    const { getByText } = RenderWithRouter(<About />);
    expect(getByText(/^About Pokédex$/i)).toBeInTheDocument();
  });

  it('should contains a heading h2 with the text `About`', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const heading = getByRole('heading');
    expect((heading.tagName)).toBe('H2');
    expect((heading)).toHaveTextContent('About Pokédex');
  });

  it('should contain two paragraphs about Pokédex', () => {
    const { getByText } = RenderWithRouter(<About />);
    const paragraphsQuantity = 2;
    const paragraphs = document.getElementsByTagName('p');
    expect((paragraphs.length)).toBe(paragraphsQuantity);
    const firstParagraphText = 'This application simulates a Pokédex, '
    + 'a digital encliclopedia containing all Pokémons';
    const paragraph1 = getByText(firstParagraphText);
    const paragraph2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragraphs[0]).toBe(paragraph1);
    expect(paragraphs[1]).toBe(paragraph2);
  });

  it('should render a image of a Pokédex', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
