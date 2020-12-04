import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import About from '../components/About';

afterEach(cleanup);

describe('testing the About page', () => {
  test('the page has a h2 heading with the text "About Pokédex"', () => {
    const { getByText } = render(<About />);
    const heading = screen.getByTestId('h2-heading');
    expect(heading).toBeInTheDocument();
    const headingText = getByText(/\bAbout Pokédex\b/);
    expect(headingText).toBeInTheDocument();
  });

  test('the page has two paragraphs with Pokédex information', () => {
    const { container } = render(<About />);
    const TagsP = container.querySelectorAll('p');
    const paragraphQuantity = 2;
    expect(TagsP).toHaveLength(paragraphQuantity);
  });

  test('the page has a Pokédex image', () => {
    const { container } = render(<About />);
    const image = container.getElementsByTagName('img');
    const imageValidation = image[0];
    expect(imageValidation).toBeInTheDocument();
  });
});
