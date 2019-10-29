var express = require("express");
var router = express.Router();

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
  res.render("passenger", { title: "Express" });
});

// /**
//  * Enter sql queries in here:
//  */
const sql = {};
sql.query = {
  passenger_basic: `SELECT * FROM favouriteLocation;`,
  submit: `INSERT INTO favouriteLocation (email_passenger, loc_name) VALUES($1, $2);`
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

router.post("/submit", function(req, res, next) {
  try {
    // Construct Specific SQL Query
    var email = "haha@gmail.com";
    var location = req.body.location;
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
