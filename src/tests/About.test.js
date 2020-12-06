import React from 'react';
import renderWithRouter from '../renderWhithRouter';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('testing About.js. Checks if:', () => {
  test('the page contains the informations about Pokedéx', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  test("the page has a 'h2' heading with About Pokédex text", () => {
    const { container, getByText, getByRole } = render(<About />);
    const heading = getByRole(/heading/i);
    expect(heading).toBeInTheDocument();
    const tagH2 = container.querySelectorAll('h2');
    expect(tagH2).toHaveLength(1);
    const subTitle = getByText(/(about) (pokédex)/i);
    expect(subTitle).toBeInTheDocument();
  });

  test('the pages contains two paragraphs', () => {
    const { container } = render(<About />);
    const tagsP = container.querySelectorAll('p');
    expect(tagsP).toHaveLength(2);
  });

  test('the page has image informations', () => {
    const { container, getByText, getByRole } = render(<About />);
    const img = getByRole(/img/i);
    expect(img).toBeInTheDocument();
    const tagImg = container.querySelectorAll('img');
    expect(tagImg).toHaveLength(1);
    const imgSrc = container.querySelector('img').src;
    expect(imgSrc).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );
  });
});
