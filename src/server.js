import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebroute from './routes/web';
import initAPIRoute from './routes/api';
// import connection from './configs/connectDB'


require('dotenv').config(); //khai bao file .env

const app = express();
const port = process.env.PORT || 8080; // truong hop ko doc dc .env se chon 8080

app.use(express.urlencoded({ extended: true})); // gian luot hoa cac thong so gui len server
app.use(express.json());


//setup viewEngine
configViewEngine(app);
//init web route
initWebroute(app);

initAPIRoute(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})