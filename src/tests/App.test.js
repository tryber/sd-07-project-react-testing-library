import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('When load the URL “/”, the Pokedex main page must show up', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
describe('On top of Application, must have fixed nav links', () => {
  it('First link must have the text Home with the URL"/"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toHaveAttribute('href', '/');
  });
  it('Second link must have the text About with the URL /about', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About')).toHaveAttribute('href', '/about');
  });
  it('3rd link must have Favorite Pokémons with `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Favorite Pokémons')).toHaveAttribute('href', '/favorites');
  });
});
test('Unknown URL shows Not Found', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/pageNotFound'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
