import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('Testando o componente About', () => {
  it('Testando se a página contém informações', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('About'));
    const procurandoInfo = getByText(/This application simulates a Pokédex/i);
    expect(procurandoInfo).toBeInTheDocument();
  });
  it('Testando se a página tem heading', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('About'));
    const procurandoH2 = getByText(/About Pokédex/i);
    expect(procurandoH2).toBeInTheDocument();
  });
  it('Testando se a página contém dois parágrafos', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('About'));
    const procurandoP1 = getByText(/digital encliclopedia containing all Pokémons/);
    expect(procurandoP1).toBeInTheDocument();
    const procurandoP2 = getByText(/One can filter Pokémons by type, and see more/);
    expect(procurandoP2).toBeInTheDocument();
  });
  it('Testando se a página contém uma img específica', () => {
    const { getByAltText, getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('About'));
    const altImg = getByAltText('Pokédex');
    expect(altImg.src).toEqual('https://cdn.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
