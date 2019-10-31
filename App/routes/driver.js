var express = require('express');
var router = express.Router();
const passport = require('passport');
const session = require('express-session');

const {Pool} = require('pg')

const pool = new Pool({connectionString:process.env.DATABASE_URL})

const sql = []
sql.query = {

    check_driver: 'select * from driver where email = $1',
    advertise: `INSERT INTO advertisesTrip (start_loc, end_loc, email, a_date, a_time) VALUES($1, $2, $3, $4, $5)`,   
    
    available_bids: `select distinct N.name, CP.current_pax, B.email_bidder, B.vehicle, B.start_loc, B.end_loc, B.amount, B.s_date, B.s_time
    from Bid B, 
        (select distinct P.name, P.email
            from passenger P, bid B
            where P.email = B.email_bidder) N,
        (select distinct P.email_driver, P.vehicle, P.pax-W.count as current_pax
            from 
                (select Q1.email_driver, count(Q2.email_driver)
                    from 
                        (select distinct email_driver, count(*)
                        from bid
                        group by email_driver) Q1
                    left join 
                        (select distinct email_driver, count(*) 
                        from bid 
                        where is_win is true
                        group by email_driver) Q2
                    on Q1.email_driver = Q2.email_driver
                    group by Q1.email_driver) W,  
                (select distinct B.email_driver, B.vehicle, V.pax
                    from vehicles V, bid B 
                    where V.license_plate = B.vehicle) P
    where W.email_driver = P.email_driver) CP
    where B.email_bidder = N.email
    and B.email_driver = CP.email_driver
    and B.email_driver = $1;`,

    bid_win: `update bid set is_win = true
    where email_bidder = $1 and email_driver = $2
    and vehicle = $3 and start_loc = $4 and amount = $5 
    and s_date = $6 and s_time = $7;
    `
    /*
    update bid set is_win = false
    where email_bidder = 'ucramphorn1@netlog.com' and email_driver = 'rdoog6@yandex.ru'
    and start_loc = 'Jurong' and amount = '19.5' 
    and s_date = '2018-12-23' and s_time = '12:20:00' and vehicle = 'SAL4224';
    */
}

var driver_email;

/* GET login page. */
router.get('/', function(req, res, next) {
    console.log("driver dashboard");
    console.log(req.session);
    if(req.session.passport.user.email==undefined){
        console.log("driver not logged in");
    } else if(req.session.passport.user.id == "driver"){
        console.log("This is a driver account");
        try {
            // need to only load driver related bids
            pool.query(sql.query.available_bids, ['rdoog6@yandex.ru'], (err, data) => {
                if (data != undefined) {
                    console.log(data.rows)
                    res.render('driver', {bid: data.rows, title : 'Express'})
                } else {
                    console.log('data is undefined')
                }
            })
        } catch {
            console.log('driver available bids error')
        }
    } else if(req.session.passport.user.id == "passenger"){
        res.redirect('./passenger');
    } else {
        res.redirect('./login');
    }
    
    
    
    
    /*
    else {
        driver_email = req.session.passport.user.email;
        console.log(driver_email);
    }
    pool.query(sql.query.check_driver, [driver_email], async (err, data) => {
        if(data.rows.length == 0){
            console.log("This user cannot access the driver dashboard");
            res.redirect('./passenger');
        } else {
            console.log("This is a driver account");
            try {
                // need to only load driver related bids
                pool.query(sql.query.available_bids, ['rdoog6@yandex.ru'], (err, data) => {
                    console.log(data.rows)
                    res.render('driver', {bid: data.rows, title : 'Express'})
                })
            } catch {
                console.log('driver available bids error')
            }
        }
    })
    */
})

router.post('/logout', function(req, res, next){
    req.session.passport.user.email = "";
    req.session.passport.user.password = "";
    req.session.passport.user.id = "";
    console.log(session);
    res.redirect('../login');
})

router.post('/bid_true', async function(req, res, next) {
    console.log(req.body.bid_true);
    var index = req.body.bid_true-1;
    var data = await pool.query(sql.query.available_bids, ['rdoog6@yandex.ru'])
    if (data != undefined) {
        var bids = data.rows
        if (index >= 0 && index < bids.length) {
            var email_bidder = bids[index].email_bidder;
            // to be changed to current user
            var email_driver = 'rdoog6@yandex.ru';
            var vehicle = bids[index].vehicle;
            var start_loc = bids[index].start_loc;
            var amount = bids[index].amount;
            var s_date = bids[index].s_date;
            var s_time = bids[index].s_time;
            console.log(email_bidder, email_driver, vehicle, start_loc, amount, s_date, s_time)
            try {
                var result = await pool.query(sql.query.bid_win, [email_bidder, email_driver, vehicle, start_loc, amount, s_date, s_time]);
                if (result != undefined) {
                    console.log(result)
                    // res.redirect('../trip');
                } else {
                    console.log('result is undefined')
                }
            } catch {
                console.log('driver set bid true error')
            }
        } else {
            console.log('invalid index');
        }
    } else {
        console.log('data is undefined.')
    }

})

router.post('/advertise', function(req, res, next) {
    var origin = req.body.origin;
    var destination = req.body.destination;
    // email to be changed to logged in user
    var email = 'ayurenev5@icio.us';
    var date = req.body.datetime.split("T")[0].split("-")[2]+"/"+req.body.datetime.split("T")[0].split("-")[1]+"/"+req.body.datetime.split("T")[0].split("-")[0]
    var time = req.body.datetime.split("T")[1]+":00";
    try {
        pool.query(sql.query.advertise, [origin, destination, email, date, time], (err, data) => {
            if (data != undefined) {
                console.log(data.rows)
            } else {
                console.log('data is undefined.')
            }
        })
    } catch {
        console.log('driver advertise error')
    }
})
module.exports = router;  