const sequelize = require('./_database');
const {DataTypes}= require('sequelize');

const Product = sequelize.define('Product', {
    // Définition des colonnes ici
    title:{
        type:DataTypes.STRING,
    },
    price:{
        type:DataTypes.FLOAT,
    },
    description:{
        type:DataTypes.TEXT,
    },
    stock:{
        type:DataTypes.INTEGER,
    },
    
})



module.exports = Product