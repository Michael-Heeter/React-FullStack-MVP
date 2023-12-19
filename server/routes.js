const express = require("express");
const cors = require("cors");

const {Pool} = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/users", async (req, res) => {
  try{
    res.json({ message: "success!" });
  }catch(err){
    console.log(err)
  } 
});


app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});

module.exports=app