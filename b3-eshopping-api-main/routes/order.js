const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Order } = require('../models/index');
const { Panier } = require('../models/index');




router.post('/create_order', async (req, res) => {
        
        try {
            const { due_date, userId, ProductId,quantity } = req.body;
            
             // Créez une nouvelle tâche dans la base de données
            const order = await Order.create({              
            due_date,
            userId,	

            });
            
            await order.addProduct( ProductId, { through: { quantity } });
            
            // Réponse avec la tâche créée
            res.status(201).json(order);
            res.status
          } catch (error) {
            console.error('Erreur lors de la creation de la commande :', error);
            res.status(500).json({ error: 'Erreur lors de la création de la commande' });
          }
    });

    
  

module.exports = router;

