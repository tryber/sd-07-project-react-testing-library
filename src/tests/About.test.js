import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);

    const h2 = getByRole('heading');

    expect(h2).toHaveTextContent(/about pokédex/i);
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const amountP = 2;
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(amountP);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
