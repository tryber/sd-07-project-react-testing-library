import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing About Pokedéx page', () => {
  it('contains info about the Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const info = getByText(/This application simulates a Pokédex/i);
    expect(info).toBeInTheDocument();
  });
  it('contains a heading h2 with the text About Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });
  it('contains two paragraphs with text about the Pokédex', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph = container.getElementsByTagName('p');
    const expectedParagraphs = 2;
    expect(paragraph).toHaveLength(expectedParagraphs);
  });
  it('displays an image of a Pokédex', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
