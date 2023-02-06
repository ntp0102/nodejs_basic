import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config(); //khai bao file .env

const app = express();
const port = process.env.PORT || 8080; // truong hop ko doc dc .env se chon 8080

configViewEngine(app);

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.get('/about', (req,res) => {
    res.send(`I'm NTP`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})