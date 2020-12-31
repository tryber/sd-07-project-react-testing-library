import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o about', () => {
  const { getByText } = render(<About />);
  it('A página deve conter as informações sobre a Pokédex', () => {
    const texto = getByText(/This application simulates a Pokédex, a/i);
    expect(texto).toBeInTheDocument();
  });
  it('A página deve conter um H2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', { name: /About Pokédex/i });
    expect(heading.tagName).toBe('H2');
  });
  it('A página deve conter 2 paragrafos', () => {
    render(<About />);
    const p = document.getElementsByTagName('p');
    const magicNumber = 2;
    expect(p.length).toBe(magicNumber);
  });
  it('A imagem deve ter um link especifico', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
