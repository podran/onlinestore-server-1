const express = require('express');
const users = require('../controllers/users');
const products = require('../controllers/products');
const categories = require('../controllers/categories');
const authorization = require('./middlewares/authorization');
const multer = require('multer');
const upload = multer({dest: 'public'})

const apiRouter = express.Router();

apiRouter.get('/user', users.all);
apiRouter.put('/user', users.create);
apiRouter.post('/user/login', users.login);
apiRouter.get('/user/me', authorization, users.me);

apiRouter.get('/product', products.all);
apiRouter.get('/product/:id', products.getById);
apiRouter.put('/product', upload.single('image'), products.create);
apiRouter.post('/product/bulk', products.getByIds);

apiRouter.get('/category', categories.all);
apiRouter.put('/category', categories.create);
apiRouter.get('/category/:id/product', categories.products);



module.exports = apiRouter;