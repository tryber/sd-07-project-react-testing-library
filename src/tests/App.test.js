import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o App.js', () => {
  it('Verifica se mostra a PokeDex se a rota é /', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  it('Verifica se a Pokedex possui os links de redirecionamento', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    const home = getByText('Home');
    const favPoke = getByText('Favorite Pokémons');
    expect(about).toHaveTextContent('About');
    expect(home).toHaveTextContent('Home');
    expect(favPoke).toHaveTextContent('Favorite Pokémons');
  });
});
