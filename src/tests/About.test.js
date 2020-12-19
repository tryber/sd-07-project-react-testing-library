import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando informações sobre a Pokédex', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText, history } = renderWithRouter(<About />);
    history.push('/about');
    expect(getByText(/one can filter pokémons/i)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading')).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length.toString()).toBe('2');
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
