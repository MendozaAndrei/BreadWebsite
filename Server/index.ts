import express, { Request, Response } from "express";
import path from "path";
import session from "express-session";
const app = express();

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// Allows us to access the .env file
require('dotenv').config()


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


app.set("view engine", "ejs"); //tells server that we will be using ejs files


// Routes
app.get("/home", (req: Request, res: Response) => {
  res.render("pages/home");
});
app.get("/about", (req: Request, res: Response) => {
  res.render("pages/about");
});
app.get("/services", (req: Request, res: Response) => {
  res.render("pages/services");
});
app.get("/products", (req: Request, res: Response) => {
  res.render("pages/products");
});
app.get("/contact", (req: Request, res: Response) => {
  res.render("pages/contact");
});





// Server Start

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});