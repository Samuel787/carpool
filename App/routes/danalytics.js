var express = require('express');
var router = express.Router();

const {Pool} = require('pg')
var driver_email;
const pool = new Pool({connectionString:process.env.DATABASE_URL})

/**
 * Enter sql queries in here:
 */

const sql = {}
sql.query = {
    danalytics_basic: `select L.loc_name as location, T.total_bids, AB.average_bid
                          from Location L, 
                            (select distinct start_loc as location, avg(amount) as average_bid
                            from bid
                            group by location) AB, 
                            (select distinct start_loc as location, count(*) as total_bids
                            from bid
                            group by start_loc) T
                        where L.loc_name = AB.location and L.loc_name = T.location;`,
    
    danalytics_increasing: `select L.loc_name as location, T.total_bids, AB.average_bid
                              from Location L, 
                                  (select distinct start_loc as location, avg(amount) as average_bid
                                  from bid
                                  group by location) AB, 
                                  (select distinct start_loc as location, count(*) as total_bids
                                  from bid
                                  group by start_loc) T
                              where L.loc_name = AB.location and L.loc_name = T.location
                              order by T.total_bids asc; `,
    
    danalytics_decreasing: `select L.loc_name as location, T.total_bids, AB.average_bid
                              from Location L, 
                                  (select distinct start_loc as location, avg(amount) as average_bid
                                  from bid
                                  group by location) AB, 
                                  (select distinct start_loc as location, count(*) as total_bids
                                  from bid
                                  group by start_loc) T
                              where L.loc_name = AB.location and L.loc_name = T.location
                              order by T.total_bids desc;`,
    
    danalytics_00:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '00:00:00' and '02:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '00:00:00' and '02:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_02:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '02:00:00' and '04:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '02:00:00' and '04:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_04:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '04:00:00' and '06:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '04:00:00' and '06:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_06:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '06:00:00' and '08:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '06:00:00' and '08:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_08:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '08:00:00' and '10:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '08:00:00' and '10:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_10:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '10:00:00' and '12:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '10:00:00' and '12:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_12:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '12:00:00' and '14:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '12:00:00' and '14:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_14:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '14:00:00' and '16:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '14:00:00' and '16:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_16:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '16:00:00' and '18:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '16:00:00' and '18:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_18:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '18:00:00' and '20:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '18:00:00' and '20:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_20:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '20:00:00' and '22:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '20:00:00' and '22:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    danalytics_22:`select L.loc_name as location, T.total_bids, AB.average_bid
                    from Location L, 
                        (select distinct start_loc as location, avg(amount) as average_bid
                        from bid
                        where s_time between '22:00:00' and '00:00:00'
                        group by location) AB, 
                        (select distinct start_loc as location, count(*) as total_bids
                        from bid
                        where s_time between '22:00:00' and '00:00:00'
                        group by start_loc) T
                    where L.loc_name = AB.location and L.loc_name = T.location;`,

    own_analytics : `select * from
                      ((select distinct email as email_driver, 0 as avg_price, 0 as rating
                          from driver
                          where email not in (select distinct email_driver from bid where e_date is not null))
                      union
                      (select A.email_driver, A.avg_price, coalesce(R.rating,0)
                      from (select distinct email_driver, avg(amount) as avg_price
                              from bid 
                              where is_win is true
                              and e_time is not null
                              and e_date is not null
                              group by email_driver) A, 
                          (select distinct email_driver, avg(rating) as rating
                              from bid
                              where is_win is true 
                              and e_date is not null 
                              and e_time is not null
                              group by email_driver) R
                      where A.email_driver = R.email_driver)) Q
                      where email_driver = $1;`
}

/* GET signup page. */
var driver_email;
router.get('/', async function(req, res, next) {
  console.log("danalytics");
  if(req.session.passport == undefined){
    console.log("driver not logged in");
    res.redirect('login');
  } else if(req.session.passport.user.id == "driver"){
    try{
      driver_email = req.session.passport.user.email;
      pool.query(sql.query.own_analytics, [driver_email], (err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          pool.query(sql.query.danalytics_basic,(err, data2) => {
            if (data2 != undefined) {
              console.log(data2.rows)
              res.render('danalytics', {
                own_analytics: data.rows, result: data2.rows, title: 'Express',
                user_name: req.session.passport.user.name 
              })
            } else {
              console.log('danalytics data is undefined')
            }
          });
        } else {
          console.log('driver own analytics data is undefined')
        }
      })
      // Construct Specific SQL Query
      
    } catch {
      console.log('danalytics basic error');
    }
  } else if(req.sessions.passport.user.id == "passenger"){
    //no access to passenger
    res.redirect('./passenger');
  } else {
    res.redirect('./login');
  }
  
  // res.render('danalytics', { result: [], title: 'Express' });
});

// POST
router.post('/increasing', async function(req, res, next){
  try{
    // Construct Specific SQL Query
    var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_increasing,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name  
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics increasing error');
  }
})

router.post('/decreasing', async function(req, res, next){
  try{
    // Construct Specific SQL Query
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_decreasing,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows, 
            user_name: req.session.passport.user.name  
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/00', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_00,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/02', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_02,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/04', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_04,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/06', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_06,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/08', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_08,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/10', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_10,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/12', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_12,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/14', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_14,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/16', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_16,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/18', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_18,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/20', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_20,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/22', async function(req, res, next){
  try{
    // var order = 'desc';
	  var own_analytics = await pool.query(sql.query.own_analytics, [driver_email])
    if (own_analytics != undefined) {
      pool.query(sql.query.danalytics_22,(err, data) => {
        if (data != undefined) {
          console.log(data.rows)
          res.render('danalytics', {
            own_analytics: own_analytics.rows, result: data.rows,
            user_name: req.session.passport.user.name   
          })
        } else {
          console.log('data is undefined')
        }
      });
    } else {
      console.log('own analytics data is undefined')
    }
  } catch {
    console.log('danalytics decreasing error');
  }
})

router.post('/dashboard', async function(req, res, next){
  res.redirect('../driver');
})

module.exports = router;
