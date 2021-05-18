
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
  credentials: true,
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
  saveUninitialized:false}));

app.use(cors(corsOptions));
app.use(express.json());

app.get('/',verifySession, function (req, res) {
  res.send(req.session.savedDocuments);
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
//Récupère la liste des users

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

//Ajouter un user dans la liste des users, controle si existe deja en BDD
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

//Fonction de login, creation de session avec le username / controle du mdp
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

      console.log(req.session.user_id)

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

//Fonction de logout, fin de session
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

//Récupère la liste de personnages d'un user particulier
app.get("/personges/user", /*verifySession,*/ async (req, res) => {
  try {
    const username = req.session.username;

    let { db_client, db_connection } = await connect();
    db_connection
        .collection("personages")
        .find({ created_by: username })
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("personages :", result);

          db_client.close();
          res.send(result);
        });
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});


//Ajoute un Personnage dans la BDD (avec username de session)

app.post('/personage/user',/*verifySession,*/ async (req,res)=>{

  try {
    const username = req.session.username;
    req.body.created_by = username;
    let newPersonage = req.body;
    //console.log(personage_Obj);
    let {db_client, db_connection} = await connect()

    try {
      let personage_Exist = await db_connection.collection("personages").findOne({name: newPersonage.name, created_by:username});
      if (personage_Exist) {
        throw new Error("Vous possédez déjà un personnage du même nom");
      }

      await db_connection.collection("personages").insertOne(newPersonage);

      res.send("Personnage Ajouté");
      console.log("Ajout de personage en BDD")
    }
    catch(err) {
      res.status(403);
      res.send("Invalid credentials");
    }
  }catch (err) {
    res.status(500);
    res.send("Server error");
  }

})

//Mettre à jour Personnage suivant username

app.post("/personnage/:id", verifySession, async (req, res, next) => {
  console.log("update");
  console.log(req.params.id);
  console.log(req.body);

  try {
    let { db_client, db_connection } = await connect();

    const username = req.session.username;

    let result = await db_connection.collection("personages").updateOne(
        { _id: ObjectId(req.params.id), created_by: username },
        {
          $set: req.body,
        }
    );
    if (result.matchedCount === 0) {
      next({ code: 400, message: "No personage was updated" });
    } else {
      res.send("ok");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send("Server error");
  }
});

//Delete 1 seul Personage suivant son id (avec username)
app.delete("/personage/one/:id", verifySession, async (req, res, next) => {
  console.log("one");

  let { db_client, db_connection } = await connect();

  try {

    const username = req.session.username;

    let result = await db_connection
        .collection("personnages")
        .deleteOne({ _id: ObjectId(req.params.id), created_by: username});

    if (result.deletedCount === 0) {
      next({ code: 400, message: "No task was deleted" });
    } else {
      res.send("ok");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Delete tous les personnages d'un user
app.delete("/personages/many/:status", verifySession, async (req, res, next) => {
  let { db_client, db_connection } = await connect();

  console.log("many");

  try {
    const username = req.session.username;

    let filter = {created_by: username}; //all

    if (req.params.status !== "all") {
      throw new Error("Operation does not exist");
    }

    db_connection
        .collection("personages")
        .find(filter)
        .toArray(async (err, documentsToBeDeleted) => {
          if (err) return next(err);

          console.log(documentsToBeDeleted);

          req.session.savedDocuments = documentsToBeDeleted;

          console.log(req.session);
          console.log(req.session.savedDocuments);

          let result = await db_connection.collection("tasks").deleteMany(filter);
        });

    res.send("ok");
  } catch (err) {
    console.log(err);
    next(err);
  }
});


/*************************************************/
//Récupère la liste des items (Tous ceux de la BDD)

app.get('/items', async (req, res) => {
  let {db_client, db_connection} = await connect()
  db_connection.collection('items').find({}).toArray((err, result) => {
    if(err) return console.log(err)
    db_client.close()
    res.send(result)
  })
})

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`)
})

