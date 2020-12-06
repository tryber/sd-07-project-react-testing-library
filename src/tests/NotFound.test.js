import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testing the NotFound.js file', () => {
  it('Test if an h2 heading with the text Page requested not found 😭', () => {
    const { container, history } = renderWithRouter(<App />);
    history.push('/anyone');
    const zero = 0;
    const three = 3;
    const twentyFour = 24;
    const tagH2 = container.querySelector('h2').innerHTML.substring(zero, twentyFour);
    const tagSpan = container.querySelector('span').innerHTML.substring(zero, three);
    const togheter = tagH2 + tagSpan;
    expect(togheter).toBe('Page requested not found 😭');
  });
  it('Showd to test if the page shows an image', () => {
    const { container, history } = renderWithRouter(<App />);
    history.push('/anyone');
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = container.querySelector('img').src;
    expect(img).toBe(imgUrl);
  });
});
