var _categoryCollection = [
    {
      "id" : 1,
      "name" : "Food",
      "products": [
          {
              "id" : 1,
              "name" : "pizza"
          }
      ]
    }
];

module.exports = {
    getCategories : function() {
        return _categoryCollection;
    },
    getCategory : function(id) {
        return this.getCategories().filter(function(category){
            return category.id === id;
        })[0];
    },
    insertCategory : function(newCatName) {
        this.getCategories().push({
            id: this.getNextId(this.getCategories()),
            name: newCatName,
            products : []
        });
    },
    deleteCategory : function (id) {
        var index = this.getCategories().indexOf(this.getCategory(id));
        this.getCategories().splice(index, 1);
    },
    insertProduct : function (catId, productName) {
        var products = this.getCategory(catId).products;
        products.push({
            id: this.getNextId(products),
            name: productName
        });
    },
    deleteProduct : function (catId, prodId) {
        var categoryProducts = this.getCategory(catId).products;
        var product = categoryProducts.filter(function(product){
            return product.id === prodId;
        })[0];
        var index = categoryProducts.indexOf(product);
        categoryProducts.splice(index, 1);
    },
    getNextId : function(arr) {
        var max = arr.reduce(function(prev, curr){
            if(curr.id > prev){
                prev = curr.id;
            }
            return prev;
        }, 0);
        return ++max;
    }
};
