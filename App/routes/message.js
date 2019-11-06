var express = require("express");
var router = express.Router();

const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

/**
 * Enter sql queries in here:
 */

const sql = {};
sql.query = {
  //   //   //user_Message
  message:
    "INSERT INTO message (sender_email, receiver_email, msg, msg_time, msg_date) VALUES($1, $2, $3, $4, $5)"
};


var user_email;
/* GET signup page. */
router.get("/", function(req, res, next) {
  console.log("Message page");
  if(req.session.passport.user.email == undefined){
    console.log("user not logged in");
  } else {
    user_email = req.session.passport.user.email;
    console.log(user_email);
  }
  res.render("message", { title: "Express" });
});

// POST
router.post("/basic", function(req, res, next) {
  //Retrieve Information

  var sender = user_email;
  var email = req.body.email;
  var user_Message = req.body.user_Message;
  var d = new Date();
  var date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  console.log(sender, email, user_Message, date, time);
  
  pool.query(
    sql.query.message,
    [sender, email, user_Message, time, date],
    (err, data) => {
      console.log(data);
    }
  );
});

router.post("/logout", function(req, res, next){
  if(req.session.passport != undefined){
    req.session.passport.user.email = "";
    req.session.passport.user.password = "";
    req.session.passport.user.id = "";
  }
  res.redirect('../login');
})

router.post("/dashboard", function(req, res, next){
  if(req.session.passport.user.id == "passenger"){
    res.redirect("../passenger");
  } else if (req.session.passport.user.id == "driver"){
    res.redirect("../driver");
  } else {
    console.log("What are you doing here?")
    res.redirect("../login");
  }
})

module.exports = router;
