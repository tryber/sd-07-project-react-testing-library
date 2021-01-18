import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Test4 - NotFound.js', () => {
  it('should to contain a h2 tag with text Page requested not found', () => {
    const { container } = RenderWithRouter(<NotFound />);
    const h2TagTitle = container.querySelector('h2');
    const h2Text = h2TagTitle.innerHTML;
    expect(h2Text).toContain('Page requested not found');
  });

  it('should to contain an especific image', () => {
    const { container } = RenderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgTag = container.querySelector('img');
    expect(imgTag.src).toBe(imgSrc);
  });
});
