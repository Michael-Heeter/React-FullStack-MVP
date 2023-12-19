const express = require("express");
const cors = require("cors");

const {Pool} = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/users", async (req, res) => {
  try{
    const { rows } = await pool.query('SELECT * FROM users;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});

module.exports=app