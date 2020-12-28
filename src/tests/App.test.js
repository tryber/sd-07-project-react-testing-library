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
test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('Shows Pokedex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
describe('Group of fixed navigation link at the top of the application exists', () => {
  it('First Link must have a HOME text with / URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toHaveAttribute('href', '/');
  });

  it('Second link must have a About text with `/` URL', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About')).toHaveAttribute('href', '/about');
  });

  it('Third link must have Favorite Pokémons with `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Favorite Pokémons')).toHaveAttribute('href', '/favorites');
  });
});
test('Must redirected to the Not Found page when entering an unknown URL', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/none'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
