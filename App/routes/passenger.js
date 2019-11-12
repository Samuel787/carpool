var express = require('express');
var router = express.Router();

const {Pool} = require('pg')

const pool = new Pool({connectionString:process.env.DATABASE_URL})

const sql = []
sql.query = {
    get_user_name: 'select name from passenger where email = $1',
    recommended_drivers : `select distinct P.name, R.email_driver, R.rating, Q.common_songs
                            from (select distinct email_driver, avg(rating) as rating 
                                    from bid B
                                    where B.is_win is true 
                                    and B.e_date is not null and B.e_time is not null
                                    group by email_driver) R, 
                                (select distinct P.email, count(*) as common_songs
                                    from likes L inner join plays P 
                                    on L.name = P.name
                                    where L.email = $1
                                    group by P.email) Q, 
                                passenger P
                            where R.email_driver = Q.email
                            and P.email = R.email_driver
                            order by rating desc, common_songs desc;`,

    avail_advertisements: `select distinct N.name, A.email, CP.current_pax, A.start_loc, A.end_loc, A.a_date, A.a_time
                            from advertisesTrip A, 
                                (select distinct P.name, P.email 
                                    from passenger P, advertisesTrip A
                                    where P.email = A.email) N, 
                                (select T.email_driver, T.vehicle, (T.pax - O.occupancy) as current_pax
                                    from (select D.email as email_driver, D.license_plate as vehicle, V.pax
                                            from drives D, vehicles V
                                            where D.license_plate = V.license_plate) T,
                                    ((select email as email_driver, license_plate as vehicle, 0 as occupancy 
                                        from drives 
                                        where (email, license_plate) 
                                            not in (select Q1.email_driver, Q1.vehicle
                                                        from 
                                                            (select email_driver, vehicle, count(*)
                                                            from bid
                                                            where e_date is null
                                                            group by email_driver, vehicle) Q1
                                                        left join 
                                                            (select email_driver, vehicle, count(*) 
                                                            from bid 
                                                            where is_win is true
                                                            and e_date is null
                                                            group by email_driver, vehicle) Q2
                                                        on  Q1.vehicle = Q2.vehicle
                                                        and Q1.email_driver = Q2.email_driver
                                                        group by Q1.email_driver, Q1.vehicle))
                                    union 
                                    (select Q1.email_driver, Q1.vehicle, coalesce(sum(Q2.count),0) as occupancy
                                        from 
                                            (select email_driver, vehicle, count(*)
                                            from bid
                                            where e_date is null
                                            group by email_driver, vehicle) Q1
                                        left join 
                                            (select email_driver, vehicle, count(*) 
                                            from bid 
                                            where is_win is true
                                            and e_date is null
                                            group by email_driver, vehicle) Q2
                                        on  Q1.vehicle = Q2.vehicle
                                        and Q1.email_driver = Q2.email_driver
                                        group by Q1.email_driver, Q1.vehicle)) O
                                    where T.email_driver = O.email_driver and T.vehicle = O.vehicle) CP
                            where N.email = A.email
                            and CP.email_driver = A.email
                            and CP.vehicle = A.vehicle
                            and A.email != $1
                            order by A.a_date desc, A.a_time desc;`,

    avail_vehicle: `select distinct vehicle from advertisesTrip where email = $1 and start_loc = $2 and end_loc = $3 and a_date = $4 and a_time = $5`,

    insert_bid: `INSERT INTO bid (amount, start_loc, end_loc, email_bidder, email_driver, vehicle, s_date, s_time) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    
    bid_win: `select * from bid where is_win is true and e_date is null and e_time is null and email_bidder = $1`,

    favourite_location: `select * from favouriteLocation where email_passenger = $1`,

    current_bids:`select P.name as driver, B.email_bidder, B.email_driver, B.start_loc, B.end_loc, B.s_date, B.s_time, B.amount, B.is_win 
                    from bid B, passenger P 
                    where B.email_driver = P.email 
                    and B.e_date is null 
                    and B.email_bidder = $1;`,

    delete_current_bid : `delete from bid where email_driver = $1 and email_bidder = $2 and start_loc = $3 
                            and end_loc = $4 and s_date = $5 and s_time = $6`,

    search_advertisements: `select distinct N.name, A.email, CP.current_pax, A.start_loc, A.end_loc, A.a_date, A.a_time
                                from advertisesTrip A, 
                                    (select distinct P.name, P.email 
                                        from passenger P, advertisesTrip A
                                        where P.email = A.email) N, 
                                    (select T.email_driver, T.vehicle, (T.pax - O.occupancy) as current_pax
                                        from (select D.email as email_driver, D.license_plate as vehicle, V.pax
                                                from drives D, vehicles V
                                                where D.license_plate = V.license_plate) T,
                                        ((select email as email_driver, license_plate as vehicle, 0 as occupancy 
                                            from drives 
                                            where (email, license_plate) 
                                                not in (select Q1.email_driver, Q1.vehicle
                                                            from 
                                                                (select email_driver, vehicle, count(*)
                                                                from bid
                                                                where e_date is null
                                                                group by email_driver, vehicle) Q1
                                                            left join 
                                                                (select email_driver, vehicle, count(*) 
                                                                from bid 
                                                                where is_win is true
                                                                and e_date is null
                                                                group by email_driver, vehicle) Q2
                                                            on  Q1.vehicle = Q2.vehicle
                                                            and Q1.email_driver = Q2.email_driver
                                                            group by Q1.email_driver, Q1.vehicle))
                                        union 
                                        (select Q1.email_driver, Q1.vehicle, coalesce(sum(Q2.count),0) as occupancy
                                            from 
                                                (select email_driver, vehicle, count(*)
                                                from bid
                                                where e_date is null
                                                group by email_driver, vehicle) Q1
                                            left join 
                                                (select email_driver, vehicle, count(*) 
                                                from bid 
                                                where is_win is true
                                                and e_date is null
                                                group by email_driver, vehicle) Q2
                                            on  Q1.vehicle = Q2.vehicle
                                            and Q1.email_driver = Q2.email_driver
                                            group by Q1.email_driver, Q1.vehicle)) O
                                        where T.email_driver = O.email_driver and T.vehicle = O.vehicle) CP
                                where N.email = A.email
                                and CP.email_driver = A.email
                                and CP.vehicle = A.vehicle
                                and A.start_loc = $1 and A.end_loc = $2
                                order by A.a_date desc, A.a_time desc`,
    
    insert_tier: `with Q1 as (select distinct T.email_bidder, D.tier, D.amount/100 as discount, D.description  
                                from (select distinct email_bidder, 
                                            case 
                                                when (total_expenditure < 500) then 0
                                                when (total_expenditure >= 500 and total_expenditure < 1000) then 1 
                                                when (total_expenditure >= 1000 and total_expenditure < 1500) then 2
                                                when (total_expenditure >= 1500 and total_expenditure < 2000) then 3
                                                when (total_expenditure >= 2000 and total_expenditure < 2500) then 4
                                                when (total_expenditure >= 2500) then 5
                                            end as tier
                                        from (select distinct email_bidder, sum(amount) as total_expenditure
                                                from bid
                                                where e_date is not null
                                                group by email_bidder) TE) T, 
                                discount D
                                where D.tier = T.tier)
                insert into gets(email, tier) 
                select email_bidder, tier
                from ((select distinct email as email_bidder, 0 as tier, 0 as discount, 'no discount' as description
                            from passenger 
                            where email not in 
                            (select distinct email_bidder as email from Q1))
                        union 
                        select distinct email_bidder, tier, discount, description from Q1) DP
                where not exists (select distinct * from gets 
                                    where email = DP.email_bidder and tier = DP.tier);`,
    
    avail_discount: `select G.email, D.tier, D.amount/100 as discount, D.description  
                        from gets G, discount D 
                        where is_used is false
                        and D.tier = G.tier
                        and G.email = $1;`,

    use_discount : `update gets set is_used='true' where email = $1 and tier = $2`

}

var passenger_email;
/* GET login page. */
router.get('/', async function(req, res, next) {
    console.log("passenger dashboard");
    
    if(req.session.passport == undefined){
        console.log("user not logged in");
        res.redirect('login');
    } else if(req.session.passport.user.id == "passenger"){
        passenger_email = req.session.passport.user.email;
        //passenger success
        try {
            var name_of_user = "";
            try{
                var data_pack = await pool.query(sql.query.get_user_name, [passenger_email]);
                console.log("Passenger name info: ------");
                console.log(data_pack);
                name_of_user = data_pack.rows[0].name;
                req.session.passport.user.name = name_of_user;
            } catch {
                name_of_user = "";
                console.log("name error T.T");
            }
            
            pool.query(sql.query.recommended_drivers, [passenger_email], (err, data) => {
                if (data != undefined) {
                    console.log(data.rows);
                    pool.query(sql.query.avail_advertisements, [passenger_email], (err, data2) => {
                        pool.query(sql.query.favourite_location, [passenger_email], (err, data3) => {                           
                            pool.query(sql.query.current_bids, [passenger_email], (err, data4) => {
                                pool.query(sql.query.insert_tier, (err, result) => {
                                    pool.query(sql.query.avail_discount, [passenger_email], (err, data6) => {
                                        if (data2 != undefined && data3 != undefined && data4 != undefined 
                                            && result != undefined && data6 != undefined) {
                                            console.log(data2.rows);
                                            console.log(data3.rows);
                                            console.log(data4.rows);
                                            console.log(result);
                                            console.log(data6.rows);
                                            res.render('passenger', {
                                                recommended : data.rows, 
                                                advertisements: data2.rows,
                                                locations: data3.rows,
                                                current_bids: data4.rows,
                                                avail_discount: data6.rows,
                                                user_name: name_of_user
                                            })
                                        } else {
                                            console.log('available advertisements data is undefined')
                                        }
                                    })
                                   
                                })
                            })
                            
                        })
                    })
                } else {
                    console.log('recommended_drivers data is undefined')
                }
            })
            
        } catch {
            console.log('passenger bid error')
        }
    } else if(req.session.passport.user.id == "driver"){
        //no access
        res.redirect('./driver');
    } else {
        res.redirect('./login');
    }   
    
});


router.post('/logout', function(req, res, next){
    req.session.passport.user.email = "";
    req.session.passport.user.password = "";
    req.session.passport.user.id = "";
    res.redirect('../login');
})

router.post('/bid', async function(req, res, next){
    var bid_num = req.body.bid_num;
    var bid_val = req.body.bid_val;

    var discount_val = req.body.discountpicker;

    console.log("discount index" + discount_val);
    var discount = await pool.query(sql.query.avail_discount, [passenger_email]);

    if (discount != undefined && discount_val != undefined) {
            console.log(discount.rows);
            var discounted = discount.rows;
            console.log(parseFloat(bid_val));
            var discount_entry = discounted[discount_val];
            
            pool.query(sql.query.use_discount, [passenger_email, discount_entry.tier], (err, data) => {
                if (data!= undefined) {
                    console.log(data)
                } else {
                    console.log('using coupon data is undefined')
                }
            })

            console.log(parseFloat(bid_val) * parseFloat(discounted[discount_val].discount)); 
            bid_val = parseFloat(bid_val) - (parseFloat(bid_val)*parseFloat(discounted[discount_val].discount));

            console.log(bid_val);
    } else {
        console.log('discount data is undefined')
    }

    var avail_data = await pool.query(sql.query.avail_advertisements, [passenger_email])
    if (avail_data != undefined) {
        console.log(avail_data.rows)
        var advertisement = avail_data.rows[bid_num-1]
        var amount = parseFloat(bid_val);
        var start_loc = advertisement.start_loc;
        var end_loc = advertisement.end_loc; 
        var email_bidder = passenger_email
        var email_driver = advertisement.email
        
        var vehicle_data = await pool.query(sql.query.avail_vehicle, [email_driver, start_loc, end_loc, advertisement.a_date, advertisement.a_time]);
        var vehicle;
        if (vehicle_data != undefined) {
            console.log(vehicle_data.rows)
            vehicle = vehicle_data.rows[0].vehicle
        } else {
            console.log('vehicle data is undefined')
        }
        try {
            var result = await pool.query(sql.query.insert_bid, [amount, start_loc, end_loc, email_bidder, email_driver, 
                                                vehicle, advertisement.a_date, advertisement.a_time]);
            if (result != undefined) {
                console.log(result)
            } else {
                console.log('result is undefined')
            }
        } catch {
            console.log('insert bid error')
        }
    } else {
        console.log("avail data is undefined")
    }
    res.redirect('./');
})

router.post('/inbox', function(req, res, next){
    res.redirect('../inbox');
})

router.post('/message', function(req, res, next){
    res.redirect('../message');
})

//FAV_SONG changed to a dedicated page
router.post('/fav_song', function(req, res, next){
    var fav_song_name = req.body.fav_song;
    var fav_song_playtime = req.body.fav_song_playtime;
    var fav_song_artist = req.body.fav_song_artist;
})

router.post('/panalytics', function(req, res, next){
    res.redirect('../panalytics');
})

router.post('/discount', function(req, res, next){
    res.redirect('../discount');
})

router.post('/songs', function(req, res, next){
    res.redirect('../songs');
})

router.post('/recc_drivers', function(req, res, next){
    //code for recommended drivers goes here
    
})

router.post('/feedback', function(req, res, next){
    res.redirect('../feedback');
})

router.post('/search_advertisements', function(req, res, next){
    var start_location = req.body.start_location;
    var end_location = req.body.end_location;
    console.log(start_location);
    console.log(end_location);

    pool.query(sql.query.recommended_drivers, [passenger_email], (err, data) => {
        if (data != undefined) {
            console.log(data.rows);
            pool.query(sql.query.search_advertisements, [start_location, end_location], (err, data2) => {
                pool.query(sql.query.favourite_location, [passenger_email], (err, data3) => {                           
                    pool.query(sql.query.current_bids, [passenger_email], (err, data4) => {
                        pool.query(sql.query.insert_tier, (err, result) => {
                            pool.query(sql.query.avail_discount, [passenger_email], (err, data6) => {
                                if (data2 != undefined && data3 != undefined && data4 != undefined && result != undefined) {
                                    console.log(data2.rows);
                                    console.log(data3.rows);
                                    console.log(data4.rows);
                                    console.log(data6.rows)
                                    res.render('passenger', {
                                        recommended : data.rows, 
                                        advertisements: data2.rows,
                                        locations: data3.rows,
                                        current_bids: data4.rows,
                                        avail_discount: data6.rows,
                                        user_name: req.session.passport.user.name
                                    })
                                } else {
                                    console.log('available advertisements data is undefined')
                                }
                            })
                        })
                        
                    })
                })
            })
        } else {
            console.log('recommended_drivers data is undefined')
        }
    })
    // res.redirect('./');

})

router.post('/locations', function(req, res, next){
    res.redirect('../locations');
})

router.post('/del_bid', async function(req, res, next){
    var del_index = req.body.del_index;
    var current_bids = await pool.query(sql.query.current_bids, [passenger_email])
    var delete_bid;
    if (current_bids != undefined) {
        delete_bid = current_bids.rows[del_index-1]
        console.log('delete bid ',delete_bid)
    } else {
        console.log('current bids data is undefined')
    }
    //B.email_bidder, B.email_driver, B.start_loc, B.end_loc, B.s_date, B.s_time
    if (delete_bid != undefined) {
        var email_driver = delete_bid.email_driver
        var start_loc = delete_bid.start_loc
        var end_loc = delete_bid.end_loc
        var s_date = delete_bid.s_date
        var s_time = delete_bid.s_time
        pool.query(sql.query.delete_current_bid, [email_driver, passenger_email, start_loc, end_loc, s_date, s_time], (err, data) => {
            if (data != undefined) {
                console.log(data)
            } else {
                console.log('delete current bid data is undefined')
            }
        })
    }
    res.redirect('./');
})

module.exports = router;  