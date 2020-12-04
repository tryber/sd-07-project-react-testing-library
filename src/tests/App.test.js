import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
