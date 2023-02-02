require('dotenv').config()

const { request } = require('express');
const express = require('express')

const bodyParser = require("body-parser");

const path = require('path');

const router = express.Router();
const app = express()

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.POSTGRESURI,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect();

app.get('/master',(req,res)=>{
    res.send('Inicial')
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})