const express = require('express');
const users = require('../controllers/users');
const products = require('../controllers/products');
const categories = require('../controllers/categories');
const authorization = require('./middlewares/authorization');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+path.extname(file.originalname));
    }
  });

  const upload = multer({
      storage
});

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