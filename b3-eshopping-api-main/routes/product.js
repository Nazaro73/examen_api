const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Product, Tag } = require('../models/index');

router.get('/', function(req, res){
    Product.findAll().then(product => {
        res.json(product);
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
  
  
  
  router.post('/post', async (req, res) => {
          
    try {
      const { title, price, description, stock, tagId } = req.body;
  
      // Créez une nouvelle tâche dans la base de données
      const product = await Product.create({
        title,
        price,
        description,
        stock,
        tagId,
      });
  
      
  
      // Réponse avec la tâche créée
      res.status(201).json(product);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
    }
  });
  
  router.patch('/products/:productId',async function(req, res) {
    try {
        const product = await Product.findByPk(req.params.productId);
        if (!product) {
            res.status(404).json({ error: 'Tâche non trouvée' });
            return;
          }
        await product.update(req.body);
        res.json({message: 'Product updated'});
    } catch (exception) {
        console.error(exception);
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
  
  router.delete('/products/:productId', async function(req, res) {
    try {
      const productId = req.params.productId;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        res.status(404).json({ error: 'Tâche non trouvée' });
        return;
      }
  
      await product.destroy();
      res.json({ message: 'Product deleted' });
    } catch (exception) {
      console.error(exception);
      res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
    }
  });
  
  module.exports = router;