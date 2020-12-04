import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

describe('Tests for App component', () => {
  it('renders the home page with the path `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const { pathName } = history.location;
    expect(pathName).toBe('/');
  });

  it('renders links navigation on top', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorites = getByText(/About/i);
    expect(favorites).toBeInTheDocument();
  });

  it('redirect tp home page when click in link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathName } = history.location;
    expect(pathName).toBe('/');
  });

  it('redirect to about page when in link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathName } = history.location;
    expect(pathName).toBe('/About');
  });

  it('redirect to favorites pokémons when click in link Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('redirect to Not Found page when use a unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/another-page/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
