import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('links', () => {
  it('test About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('test paragrafo 1', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText(/This application simulates/i);
    expect(about).toBeInTheDocument();
  });

  it('test paragrafo 1', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText(/One can filter Pokémons/i);
    expect(about).toBeInTheDocument();
  });

  it('test img', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/about');
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
  });
});
