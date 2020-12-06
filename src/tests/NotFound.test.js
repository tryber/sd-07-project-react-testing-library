import React from 'react';
import { cleanup } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('EX04 - Testando o arquivo NotFound.js', () => {
  test('heading h2 com o texto "Page requested not found 😭"', () => {
    const { history, getByRole, getByAltText } = RenderWithRouter(<App />);

    history.push('/xablau');

    const h2Tag = getByRole('heading', {name: /Page requested/i});
    const img = getByAltText(/Pikachu crying/i);

    expect(h2Tag.tagName).toBe('H2');
    expect(h2Tag).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
})
