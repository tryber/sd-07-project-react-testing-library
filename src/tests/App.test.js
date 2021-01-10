import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows the Pokédex when the route is `About`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('shows the Pokédex when the route is `Favorite Pokémons`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('text of links contents `Home`, `About`, `Favorite Pokémons` respectivamente',
  () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

test('if click in the Home link go to a URL `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Home'));
  const heading = getByText('Pokédex');
  expect(heading).toBeInTheDocument();
});
