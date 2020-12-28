import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('about tests', () => {
  it('Must have Pokédex info in the page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  it('Must have heading h2 with text About Pokédex in the page', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getAllByRole('heading');
    expect(heading[1]).toHaveTextContent('About Pokédex');
  });

  it('Must have 2 p', () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const totalAP = 2;
    const selectingParagraphs = container.querySelectorAll('p');
    expect(selectingParagraphs.length).toBe(totalAP);
  });

  it('Page should have a src with a url', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});