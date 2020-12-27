import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import NotFound from '../components/NotFound';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector(
      '[src = "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]',
    );
    expect(image).toBeInTheDocument();
  });
});
