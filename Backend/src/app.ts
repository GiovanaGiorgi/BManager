import cors from 'cors';
import express from 'express';
import { produtoRoutes } from './modules/produtos/produtos.router.js';
import { categoriaRoutes } from './modules/categoria/categoria.router.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/produtos', produtoRoutes);

app.use(express.json());
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);


export default app;