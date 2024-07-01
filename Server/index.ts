import express, { Request, Response } from "express";
import path from "path";
import session from "express-session";
const app = express();
import expressLayouts from "express-ejs-layouts";
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// Allows us to access the .env file
require('dotenv').config()

app.use(expressLayouts);
app.use(connectLiveReload());
app.set("view engine", "ejs")

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
)


// Routes
app.set("view engine", "ejs"); //tells server that we will be using ejs files


app.get("/home", (req: Request, res: Response) => {
  res.render("homepage");
});
//npm start to run this bitch up

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});