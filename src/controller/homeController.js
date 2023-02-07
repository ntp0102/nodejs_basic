import connection from "../configs/connectDB"


let getHomepage = (req,res) => {
    //logic
    connection.query(
        'SELECT * FROM `users` ',
        function(err, results, fields) {
          console.log('>>> Check mysql');
          console.log(results); // results contains rows returned by server
          console.log(results[0]); // results contains rows returned by server
          
          return res.render('index.ejs', {dataUser: JSON.stringify(results) })
        }
      );
}

module.exports = {
    getHomepage
}