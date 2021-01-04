import React from 'react';
import { cleanup } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import RenderWithRouter from './RenderWithRouter';

afterEach(cleanup);

const pokemon = {
  id: 25,
  name: 'pikachu',
  type: 'electric',
  averageWeight: { value: '6', measurementUnit: 'kg' },
  image: 'pikachu-image',
  foundAt: [{ location: 'locale', map: 'anywhere' }],
  summary: 'A pokemon',
};
  {
    id: 2,
    averageWeight: { value: '95', measurementUnit: 'kg' },
    name: 'Rapidash',
    type: 'Fire',
  },
];