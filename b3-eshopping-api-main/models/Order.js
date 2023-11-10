const sequelize = require('./_database');
const {DataTypes}= require('sequelize');

const Order = sequelize.define('order', {
    // Définition des colonnes ici
    due_date:{
        type:DataTypes.DATE,
    },
    
    
})



module.exports = Order