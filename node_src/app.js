
const express = require('express')
const app = express()

let connect = require("./connection.js")
let config = require("./config.js")

app.get('/', function (req, res) {
  res.send('Hello World!')

})

app.get('/todo', async (req, res) => {

  let {db_client, db_connection} = await connect()

  db_connection.collection('todo').find({}).toArray((err, result) => {
    if(err) return console.log(err)

    console.log('todo :', result)

    db_client.close()
    res.send(result)

  })
})

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

