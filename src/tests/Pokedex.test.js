import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/NotFound';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter'

    test('Teste se página contém um heading h2 com Encountered pokémons', () => {
      const { getByRole } = render(<Pokedex />);
      const tagH2 = getByRole('heading', { name: /Page requested not found/i });
      expect(tagH2.tagName).toBe('H2');
  });
      describe('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => { 
    it('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const btn = screen.getByTestId('next-pokemon');
      expect(btn).toBeInTheDocument();
      expect(btn.type).toBe('button');
      expect(btn).toHaveTextContent('Próximo pokémon');
  });
    it('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;', () => {
      renderWithRouter(<App />);
      const btn = screen.getByTestId('next-pokemon');
      fireEvent.click(btn);
      const pokemonName = screen.getByText(/Charmander/i);
      expect(pokemonName).toBeInTheDocument();
  });
    it('O texto do botão deve corresponder ao nome do tipo', () => {
      renderWithRouter(<App />);
      const btnFire = screen.getByRole('button', { name: /Fire/i });
      fireEvent.click(btnFire);
      expect(btnFire.textContent).toBe('Fire');
  });
    it('O texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByRole('button', { name: /All/i });
      expect(btnAll.textContent).toBe('All');
  });
});