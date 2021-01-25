import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 Detalhes do Pokemon', () => {
  it('Verifica se a pagina contem um texto name details', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const pichaku = screen.getByText(/Pikachu Details/i);
    expect(pichaku).toBeInTheDocument();
  });

  it('Verifica que não deve existir o link de navegação', () => {
    renderRouter(<App />);
    const click = screen.getByText(/More details/i);
    fireEvent.click(click);
    expect(click).not.toBeInTheDocument();
  });

  it('Verifica se a sessão de detalhes contém um heading h2 com o texto Summary', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const details = screen.getByRole('heading', { name: 'Summary' });
    expect(details.tagName).toBe('H2');
  });

  it('Verifica se contém um paragrafo com snipose do pokémon', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const pTag = document.getElementsByTagName('p');
    const sentence = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
    expect(pTag[3].innerHTML).toBe(sentence);
  });

  it('Verifica se existe uma tag "h2" com Game Locations', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const gameLocal = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(gameLocal.tagName).toBe('H2');
  });

  it('Verfica se as localizações do Pokémon são mostradas', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const pokeLocal = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(pokeLocal).toBeInTheDocument();
  });

  it('Verifica se é exibido o nome do local do mapa', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const piLocal = screen.getAllByAltText('Pikachu location');
    const kFlorest = screen.getByText('Kanto Viridian Forest');
    const kPlant = screen.getByText('Kanto Power Plant');
    expect(piLocal[0]).toBeInTheDocument();
    expect(piLocal[1]).toBeInTheDocument();
    expect(kFlorest.innerHTML).toBe('Kanto Viridian Forest');
    expect(kPlant.innerHTML).toBe('Kanto Power Plant');
  });

  it('Verifica se a localização tem um atributo src', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const pichakuLocal = screen.getAllByAltText('Pikachu location');
    expect(pichakuLocal[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(pichakuLocal[1].src).toBe(pokemons[0].foundAt[1].map);
  });

  it('Verifica se tem "alt"', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const textoAlt = screen.getAllByAltText('Pikachu location');
    expect(textoAlt[0]).toBeInTheDocument();
    expect(textoAlt[1]).toBeInTheDocument();
  });

  it('Verifica se a pagina tem um checkbox que permite favoritar', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.type).toBe('checkbox');
  });

  it('Verifica se clicar alterna em adicionar e remover', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    const checkbox = screen.getByRole('checkbox');
    if (checkbox.checked) fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const favoritado = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritado).toBeInTheDocument();
  });

  it('Verifica se a label contem o texto do polemon favoritado', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const favoLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoLabel.type).toBe('checkbox');
  });
});
