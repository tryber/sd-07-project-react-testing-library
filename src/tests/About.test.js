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
    const { getByTestId } = renderWithRouter(<About />);

    const heading = getByTestId('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/about pokédex/i);
  });

  test('if the page contains 2 paragraphs', () => {
    const { getAllByTestId } = renderWithRouter(<About />);

    const paragraphs = getAllByTestId('about-pokedex');
    const expectedParagraphs = 2;
    expect(paragraphs[0]).toBeInTheDocument();
    expect(paragraphs[1]).toBeInTheDocument();
    expect(paragraphs.length).toBe(expectedParagraphs);
  });

  test('if the page contains a specific picture', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const picture = getByAltText('Pokédex');
    expect(picture).toBeInTheDocument();
    expect(picture.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
