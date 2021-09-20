const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const app = express();

var corsOptions = {
  origin: ["http://localhost:8081", "http://127.0.0.1:8081"],
};

app.use(cors(corsOptions));
//parser requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
//parser requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(express.json());
//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcom to nodejs application" });
});

require("./app/routes/auth.route")(app);
require("./app/routes/user.route")(app);
require("./app/routes/posts.route")(app);
require("./app/routes/childTopic.route")(app);
require("./app/routes/parentTopic.route")(app);

//set port,listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = require("./app/models");

const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to Mongodb");
    initial();
  })
  .catch((err) => {
    console.log("Connection error: " + err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, docCount) => {
    if (!err && docCount === 0) {
      // new Role({
      //   name: "user",
      // }).save((err) => {
      //   if (err) {
      //     console.log("error: " + err);
      //   }
      //   console.log("added 'user' to roles collection");
      // });

      new Role({
        name: "author",
      }).save((err) => {
        if (err) {
          console.log("error: " + err);
        }
        console.log("added 'author' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error: " + err);
        }
        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error: " + err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
