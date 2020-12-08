import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

// https://www.codota.com/code/javascript/functions/history/createMemoryHistory
function renderWithRouter(
  component,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{component}</Router>),
    history,
  };
}

export default renderWithRouter;
