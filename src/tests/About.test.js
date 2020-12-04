import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('About - Contém as informações necessárias', () => {
  it('Deve renderizar um h2 com o texto "About Pokédex"', () => {
    const { getByText, getByRole } = renderWithRouter(<About />);
    const h2Element = getByRole('heading', { level: 2 });
    const h2Content = getByText('About Pokédex');

    expect(h2Element).toBeInTheDocument();
    expect(h2Content).toBeInTheDocument();
  });

  it('Deve renderizar dois parágrafos com texto', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type, and/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Deve uma imagem específica', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
