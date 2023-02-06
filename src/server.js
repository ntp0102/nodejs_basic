import express from 'express';
import configViewEngine from './configs/viewEngine';
require('dotenv').config(); //khai bao file .env
import initWebroute from './routes/web'

const app = express();
const port = process.env.PORT || 8080; // truong hop ko doc dc .env se chon 8080

//setup viewEngine
configViewEngine(app);
//init web route
initWebroute(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})