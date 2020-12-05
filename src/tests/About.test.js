import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('existe no documento?', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutText = getByText(
      'This application simulates a Pokédex, '
      + 'a digital encliclopedia containing all Pokémons',
    );
    const aboutText2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(aboutText).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });
  it('Contém h2?', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', { level: 2 });
    expect(aboutText.textContent).toBe('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });
  it('Contém dois parágrafos?', () => {
    const { container } = renderWithRouter(<About />);
    const aboutText = container.querySelectorAll('p');
    const num = 2;
    expect(aboutText).toHaveLength(num);
  });
});
describe('Contém imagem?', () => {
  it('Qual o src da imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
