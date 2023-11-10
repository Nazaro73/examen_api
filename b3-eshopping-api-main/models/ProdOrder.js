const sequelize = require('./_database');
const {DataTypes}= require('sequelize');

const ProdOrder = sequelize.define('prodOrder', {
    // Définition des colonnes ici
    quantity:{
        type:DataTypes.INTEGER,
    },
    
    
})



module.exports = ProdOrder