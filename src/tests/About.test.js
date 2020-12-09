import React from 'react';
import { render, screen } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import { createMemoryHistory } from 'history';
import Router from 'react-router-dom'
import About from '../components/About';

describe('testing About.js', () => {
    test('testing if the page has all infos about Pokedex', () => {

    const history = createMemoryHistory();
    const { getByText } = render(
        <Router history={ history }>
            <About />
        </Router>
    );
    const infosPokedex = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
    expect(infosPokedex).toBeInTheDocument();
    });

    test('', () => {
        renderWithRouter(<About />);
        const tag = document.querySelector('h2');
        expect(tag.tagName).toBe('h2');
        expect(tag.innerHTML).toBe('About Pokédex');
    });
});
