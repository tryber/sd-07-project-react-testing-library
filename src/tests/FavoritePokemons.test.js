import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('tela possui mensagem No favorite pokemon found, se a pessoa não tiver favoritos',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/No favorite pokemon found/i);
    expect(heading).toBeInTheDocument();
  });

test('Teste se é exibido todos os cards de pokémons favoritados.',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const pokeCard = getByText(/Pikachu/i);
    expect(pokeCard).toBeInTheDocument();

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
  });

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });