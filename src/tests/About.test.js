import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando arquivo about', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const message = getByText(/About Pokédex/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto /About Pokédex/', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading.innerHTML).toBe('About Pokédex');
  });
});
