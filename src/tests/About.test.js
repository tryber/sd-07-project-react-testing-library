import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('testing the About page', () => {
  test('the page has a h2 heading with the text "About Pokédex"', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('the page has two paragraphs with Pokédex information', () => {
    const { container } = render(<About />);
    const TagsP = container.querySelectorAll('p');
    const paragraphQuantity = 2;
    expect(TagsP).toHaveLength(paragraphQuantity);
  });

  test('the page has a Pokédex image', () => {
    const { container } = render(<About />);

    const image = container.querySelector(
      '[src = "https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"]',
    );
    expect(image).toBeInTheDocument();
  });
});
