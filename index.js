require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rootRoute = require("./routes");

const app = express();

//Connection to DB
require("./db/connection")(app);

app.use(cors());

//Routing
app.use("/api", rootRoute);
