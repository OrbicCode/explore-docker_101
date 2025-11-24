import express from 'express';
import { getTenPokemon } from './controllers.js';

export const pokemonRoutes = express.Router();

pokemonRoutes.get('/get-ten', getTenPokemon);
