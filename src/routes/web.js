import express from 'express';
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);  // chuyen sang controller xu ly truoc
    
    router.get('/about', (req,res) => {
        res.send(`I'm NTP`)
    })

    return app.use('/', router)   //tiền tố mặc định của website, ở đây là không dùng gì cả, vidu /api/version
}

module.exports = initWebRoute;