// Configuration de express
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Lecture du fichier .env
require('dotenv').config()

// Lecture du fichier models/index.js afin de lancer la synchronisation de Sequelize
require('./models/index.js');

// Importation des routeurs
const indexRouter = require('./routes/index.js');
const productRouter = require('./routes/product.js');
const userRouter = require('./routes/user.js');
const adminRouter = require('./routes/admin.js');
const orderRouter = require('./routes/order.js');
const { authenticateAdmin } = require('./routes/');
const authadmin = require('./middlewares/authadmin.js');
const { authenticateUser } = require('./routes/');
const authuser = require('./middlewares/authuser.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use(authuser.authenticateUser)
app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/order', orderRouter)
app.use(authadmin.authenticateAdmin)
app.use('/product', productRouter)




module.exports = app;
