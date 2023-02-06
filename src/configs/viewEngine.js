import express from "express"

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");      // cau hinh duoi ejs
    app.set("views", "./src/views")  // dia chi chua cac file su dung
}

export default configViewEngine;