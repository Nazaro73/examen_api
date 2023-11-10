const express = require('express');
const router = express.Router();

// Importation d'un modèle Sequelize dans une vue.
// Par défaut, require ira chercher le fichier index.js
const { Order } = require('../models/index');
router.post('/sign', async (req, res) => {
        
    
        
        try {
            const { due_date, userId} = req.body;
            
             // Créez une nouvelle tâche dans la base de données
            const order = Order.create({              
            due_date,
            userId,	

            });
            
            
        
            // Réponse avec la tâche créée
            res.status(201).json(order);
            res.status
          } catch (error) {
            console.error('Erreur lors de la creation de la commande :', error);
            res.status(500).json({ error: 'Erreur lors de la création de la commande' });
          }
    });

    
  

module.exports = router;

