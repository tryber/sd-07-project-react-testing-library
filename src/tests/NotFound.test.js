import React from 'react';
import { getByText, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound', () => {
    it('Teste se página contém um heading h2', () => {
      const { getByRole } = render(<NotFound />);
      const tagH2 = getByRole('heading', { name: /Page requested not found/i});
      expect(tagH2.tagName).toBe('H2');
    });
    test('Teste se página mostra a imagem ', () => {
      const { getAllByRole } = render(<NotFound />);
      const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const img = getAllByRole('img');
      expect(img[1].src).toBe(src);
    });
});