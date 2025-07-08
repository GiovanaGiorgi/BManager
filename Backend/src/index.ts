import app from './app.js';
import prisma from './config/database.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});