import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo About.js', () => {
  test('página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const inf = getByText(/About Pokédex/i);
    expect(inf).toBeInTheDocument();
  });

  it('página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { name: /About Pokédex/ });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const inf = getByText(/This application simulates a Pokédex/i);
    const inf2 = getByText(/One can filter Pokémons by type/i);
    expect(inf).toBeInTheDocument();
    expect(inf2).toBeInTheDocument();
  });

  it('página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
