import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando about', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const informaçõesPokedex = getByText(/This application simulates/i);
    expect(informaçõesPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const paragrafos = getByText(/One can filter Pokémons by/i);
    expect(paragrafos).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const textoAbout = getByText('About Pokédex');
    expect(textoAbout).toBeInTheDocument();
  });

  it('Testa se a página tem a imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/about');
    const imagem = getByAltText('Pokédex');
    expect(imagem).toBeInTheDocument();
  });
});
