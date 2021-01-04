import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testing use cases in the component App', () => {
  it('should render Pokédex main page when the path is `/`', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const { pathname } = history.location;
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('should render a NavBar with three fixed links', () => {
    const { getByText } = RenderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('should redirect to the route `/` when clicked on `Home` link', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should redirect to the route `/about` when clicked on `About`link', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(
    'should redirect to the route `/favorites` by clicked on `Pokémons Favoritados`link',
    () => {
      const { getByText, history } = RenderWithRouter(<App />);
      fireEvent.click(getByText(/Favorite Pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  it('should be redirected to page `Not Found` if enters in a unknown URL', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    history.push('not-found');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
