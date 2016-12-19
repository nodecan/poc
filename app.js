'use strict';
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const url  = require('url');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/fetch_stock.json',function(req,res,send){
    console.log(JSON.stringify(req));
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;
    let shop = query.shop;
    let sku = query.sku;
    let stock = {
                    "10019" : 100,
                    "10001111" : 999
                };
  
    res.setHeader('Content-Type', 'application/json');
    if (shop === "node1.myshopify.com"){
        let inventoryLevel={};
        //if(sku == undefined){
        if(Object.keys(query).length ===1){
            inventoryLevel = stock;
        }
        else if(sku!==undefined){
            Object.keys(stock)
             .filter(p => p.match(sku))
             .forEach(p=>{
                 inventoryLevel = {
                     [p] :  stock[p]
                 };
             });
            
            
        }
        else{
            inventoryLevel = {};
        }
            res.send(inventoryLevel);
    }
    res.end();
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

let port = process.env.PORT||3000;

app.listen(port,function(req,res){
    console.log("catch the request at localhost:"+port);
});

module.exports = app;