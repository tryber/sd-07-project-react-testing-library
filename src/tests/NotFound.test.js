import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Test 4 - NotFound.js', () => {
  it('Should to contain a h2 tag with \'Page requested not found 😭\'', () => {
    const { container } = RenderWithRouter(<NotFound />);
    const tagH2Title = container.querySelector('h2');
    const textH2 = tagH2Title.innerHTML;
    expect(textH2).toContain('Page requested not found');
  });
  it('Should to contain an expecifc imag', () => {
    const { container } = RenderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagTag = container.querySelector('img');
    expect(imagTag.src).toBe(imgSrc);
  });
});
