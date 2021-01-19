const db = require("./src/models");

const express = require("express");
const bodyParser = require("body-parser");
const { UserRouter } = require("./src/modules/user");
const { IngredientRouter } = require("./src/modules/ingredient");
const { TimerRouter } = require("./src/modules/Timer");
const { RecetteRouter } = require("./src/modules/recette");
const { PanierRouter } = require("./src/modules/Panier");
const cors = require("cors");

//creation d'instance
const app = express();
//constante qui définit le port
const port = 9000;

//MiddelWare
app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

// app.get("/", (req, res) => res.send("Hello express"));

//Point de terminaison
app.use("/users", UserRouter);
app.use("/ingredients", IngredientRouter);
app.use("/timers", TimerRouter);
app.use("/recettes", RecetteRouter);
app.use("/paniers", PanierRouter);

db.sequelize.sync().then(() => console.log("database synchro"));
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre Url";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `L'application Ckuikui est démarré sur : http://localhost:${port}`
  )
);
