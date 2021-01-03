import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('NotFound.js Tests`', () => {
  it('Checks if an H2 is rendered with a message', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Marcio');
    const heading = document.querySelector('h2');
    let inner = '';
    inner = 'Page requested not found<span role="img" aria-label="Crying emoji"> 😭</span>';
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe(inner);
  });

  it('Checks if a especific IMG is rendered', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/Marcio');
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    );
  });
});
