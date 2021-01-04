import React from 'react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Test 2 - About.js', () => {
  it('Should contain \'About Pokédex\' in heading', () => {
    const { getByText } = RenderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });
  it('Should contain a tag H2 with About Pokédex', () => {
    const { container } = RenderWithRouter(<About />);
    const tagH2 = container.querySelector('h2');
    const textH2 = tagH2.innerHTML;
    expect(tagH2).toBeInTheDocument();
    expect(textH2).toContain('About Pokédex');
  });
  it('Should contain 2 tags p with podéxs description', () => {
    const { container } = RenderWithRouter(<About />);
    const tagP = container.querySelectorAll('p');
    const arrayLength = 2;
    expect(tagP.length).toBe(arrayLength);
  });
  it('Should have a epecif image src', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageSrc = getByRole('img');
    expect(imageSrc.src).toBe(imgSrc);
  });
});
