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

    app.get('/read', async (req, res) => {
        
        const { rows } = await client.query('select * from DatosRaspberry');
        res.send(rows);
    });

    app.post('/create', async (req, res) => {
        const {CurrentTime, Light, AirHumidity, Temperature, Pump} = req.body
        client.query(`INSERT INTO DatosRaspberry (CurrentTime, Light, AirHumidity, Temperature, Pump) VALUES('${CurrentTime}', ${Light} , ${AirHumidity} , ${Temperature} , '${Pump}')`)
        res.send('NUEVOS DATOS CREADOS')
    });

    app.listen(port, () =>{
        console.log(`Example app listening on port ${port}`)
    })