import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('About.js Tests`', () => {
  it('Checks if "About Pokédex" info apears', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Checks if a H2 tag with text "About Pokédex" is rendered', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const title = getByText('About Pokédex');
    expect(title).toBeInTheDocument();
    expect(title.outerHTML).toBe('<h2>About Pokédex</h2>');
  });

  it('Checks 2 <p> are rendered', () => {
    const { container, history } = renderWithRouter(<App />);
    history.push('/about');
    const title = container.querySelectorAll('p');
    expect(title.length.toString()).toBe('2');
  });

  it('Checks if a especific IMG is rendered', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/about');
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
  });
});
