const express = require('express');

const productsService = require('./services/product.service');

const router = express.Router();
const service = new productsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Este es un endpoint Selectivo de FILTER');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await service.findOne(id);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const answer = await service.delete(id);
  res.json(answer);
});

module.exports = router;
