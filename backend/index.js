import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: "OOOOOOOO, looks like I'm Working 🐳⛴️⚓️" });
});

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
