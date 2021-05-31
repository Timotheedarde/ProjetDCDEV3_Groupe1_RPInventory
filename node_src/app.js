
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
  resave: true,
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
//ITEMS
//Récupere TOUS les items (Global)
app.get("/items", async(req,res)=>{
  try {
    let { db_client, db_connection } = await connect();
    db_connection
        .collection('items')
        .find()
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("items :", result);

          db_client.close();
          res.send(result);
        });

  } catch (e) {
    res.status(500);
    res.send("Server error");
  }

});

//Récupere 1 item en particulier, ID en parametre (En global)
app.get("/item/:id", async(req,res)=>{
  let idItem = req.params.id;
  //console.log(idItem)
  try {
    let { db_client, db_connection } = await connect();
    db_connection
        .collection('items')
        .find(
            {_id: ObjectId(idItem)}
        )
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("item :", idItem , result);

          db_client.close();
          res.send(result);
        });

  } catch (e) {
    res.status(500);
    res.send("Server error");
  }
});


//Ajoute un Item selon Le personnage et le user
app.post("/items/:id_personnage", verifySession, async (req, res, next) => {

  //1 find si le personnage appartient à l'utilisateur connecté findOne sur id du personnage
  //2 inserer l'item en base avec ses caracteristiques
  //3 modifier la liste d'id du personnage en y ajoutant l'id de l'item nouvellement crée.

  const session = client.startSession();
  // Step 2: Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
  try {
    await session.withTransaction(async () => {
      const coll1 = client.db('mydb1').collection('foo');
      const coll2 = client.db('mydb2').collection('bar');
      // Important:: You must pass the session to the operations
      await coll1.insertOne({ abc: 1 }, { session });
      await coll2.insertOne({ xyz: 999 }, { session });
    }, transactionOptions);
  } finally {
    await session.endSession();
    await client.close();
  }


  try {
    let { db_client, db_connection } = await connect();

    const userId = req.session.userId;

    db_connection
        .collection("items")
        .insertOne(req.body)
        .then((result) => {
          console.log("result : ", result);
          res.send(result.insertedId);
        })
        .catch((err) => {
          next(err);
        });
  } catch (err) {
    res.status(500);
    res.send("Server Error");
  }
});



//Modifie un item par id
app.post("/item/:id",  async (req, res, next) => {

  console.log("update");
  console.log(req.params.id)
  console.log(req.body)

  let { db_client, db_connection } = await connect();

  try {
    let result = await db_connection
        .collection("items")
        .updateOne(
            {_id: ObjectId(req.params.id)},
            {
              $set: req.body
            }
        )
    if(result.matchedCount === 0) {
      next({code: 400, message: "No items was updated, id doesn't exist"})
    } else {
      res.send("ok")
    }
  } catch(err) {
    console.log(err);
    next(err)
  }
})

//Supprime TOUS les items en global
app.delete("/items/",  async (req, res, next) => {
  let { db_client, db_connection } = await connect();

  try {
    let result = await db_connection
        .collection("items")
        .deleteMany({})

    res.send("ok")
  } catch(err) {
    console.log(err);
    next(err)
  }
})

//Supprime Item par ID
app.delete("/items/one/:id",  async (req, res, next) => {
  console.log("one")

  let { db_client, db_connection } = await connect();

  try {
    let result = await db_connection
        .collection("items")
        .deleteOne({_id: ObjectId(req.params.id)})

    if(result.deletedCount === 0) {
      next({code: 400, message: "No task was deleted"})
    } else {
      res.send("ok")
    }
  } catch(err) {
    console.log(err);
    next(err)
  }
})

/*************************************************/
/*************************************************/
/*************************************************/
/*************************************************/

//Récupère la liste des users

/*app.get("/auth/users", async (req, res) => {
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
});*/

//S'enregistrer
app.post("/auth/signup", async (req, res) => {

  let newUser = req.body;
  console.log(newUser)

  try {
    let { db_client, db_connection } = await connect();

    try {
      let user = await db_connection
          .collection("users")
          .findOne({ username: newUser.username });

      if (user) {
        throw new Error("User already exists");
      }

      newUser.password = await bcrypt.hash(newUser.password, 10);

      await db_connection.collection("users").insertOne(newUser);

      res.send("User successfuly signed up");
      console.log("singup ok");
    } catch (err) {
      res.status(400);
      res.send(err.message);
      console.log(err.message);
    }
  } catch (err) {
    res.status(500);
    console.log("Server error");
    res.send("Server error");
  }
});

//se connecter
app.post("/auth/login", async (req, res) => {
  try {
    const loginData = req.body;

    let { db_client, db_connection } = await connect();

    let user = await db_connection
        .collection("users")
        .findOne({ username: loginData.username });
    try {
      if (!user) {
        throw new Error("Invalid username");
      }

      const samePassword = await bcrypt.compare(
          loginData.password,
          user.password
      );

      if (!samePassword) {
        throw new Error("Invalid password");
      }

      req.session.userId = user._id;
      req.session.loggedIn = true;

      res.send("Logged in");
    } catch (err) {
      res.status(403);
      console.log(err.message);
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});

//Verifier si utilisateur est authentifié
app.get("/auth/check", verifySession, (req, res) => res.send("Authenticated"));

//deconnexion / fin session
app.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send("An error occured while logging out");
    } else {
      console.log("Logged out");
      res.send("Logged out");
    }
  });
});


/*************************************************/
/*************************************************/
/*************************************************/
/*************************************************/

//Récupère la liste de personnages d'un user particulier
app.get("/personnages/", verifySession, async (req, res) => {
  try {
    const userId = req.session.userId;

    let { db_client, db_connection } = await connect();
    db_connection

        .collection("personages")
        .find({ created_by: ObjectId(userId) })
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("personnages :", result);

          db_client.close();
          res.send(result);
        });
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});


//Ajoute un Personnage dans la BDD (avec username de session)

app.post('/personnage',verifySession, async (req,res)=>{

  try {
    const userId = req.session.userId;
    req.body.created_by = ObjectId(userId);
    req.body.carry_actual = 0;
    req.body.inventory_list = [];
    let newPersonage = req.body;
    //console.log(personage_Obj);
    let {db_client, db_connection} = await connect()

    try {
      let personage_Exist = await db_connection.collection("personages").findOne({name: newPersonage.name, created_by:ObjectId(userId)});
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

    const userId = req.session.userId;

    let result = await db_connection.collection("personages").updateOne(
        { _id: ObjectId(req.params.id), created_by: ObjectId(userId) },
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
app.delete("/personnage/one/:id", verifySession, async (req, res, next) => {
  console.log("one");

  let { db_client, db_connection } = await connect();

  try {

    const userId = req.session.userId;
    console.log(userId)
    console.log(req.params.id)
    let result = await db_connection
        .collection("personages")
        .deleteOne({ _id: ObjectId(req.params.id), created_by: ObjectId(userId)});
    console.log(result)
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
app.delete("/personnages/many/:status", verifySession, async (req, res, next) => {
  let { db_client, db_connection } = await connect();

  console.log("many");

  try {
    const userId = req.session.userId;

    let filter = {created_by: ObjectId(userId)}; //all

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

          let result = await db_connection.collection("personages").deleteMany(filter);
        });

    res.send("ok");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Récupere l'attribut liste d'id_items d'un personnage
app.get("/personnage_inventory/:id", /*verifySession,*/ async (req, res) => {
  const idPersonage = req.params.id
  //console.log(idPersonage);
  try {
    let { db_client, db_connection } = await connect();
    db_connection
        .collection("personages")
        .find(
            {_id: ObjectId(idPersonage)}
        )
        .toArray((err, result) => {
          if (err) return console.log(err);

          console.log("Inventaire du personage :", result[0].items_id_list);

          db_client.close();
          res.send(result[0].items_id_list);
        });
  } catch (err) {
    res.status(500);
    res.send("Server error");
  }
});

//Mettre à jour Personnage suivant ID

app.post("/personnage_inventory/:id", verifySession, async (req, res, next) => {
  //console.log("update");
  //console.log(req.params.id);
  //console.log(req.body);

  try {
    let { db_client, db_connection } = await connect();

    let result = await db_connection.collection("personages").updateOne(
        { _id: ObjectId(req.params.id) },
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










/**************************************/
app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port} !`);
});
