var express = require('express');
var router = express.Router();

const {Pool} = require('pg')

const pool = new Pool({connectionString:process.env.DATABASE_URL})

const sql = []
//////need to change receiver email to current user and same for sender email
sql.query = {
  view_message: `select distinct Q.msg_date, Q.msg_time, Q.sender, Q.sender_email, P.name as receiver, Q.receiver_email, Q.msg
                  from (select distinct M.msg_date, M.msg_time, P.name as sender, M.sender_email, M.receiver_email, M.msg
                  from message M, passenger P
                  where P.email = M.sender_email) Q, passenger P
                  where P.email = Q.receiver_email
                  and (Q.receiver_email = $1 or Q.sender_email = $1)
                  order by Q.msg_date desc, Q.msg_time desc;`,
  delete_message: `delete from message where msg_date = $1 and msg_time = $2 and sender_email = $3 and receiver_email = $4 and msg = $5;`
}

var passenger_email;
/* GET login page. */
router.get('/', function(req, res, next) {
    console.log("passenger dashboard");
    if(req.session.passport.user.email == undefined){
        console.log("user not logged in");
    } else if(req.session.passport.user.id == "passenger"
                || req.session.passport.user.id == "driver"){
            passenger_email = req.session.passport.user.email;
            pool.query(sql.query.view_message, [passenger_email], (err, data) => {
              if (data != undefined) {
                  console.log(data.rows)
                  res.render('inbox', {
                    message : data.rows,
                    user_name: req.session.passport.user.name,
                    user_type: req.session.passport.user.id
                  });
              } else {
                  console.log('view_messages is undefined')
              }
            })
    } else if(req.session.passport.user.id == "driver"){
        //no access
        res.redirect('./driver');
    } else {
        res.redirect('./login');
    }   
});

router.post("/logout", function(req, res, next){
    req.session.passport.user.email = "";
    req.session.passport.user.password = "";
    req.session.passport.user.id = "";
    res.redirect('../login');
  })
  
  router.post("/dashboard", function(req, res, next){
      console.log("I want to go back to dashboard----------");
      console.log("i am a:");
      console.log(req.session.passport.user);
    if(req.session.passport.user.id == "passenger"){
      res.redirect("../passenger");
    } else if (req.session.passport.user.id == "driver"){
      res.redirect("../driver");
    } else {
      console.log("What are you doing here?")
      res.redirect("../login");
    }
  })

router.post('/delete_msg', async function(req, res, next){  
  var to_delete = req.body.delete_id - 1;
  console.log(to_delete)
    var all_messages_data = await pool.query(sql.query.view_message);
    if (all_messages_data != undefined) {
      var curr_message = all_messages_data.rows[to_delete]
      
      var date = curr_message.msg_date;
      var time = curr_message.msg_time;
      var sender_email = curr_message.sender_email;
      var receiver_email = curr_message.receiver_email;
      var msg = curr_message.msg
      console.log(date, time, sender_email, receiver_email, msg)
      var delete_message_data = await pool.query(sql.query.delete_message, [date, time, sender_email, receiver_email, msg]) 
      if (delete_message_data != undefined) {
        console.log(delete_message_data)
        res.redirect("./")
      } else {
        console.log('delete_message_data is undefined')
      }
    } else {
      console.log('delete_view_messages is undefined')
    }
})

module.exports = router;