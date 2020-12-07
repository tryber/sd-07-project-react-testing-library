import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('segundo requisito', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = getByText('About');
    fireEvent.click(about);
    const h2 = getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = getByText('About');
    fireEvent.click(about);
    const p1 = getByText(
      `This application simulates a Pokédex, a
      digital encliclopedia containing all Pokémons`,
    );
    const p2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText, getByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const about = getByText('About');
    fireEvent.click(about);
    const imgAlt = getByAltText('Pokédex');
    expect(imgAlt).toBeInTheDocument();
  });
});
