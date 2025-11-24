import express from 'express';
import cors from 'cors';
import { pokemonRoutes } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/pokemon', pokemonRoutes);

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
