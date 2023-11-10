const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

/* Route de test */
router.get('/', async function(req, res) {
    
 await User.findAll().then(user => {
    res.json(user);
});
});

function generateToken(id) {
    return jwt.sign({ id: id }, process.env.SECRET_TOKEN, { expiresIn: '10h' });

}

router.post('/sign', async (req, res) => {
        
    bcrypt.hash(req.body.password, 12).then(hashedPassword => {
        let password = hashedPassword;
        try {
            const { email,  display_name, roleId} = req.body;
            
             // Créez une nouvelle tâche dans la base de données
            const user = User.create({              
            email,
            display_name,
            password,
            roleId
            });
            
            
        
            // Réponse avec la tâche créée
            res.status(201).json(user);
            res.status
          } catch (error) {
            console.error('Erreur lors du sign :', error);
            res.status(500).json({ error: 'Erreur lors de la création du compte' });
          }
    });
  });

  router.post('/login', async (req, res) => {

    const user = await User.findAll({
        where: {
            email : req.body.email 
        }
    });

    

        if (user.lenght === 0) {
            res.send("email ou mdp incorresct");

        };
        const users = user[0];
        console.log(users.password);

        bcrypt.compare(req.body.password, users.password).then(isOk => {
            if (!isOk) {
                res.send("email ou mdp incorresct");
            } else {
                delete users.password;
                return res.json({
                    'token': generateToken(users.id),
                    'user': users,
                });

            }

        });
    });

    



module.exports = router;