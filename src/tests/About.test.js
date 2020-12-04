import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('Teste da tela About', () => {
  it('test that there is a rendered h2 title', () => {
    const { getByRole } = render(<About />);

    const title = getByRole('heading');

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title.textContent).toBe('About Pokédex');
  });

  it('tests that it has two paragraphs with information', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    const quantidadeP = 2;
    const information1 = 'This application simulates a Pokédex,';
    const information2 = ' a digital encliclopedia containing all Pokémons';
    const information3 = 'One can filter Pokémons by type,';
    const information4 = ' and see more details for each one of them';

    expect(p.length).toBe(quantidadeP);
    expect(p[0].textContent).toBe(`${information1}${information2}`);
    expect(p[1].textContent).toBe(`${information3}${information4}`);
  });
  it('test that there is a rendered an image of Pokedex', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
