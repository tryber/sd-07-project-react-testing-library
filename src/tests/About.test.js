import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Tests the elements of the About.js component', () => {
  it('test whether the page contains an h2 heading with the text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const title = getByText(/About Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  // teste abaixo feito com auxílio do código do Rafael Guimarães - Turma 7

  it('Test if the page contains two paragraphs with text about Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const pHTMLElements = 2;
    expect(container.querySelectorAll('p').length).toBe(pHTMLElements);
  });

  it('test if a page contains a Pokédex image', () => {
    const { getByAltText, container } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();

    const imagePokédex = container.querySelector('img');
    expect(imagePokédex).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
