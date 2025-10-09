import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "your-username-here",
  host: "localhost",
  database: "your-database-here",
  password: "your-password-here",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  ); //Also can JOIN tables with: "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1;",
  [currentUserId];
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const usersData = await db.query("SELECT * FROM users");
  let users = usersData.rows;
  const countries = await checkVisisted();
  const id = parseInt(currentUserId);
  const searchIndex = users.findIndex((user) => user.id === id);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[searchIndex].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body.add) {
    res.render("new.ejs");
  } else {
    console.log(req.body);
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const result = await db.query(
    "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *",
    [req.body.name, req.body.color]
  );
  currentUserId = result.rows[0].id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
