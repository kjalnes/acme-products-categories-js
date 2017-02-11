const router = require('express').Router();
const db = require('../db');

//use ES6

// - GET /categories
router.get('/', function(req, res, next) {
   var categories = db.getCategories();
   res.render('categories', {
      categories : categories,
      stringifyCategories : JSON.stringify(categories, null, 2)
    });
});

// - POST /categories
router.post('/', function(req, res, next){
   var newCategory = req.body.name;
   db.insertCategory(newCategory);
   res.redirect('/categories');
});

// - DELETE /categories/:id
router.delete('/:id', function(req, res, next) {
    // params is anything after colon :
    var id = req.params.id * 1;
    db.deleteCategory(id);
    res.redirect('/categories');
});

// - GET /categories/:id
router.get('/:id', function(req, res, next){
  var id = req.params.id * 1;
  var category = db.getCategory(id);
  res.render('category', {
      category : category,
      stringifyProducts : JSON.stringify(category, null, 2)
  });
});

// - POST /categories/:categoryId/products
router.post('/:id/products', function(req, res, next){
  var categoryId = req.params.id * 1;
  var newProduct = req.body.name;
  db.insertProduct(categoryId, newProduct);
  res.redirect('/categories/' + categoryId);
});

// - DELETE /categories/:categoryId/products/:id
router.delete('/:id/products/:productId', function(req, res, next) {
  var catId = req.params.id * 1;
  var productId = req.params.productId * 1;
  db.deleteProduct(catId, productId);
  res.redirect('/categories/' + catId);
});

module.exports = router;
