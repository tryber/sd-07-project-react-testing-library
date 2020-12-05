import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(
      getByText(
        /this application simulates a pokédex, a digital encliclopedia containing all /i,
      ),
    ).toBeInTheDocument();
  });
});
