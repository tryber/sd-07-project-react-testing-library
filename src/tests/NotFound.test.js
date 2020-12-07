import React from 'react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('Testando o componente NotFound', () => {
  it('Testando se a página contém heading h2', () => {
    const { getByText, history } = renderWithRoute(<App />);
    history.push('/xablau');
    const pageNaoEncontrada = getByText(/Page requested not found/i);
    expect(pageNaoEncontrada).toBeInTheDocument();
  });
});
