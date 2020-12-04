import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('Testando o arquivo About.js', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = render(<About />);
    const h2 = getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
  });
});
