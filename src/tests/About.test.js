import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe(' testando componente about', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const about = getByText('This application simulates a Pokédex,'
    + ' a digital encliclopedia containing all Pokémons');
    expect(about).toBeInTheDocument();
  });
  it('Testa se a página contem heading ', () => {
    const { getByText, getByRole } = render(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    const two = 2;
    expect(paragraphs.length).toBe(two);
  });
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText(/Pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
