import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebroute from './routes/web';
import connection from './configs/connectDB'


require('dotenv').config(); //khai bao file .env

const app = express();
const port = process.env.PORT || 8080; // truong hop ko doc dc .env se chon 8080


//setup viewEngine
configViewEngine(app);
//init web route
initWebroute(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})