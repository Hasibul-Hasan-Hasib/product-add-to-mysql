const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mysql = require("mysql");
const port = process.env.PORT || 3100;


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


app.post('/add', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    db.query(`INSERT INTO product (Name, Description) value (?,?)`, [name,description],
        (error, result) => {
            error ? console.log(error) : res.send("value added")
        });
});

app.get('/products',(req,res)=>{
    db.query("SELECT * FROM product",(err,result)=>{
        err ? console.log(err):res.send(result)
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})