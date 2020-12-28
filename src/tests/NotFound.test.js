import React from 'react';
import renderWhitRouter from '../RenderWhitRouter';
import {NotFound} from '../components'


describe ('Testing not found page', () => {
    test ('Displays a "page request not found" text', () => {
        const {getByText, getByRole} = renderWhitRouter(<NotFound/>);
        const heading = getByRole('heading');
        expect(heading).toBeInTheDocument();

        const mesage = getByText(/Page requested not found/i);
        expect(mesage).toBeInTheDocument();
    });

    test('Testing show picture in the page', () => {
        const {getByRole, container} = renderWhitRouter(<NotFound />);
        const image = getByRole('img', { name:/Pikachu crying because the page requested was not found/i});
        expect(image).toBeInTheDocument();

        const ImageSrc = container.querySelector('.not-found-image').src;
        expect(ImageSrc).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});