import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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
