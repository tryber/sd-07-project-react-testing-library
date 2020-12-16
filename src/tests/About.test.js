import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    expect(getByText('This application simulates a Pokédex')).toBeInTheDocument();
  });

  it('a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading')).toHaveTextContent('About Pokédex');
  });

  it('a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { queryAllByRole } = render(<About />);
    expect(queryAllByRole('p').length).toBe('2');
  });

  it('a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
