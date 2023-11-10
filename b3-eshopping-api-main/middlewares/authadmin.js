const { Console } = require('console');
var express = require('express');
var router = express.Router();
const jwt= require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');


// Ce fichier contient les middleware relatif à l'authentification
function authenticateAdmin( req, res, next){
    const bearerToken = req.get('Authorization'); // Récupérer le token de l'en-tête de la requête
        const token = bearerToken.split(" ")[1];
        
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
                const user = await User.findByPk(decoded.id);
                    
                if (user.roleId != 2) {
                    res.send("vous n'etes pas admin");
                } else {
                    next();
                }
    
    
            });
        } else {
            res.send("vous n'avez pas de token");
        }
}

module.exports = {
    'authenticateAdmin': authenticateAdmin,
};
