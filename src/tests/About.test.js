import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('if the page contains a h2 element with a especific text', () => {
    const { getByText } = renderWithRouter(<About />);

    const heading = getByText(/about pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('if the page contains 2 paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('if the page contains a specific picture', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const picture = getByAltText('Pokédex');
    expect(picture).toBeInTheDocument();
    expect(picture.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
