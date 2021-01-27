import React from 'react';
import { Router } from 'react-router-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import About from '../components/About';

test('About page must show pokedex info', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  history.push('/about');
  const path = history.location.pathname;
  expect(path).toBe('/about');
});

test('Page must have a heading h2 with text About Pokédex', () => {
  const { getByRole } = render(<About />);
  const h2 = getByRole('heading');
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe('About Pokédex');
  expect(h2.tagName).toBe('H2');
});

test('Page must have two paragraphs with text about Pokédex', () => {
  const { container } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const totalAP = 2;
  const selectingParagraphs = container.querySelectorAll('p');
  expect(selectingParagraphs.length).toBe(totalAP);
});

test('Page must have the following img of a Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  const { getByRole } = render(<About />);
  const img = getByRole('img');
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
