import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
    test('verifica se a página contém um h2 com um texto', () => {
        const { getByText } = renderWithRouter(<About />);
        const paragraph = getByText("About Pokédex");
        expect(paragraph).toBeInTheDocument();
    });
    test('verifica se a página contém uma imagem', () => {
        const { getByAltText } = renderWithRouter(<About />);
        const image = getByAltText("Pokédex");
        expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
