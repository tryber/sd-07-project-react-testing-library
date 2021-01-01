import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

afterEach(cleanup);

test('if the page contains information about Pokédex', () => {
  const { getByText } = RenderWithRouter(<About />);
  expect(
    getByText(
      'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons'
    )
  ).toBeInTheDocument();
});

test('if the page contains an h2 heading with the text About Pokédex', () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <About />
    </Router>
  );
  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();
  // expect(getByText('About Pokédex').tagName).toBe('H2');
  expect(h2.textContent).toBe('About Pokédex');
});

test('if the page contains two paragraphs with text about Pokédex', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <About />
    </Router>
  );
  expect(
    getByText(
      'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons'
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i
    )
  ).toBeInTheDocument();
});

test('if the page contains the following image of a Pokédex', () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router history={history}>
      <About />
    </Router>
  );
  const img = container.querySelector('img');
  expect(img).toHaveAttribute('alt', 'Pokédex');
});
