import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });
});
