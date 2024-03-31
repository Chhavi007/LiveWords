const express = require("express");
const pg = require("pg");
const path = require("path");

const app = express();
const port = 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  hostname: "localhost",
  database: "Login",
  password: "Harekrishna@04",
  port: 5432,
});
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signUp.html");
});

app.post("/check", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  try {
    const checkResult = await db.query("SELECT * FROM logininfo WHERE email = $1", [email]);
    console.log(checkResult.rows.length);
    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        //res.send("Correct");
        res.sendFile(__dirname + "/public/index.html");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/signUp", async (req, res) => {
  const name= req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    console.log(name);
    console.log(email);
    console.log(password);
    //console.log($2),[email];
    const checkResult = await db.query("SELECT * FROM logininfo WHERE email = $1", [
      email,
    ]);
    console.log(checkResult.rows.length); 
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO logininfo ( email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(checkResult);
      //res.render("secrets.ejs");
      res.sendFile(__dirname + "/public/index.html");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});