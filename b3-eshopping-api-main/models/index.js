const sequelize = require('./_database');

// Importation des models
const Product = require('./Product');
const Role = require('./Role');
const User= require('./User');
const Order= require('./Order');
const ProdOrder= require('./ProdOrder');
const Tag= require('./Tag');
// Déclaration des relations
// ...
Role.hasMany(User);
User.belongsTo(Role);

Tag.hasMany(Product);
Product.belongsTo(Tag);

User.hasOne(Order);
Order.belongsTo(User);

Order.belongsToMany(Product,{through:ProdOrder});
Product.belongsToMany(Order,{through:ProdOrder});
// Synchronisation de la base
sequelize.sync({alter: true});


module.exports = {
    Product: Product,
    Role: Role,
    User: User,
    Order: Order,
    Tag: Tag,
    ProdOrder: ProdOrder,
}
