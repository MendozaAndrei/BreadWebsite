import express, { Request, Response } from "express";
import path from "path";
import session from "express-session";
const app = express();
import expressLayouts from "express-ejs-layouts";
import passport from "passport";

app.use(expressLayouts);

app.set("view engine", "ejs")
// app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
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


app.set("view engine", "ejs"); //→ tells server that we will be using ejs files

app.get("/home", (req: Request, res: Response) => {
  res.render("homepage");
});

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});