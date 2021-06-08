
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

//Récuperer les items de la liste d'un personnage.
app.get("/items/:id_personnage",verifySession, async(req,res, next)=>{

  const userId = req.session.userId;
  const personnageId = req.params.id_personnage;

  let { db_client, db_connection } = await connect();

  const session = db_client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  try {
    await session.withTransaction(async () => {

      //1
      let personnage = await db_connection
          .collection("personages")
          .findOne({"_id":ObjectId(personnageId),created_by: ObjectId(userId) })

          let listItemsId = personnage.inventory_list;
          console.log("liste itemsId :", listItemsId);

      //2
      await db_connection
          .collection('items')
          .find({"_id":{$in : listItemsId}})
          .toArray((err, result) => {
            if (err) return console.log(err);

            console.log("inventaire :", result);
          });

    }, transactionOptions);
    res.send("ok");
  }catch (e) {
    next(e);
  }finally {
    await session.endSession();
    await db_client.close();
  }



});


//Récupere 1 item en particulier, ID en parametre (En global)
app.get("/item/:id",verifySession, async(req,res)=>{

  const userId = req.session.userId;
  const itemId = req.params.id;

  let { db_client, db_connection } = await connect();
  try {
    let item = await db_connection
        .collection("items")
        .findOne({ _id:ObjectId(itemId) ,created_by: ObjectId(userId) });
    if (!item) {
      throw new Error("Impossible de récuperer cet item");
    }
    res.send(item);
  } catch (e) {
    res.status(500);
    res.send("Server error");
  }
});


//Ajoute un Item selon Le personnage et le user
app.post("/item/:id_personnage", verifySession, async (req, res, next) => {
  console.log("requete par transaction pour ajout item")

  const personnageId = req.params.id_personnage;
  const userId = req.session.userId;
  req.body.created_by = ObjectId(userId);
  const newItem = req.body;

  let { db_client, db_connection } = await connect();

  const session = db_client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  try {
    await session.withTransaction(async () => {
      //1 find si le personnage appartient à l'utilisateur connecté findOne sur id du personnage == created_by

      let personnage = await db_connection
          .collection("personages")
          .findOne({ "_id":ObjectId(personnageId),created_by: ObjectId(userId) });

      if (!personnage) {
        next("Ce personnage ne vous appartient pas");
      }


      //2 inserer l'item en base avec ses caracteristiques
      let item = await db_connection.collection("items").insertOne(newItem);
      let itemId = item.insertedId;
      //console.log("itemId",itemId)
      //3 modifier la liste d'id du personnage en y ajoutant l'id de l'item nouvellement crée.

      let result = await db_connection
          .collection("personages")
          .updateOne(
              {_id: ObjectId(personnageId)},
              {
                $push: {
                  "inventory_list":itemId
                }
              }
          )
      if(result.matchedCount === 0) {
        next({code: 400, message: "No items was updated, id doesn't exist"})
      }

    }, transactionOptions);
    res.send("Transaction ajout item ok");
    //console.log("opération réalisée avec succés");
  }catch (e) {
    next(e);
  }finally {
    await session.endSession();
    await db_client.close();
  }
});

//Supprime un Item selon Le personnage et le user
app.delete("/item/:id", verifySession, async (req, res, next) => {
  console.log("requete par transaction pour SUPPRESSION item")

  const userId = req.session.userId;
  const deletedItemId = req.params.id;

  console.log("userId : ", userId)
  console.log("deletedId : ",deletedItemId)

  let { db_client, db_connection } = await connect();

  const session = db_client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };
  try {
    await session.withTransaction(async () => {
      //1
      let item = await db_connection
          .collection("items")
          .findOne({ _id:ObjectId(deletedItemId) ,created_by: ObjectId(userId) });
      if (!item) {
        throw new Error("Impossible de récuperer ce personnage");
      }
      let personnageId = personnage._id;
      //console.log("étape 1")
      //2
      let result = await db_connection
          .collection("personages")
          .updateOne(
              {_id: ObjectId(personnageId)},
              {
                $pull: { inventory_list: ObjectId(deletedItemId) }
              }
          )
      if(result.matchedCount === 0) {
        next({code: 400, message: "No items was updated, id doesn't exist"})
      }
      //console.log("étape 2")

      //3
      await db_connection.collection("items").deleteOne({_id: ObjectId(deletedItemId)});
      //console.log("étape 3")



    }, transactionOptions);
    res.send("Transaction Suppresion ok");
    //console.log("opération réalisée avec succés");
  }catch (e) {
    next(e);
  }finally {
    await session.endSession();
    await db_client.close();
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

//Récupère 1 personnage en particulier selon l'ID
app.get("/personnage/:id", verifySession, async (req, res) => {
  try {
    const userId = req.session.userId;
    const persoID = req.params.id;

    let { db_client, db_connection } = await connect();

      let personnage = await db_connection
          .collection("personages")
          .findOne({ "_id":ObjectId(persoID),created_by: ObjectId(userId) });

      if (!personnage) {
        next("Impossible de récupérer ce personnage");
      }

      res.send(personnage);

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
