import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o componente About', () => {
  it('Testando se a pagina contém informações', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const procurandoInfo = getByText(/This application simulates a Pokédex/i);
    expect(procurandoInfo).toBeInTheDocument();
  });

  it('Testando o texto e existencia do H2', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const procurandoH2 = getByRole('heading', { name: /About Pokédex/i });
    expect(procurandoH2.tagName).toBe('H2');
  });

  it('Testando se a página contém um segundo parágrafo', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const paragrafo = document.getElementsByTagName('p');
    const qtdParagrafo = 2;
    expect(paragrafo.length).toBe(qtdParagrafo);
    const pTexto = getByText(/One can filter Pokémons by type, and see more/);
    expect(pTexto).toBeInTheDocument();
  });

  it('Testando se a página contém uma img específica', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const altImg = getByAltText('Pokédex');
    expect(altImg.src).toEqual('https://cdn.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
