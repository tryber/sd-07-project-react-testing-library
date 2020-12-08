import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, screen } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testing the file About.js', () => {
  test('check if the page contains information about Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/about';
    history.push(route);
    const aboutText = getByText(/This application simulates a Pokédex, a digital/i);
    expect(aboutText).toBeInTheDocument();
  });
  test('check if the page contains h2', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/about';
    history.push(route);
    const heading = screen.getByText(/About Pokédex/i, { selector: 'h2' });
    expect(heading).toBeInTheDocument();
  });

  test('check if the page contains two p if Pokedéx', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/about';
    history.push(route);
    const paragraph = container.querySelectorAll('p');
    const number = 2;
    expect(paragraph).toHaveLength(number);
  });

  test('contains the following image of a Pokédex', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/about';
    history.push(route);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
