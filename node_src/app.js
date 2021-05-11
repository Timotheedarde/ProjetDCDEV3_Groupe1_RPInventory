
const express = require('express')
const app = express()

const session = require("express-session");
const bcrypt = require('bcrypt');


let connect = require("./connection.js")
let config = require("./config.js")

const cors = require("cors");
const { ObjectId } = require("mongodb");

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const verifySession = (req, res, next) => {
  if (req.session.loggedIn === true) {
    console.log("Logged in, you can proceed")
    next()
  } else {
    res.status(403);
    console.log("You must be authenticated to proceed")
    res.send("You must be authenticated")
  }
}


app.use(session({
  secret:'Keep it secret',
  name:'uniqueSessionID',
  resave:false,
  saveUninitialized:false}));

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')

})

/*app.get('/todo', async (req, res) => {

  let {db_client, db_connection} = await connect()

  db_connection.collection('todo').find({}).toArray((err, result) => {
    if(err) return console.log(err)

    console.log('todo :', result)

    db_client.close()
    res.send(result)

  })
})*/

/*************************************************/

app.get("/auth/users", async (req, res) => {
  try {
    let { db_client, db_connection } = await connect();
    db_connection
        .collection("users")
        .find()
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("users :", result);

          db_client.close();
          res.send(result);
        });
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});

app.get("/auth/user", async (req, res) => {
  let userExist = req.body;

  try {
    const options = {
      projection: { username: 1 },
    };
    let { db_client, db_connection } = await connect();

    try {
      let user = await db_connection
          .collection("users")
          .findOne({ username: userExist.username },options);

      if (user) {
        throw new Error("User already exists");
      }

      res.send("Username available");
      console.log("Username available")

    } catch (err) {
      res.status(400);
      res.send(err.message)
      console.log(err.message)

    }
  } catch (err) {
    res.status(500);
    console.log("Server error")
    res.send("Server error");
  }
});


app.post("/auth/signup", async (req, res) => {
  let newUser = req.body;

  try {
    let { db_client, db_connection } = await connect();

    try {
      let user = await db_connection
          .collection("users")
          .findOne({ username: newUser.username });

      if (user) {
        throw new Error("User already exists");
      }

      newUser.password = await bcrypt.hash(newUser.password, 10)

      await db_connection.collection("users").insertOne(newUser);

      res.send("User successfuly signed up");
      console.log("singup ok")

    } catch (err) {
      res.status(400);
      res.send(err.message)
      console.log(err.message)

    }
  } catch (err) {
    res.status(500);
    console.log("Server error")
    res.send("Server error");
  }
});

app.post("/auth/login", async (req, res) => {

  try {
    const loginData = req.body;

    let { db_client, db_connection } = await connect();

    let user = await db_connection.collection("users").findOne({username: loginData.username});
    try {
      if(!user) {
        throw new Error("Invalid username");
      }


      const samePassword = await bcrypt.compare(loginData.password, user.password);

      if(!samePassword) {
        throw new Error("Invalid password")
      }

      req.session.username = user.username;
      req.session.loggedIn = true;

      res.send("Logged in");

    } catch(err) {
      res.status(403);
      console.log(err.message);
      res.send("Invalid credentials")
    }

  } catch(err) {
    res.status(500);
    res.send("Server error");
  }


})

app.post('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      res.status(500);
      res.send("An error occured while logging out")
    } else {
      res.send("Logged out")
    }
  })
})


/*************************************************/


app.post('/personage',verifySession, async (req, res) => {
  let {db_client, db_connection} = await connect()
  db_connection.collection('personage').find({}).toArray((err, result) => {
    if(err) return console.log(err)
    db_client.close()
    res.send(result)
  })
})

app.get('/inventory',verifySession, async (req, res) => {
  let {db_client, db_connection} = await connect()
  db_connection.collection('inventory').find({}).toArray((err, result) => {
    if(err) return console.log(err)
    db_client.close()
    res.send(result)
  })
})

app.get('/item',verifySession, async (req, res) => {
  let {db_client, db_connection} = await connect()
  db_connection.collection('item').find({}).toArray((err, result) => {
    if(err) return console.log(err)
    db_client.close()
    res.send(result)
  })
})

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

