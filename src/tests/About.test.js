import React from 'react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Test2 - About.js', () => {
  it('should contain About pokédex in head', () => {
    const { getByText } = RenderWithRouter(<About />);
    const head = getByText('About Pokédex');
    expect(head).toBeInTheDocument();
  });

  it('should contain a tag h2 with About Pokédex', () => {
    const { container } = RenderWithRouter(<About />);
    const h2 = container.querySelector('h2');
    const h2text = h2.innerHTML;
    expect(h2).toBeInTheDocument();
    expect(h2text).toContain('About Pokédex');
  });

  it('should contain two tags p with pokédex description', () => {
    const { container } = RenderWithRouter(<About />);
    const pTag = container.querySelectorAll('p');
    const arrayLength = 2;
    expect(pTag.length).toBe(arrayLength);
  });

  it('should have specific image source', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const srcImg = getByRole('img');
    expect(srcImg.src).toBe(imgSrc);
  });
});
