import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom'
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testing About.js', () => {
    
    
    test('testing if the page has all infos about Pokedex', () => {
    const { getByText, history } = renderWithRouter(<About />);

    const infosPokedex = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
    expect(infosPokedex).toBeInTheDocument();
    });

    test('testing if About.js has a tag h2 with About Pokédex', () => {
        const { container } = renderWithRouter(<About />);

        const tag = container.querySelector('h2');
        const tagConfirm = container.querySelector('h2').innerHTML;
    expect(tagConfirm).toBe('About Pokédex');
    });
});
