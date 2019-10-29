var express = require("express");
var router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// const {Pool} = require('pg')
// const pool = new Pool({connectionString:process.env.DATABASE_URL})

var passenger_email;
/* GET login page. */
router.get("/", function(req, res, next) {
  console.log("passenger dashboard");
  if (req.session.passport.user.email == undefined) {
    console.log("user not logged in");
  } else {
    passenger_email = req.session.passport.user.email;
    console.log(passenger_email);
  }
  res.render("passenger", { result: [], title: "Express" });
});

// /**
//  * Enter sql queries in here:
//  */
const sql = {};
sql.query = {
  passenger_basic: `SELECT * FROM favouriteLocation;`,
  submit1: `INSERT INTO favouriteLocation (email_passenger, loc_name) VALUES($1, $2);`,
  submit2: `INSERT INTO favouriteLocation (email_passenger, loc_name) VALUES($1, $2);`
};

router.post("/basic", function(req, res, next) {
  try {
    // Construct Specific SQL Query
    pool.query(sql.query.passenger_basic, (err, data) => {
      console.log(data.rows);
      res.render("passenger", {
        result: data.rows
      });
    });
  } catch {
    console.log("passenger basic error");
  }
});

router.post("/submit1", function(req, res, next) {
  console.log("hello");
  try {
    // Construct Specific SQL Query
    var email = passenger_email;
    var location = req.body.destination1;
    pool.query(sql.query.submit, [email, location], (err, data) => {
      console.log(data.rows);
      console.log("hello");
      res.render("passenger", {
        result: data.rows
      });
    });
  } catch (err) {
    console.log(err);
    console.log("passenger submit fav button error");
  }
});

router.post("/submit2", function(req, res, next) {
  try {
    // Construct Specific SQL Query
    var email = passenger_email;
    var location = req.body.destination2;
    pool.query(sql.query.submit, [email, location], (err, data) => {
      console.log(data.rows);
      res.render("passenger", {
        result: data.rows
      });
    });
  } catch {
    console.log("passenger submit fav button error");
  }
});

module.exports = router;
