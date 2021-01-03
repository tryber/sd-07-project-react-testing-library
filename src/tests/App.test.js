import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(getByText('Encountered')).toBeInTheDocument();
});
// adaptado a partir de https://testing-library.com/docs/example-react-router/
