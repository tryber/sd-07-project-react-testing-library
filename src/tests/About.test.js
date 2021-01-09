import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Teste de component About', () => {
  test('Teste se About contém informação sobre pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('Teste se página possui elemento h2 com texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se há 2 parágrafos com texto', () => {
    const { container } = renderWithRouter(<About />);
    /* Mesmo querySelector utilizando no DOM */
    const paragraphs = container.querySelectorAll('p');
    const expectedLength = 2;
    expect(paragraphs.length).toBe(expectedLength);
  });

  test('Teste se há uma determinada imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');

    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
