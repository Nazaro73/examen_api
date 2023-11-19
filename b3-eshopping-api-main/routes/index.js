const express = require('express');
const router = express.Router();
const { Product, Tag } = require('../models/index');
const { Op } = require('sequelize');
/* Route de test */
router.get('/', function(req, res) {
  
  
  Product.findAll().then(product => {
    if (product.stock != 0){
      res.json(product);
    }
    
});
});

router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Recherchez la tâche par ID dans la base de données
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({ error: 'Tâche non trouvée' });
      return;
    }

    // Réponse avec la tâche trouvée
    res.status(200).json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche par ID :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la tâche' });
  }
});

router.get('/filtered/:idTag',async function(req, res) {
  const tagId = req.params.idTag;
  const tag = await Tag.findByPk(tagId);
  await tag.getProducts()
    .then((products) => {
      // Affichez les produits associés au tag
      res.json(products);
})
  
})








module.exports = router;
