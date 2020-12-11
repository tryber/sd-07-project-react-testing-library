import React from 'react';
import { getAllByAltText, render } from '@testing-library/react';
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
        const { container, history } = renderWithRouter(<About />);

        const tag = container.querySelector('h2');
        const tagConfirm = container.querySelector('h2').innerHTML;
        expect(tagConfirm).toBe('About Pokédex');
    });

    test('verify if there is two paragraphs', () =>{
        const { getByTestId } = renderWithRouter(<About />);

        const p1 = getByTestId(/paragraph1/);
        const p2 = getByTestId(/paragraph2/);
        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
    });

    test('test if /About has an especific image', () => {
        const { getByAltText } = renderWithRouter(<About />);

        const imageOfPokedex = getByAltText(/Pokédex/i);
        expect(imageOfPokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
