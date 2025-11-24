import express from 'express';
import cors from 'cors';
import { pokemonRoutes } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/pokemon', pokemonRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🐳 Docker Pokémon API is running!' });
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
