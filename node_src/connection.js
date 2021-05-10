var MongoClient = require('mongodb').MongoClient;
var config = require("./config")

const connect = () => {

  var db_client;
  var db_connection;

  return new Promise((resolve, reject) => {

    MongoClient.connect(config.mongodb.url, function (err, client) {
      if (err) {
        reject(err)
      }

      db_client = client;
      db_connection = client.db('RPInventory')
      resolve({ db_client, db_connection })
    });

  })
}


module.exports = connect


