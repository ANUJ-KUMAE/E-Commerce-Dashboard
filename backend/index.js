const express = require('express');
const mongoose = require('mongoose')

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';


const cors = require('cors')
require('./Connection/CreateConnection')

const user = require('./Connection/Config');
const addProduct = require('./Connection/Products')

const app = express();
app.use(cors())

app.use(express.json());

app.post('/register', async (req, resp) => {
    let data = new user(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    console.log("done")
    resp.send(result);
})

app.post('/login', async (req, resp) => {
    //console.log(req.body);
    if(req.body.password && req.body.email)
    {
        let result = await user.findOne(req.body).select("-password");
        if(result)
        {
            resp.send(result);
        }
        else
        {
            resp.send({User:'No User Found'});
        }
    }
    else
    {
        resp.send({User:'No User Found'})
    }
})

app.post('/add-products', async (req, resp) => {
    let data = new addProduct(req.body)
    let result = await data.save();
    resp.send(result)
})

app.get('/product', async (req,resp) => {
    let products = await addProduct.find()
    if(products.length > 0)
    {
        resp.send(products)
    }
    else
    {
        resp.send({result:"No Data Found"})
    }
})

app.delete('/product/:id', async (req, resp) => {
    const result = await addProduct.deleteOne({_id:req.params.id})
    resp.send(result)
})

app.get('/updateproduct/:id', async (req, resp) => {
    const result = await addProduct.findOne({_id:req.params.id})
    if(result)
    {
        resp.send(result);
    }
    else
    {
        resp.send({result:'No data found'})
    }
})

app.put('/updateProduct/:id', async (req, resp) => {
    const result = await addProduct.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result);
})

app.get('/search/:key', async (req, resp) => {
    const result = await addProduct.find({
        "$or" : [
            {name: {$regex: req.params.key}},
            {category : {$regex: req.params.key}},
            {company: {$regex: req.params.key}}
        ]
    });
    resp.send(result);
})

app.listen(5000)