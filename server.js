const express = require('express');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');
const categoriesDB = require('./db');
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
    noCache: true
});

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }));
// method-override middleware converts POST req to DELETE req
app.use(methodOverride("_method"));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// req for home page
app.get('/', function(req,res,next) {
    res.render('index');
});

// for all category related requests
const categoryRoutes = require('./routes/categories');
app.use('/categories', categoryRoutes);

const port = process.env.PORT || 3001
app.listen(port, function(){
    console.log('listening on port ' + port);
});
