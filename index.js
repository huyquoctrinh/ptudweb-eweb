const express = require('express');
const app = express();
const expressHandleBars = require('express-handlebars');
const {createStarList} = require('./controllers/handlebarsHelper');
const {createPagination} = require('express-handlebars-paginate');

const port = process.env.port || 5000; 

app.use(express.static(__dirname + '/public'));

app.engine('hbs', expressHandleBars.engine({

    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',

    extname: 'hbs',
    defaultLayout: 'layout',

    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        createStarList,
        createPagination
    }
}));
app.set('view engine', 'hbs');

app.use('/', require('./routes/indexRoute'));
app.use('/products', require('./routes/productsRouter'));

app.listen(port, () => {
    console.log(`server is running on ${port}`)
});