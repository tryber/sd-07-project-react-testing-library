import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(

    <App />
    ,

  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('should be a  Home whith a URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  expect(history.location.pathname).toBe('/');
  expect(getByText('Home')).toBeInTheDocument();
});

test('should be a  About whith a URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  expect(history.location.pathname).toBe('/about');
  expect(getByText('About')).toBeInTheDocument();
});

test('should be a  Favorito whith a URL /favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(history.location.pathname).toBe('/favorites');
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('shold be redirect to NotFound', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText('Page requested not found');
  expect(noMatch).toBeInTheDocument();
});
