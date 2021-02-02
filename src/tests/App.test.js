import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('if links text are present', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/home/i)).toBeInTheDocument();
  expect(getByText(/about/i)).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

describe('tests if links are functional', () => {
  it('should redirect to home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    expect(history.location.pathname).toBe('/');
  });

  it('should redirect to favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('should redirect to about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    expect(history.location.pathname).toBe('/about');
  });
});

test('if unknown url works properly', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/unknown');
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});
