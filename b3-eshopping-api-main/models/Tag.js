const sequelize = require('./_database');
const {DataTypes}= require('sequelize');

const Tag = sequelize.define('tag', {
    // Définition des colonnes ici
    title:{
        type:DataTypes.STRING,
    },
})

module.exports = Tag;