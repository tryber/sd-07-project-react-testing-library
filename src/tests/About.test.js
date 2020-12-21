import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('Teste se a aplicação é redirecionada para a '
+ 'página de About, na URL about, ao clicar no link'
+ 'About da barra de navegação.', () => {
  it('Deve renderizar o componente About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    expect(getByText('About')).toBeInTheDocument();
  });
});

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = render(<About />);

    const aboutPokedex = getByText(/About Pokédex/);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByTestId } = render(<About />);

    const h2 = getByTestId('about-pokedex');

    expect(h2).toHaveTextContent(/About Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByTestId } = render(<About />);

    const p = getAllByTestId('about-pokedex-text');

    const numberParagraph = 2;

    expect(p.length).toBe(numberParagraph);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });

    expect(image).toBeInTheDocument();
  });
});
