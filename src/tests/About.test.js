import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Teste da tela App', () => {
    it('',()=>{
    const { getByText, history } = renderWithRouter(<App />);
    })
});
