var express = require('express');
var router = express.Router();

const {Pool} = require('pg')
var driver_email;
const pool = new Pool({connectionString:process.env.DATABASE_URL})
const sql = {}
sql.query = {
    all_songs : `select * from songs where name = $1;`,
    fav_songs: `select L.email, L.name, S.artist, S.duration
                from likes L, songs S
                where L.name = S.name
                and L.email = $1;`,
    play_songs:    `select P.email, P.name, S.artist, S.duration
                    from plays P, songs S
                    where P.name = S.name
                    and P.email = $1`,
    insert_song : `INSERT INTO songs(name, duration, artist) VALUES($1, $2, $3);`,
    all_likes : `select * from likes where email = $1 and name = $2;`,
    all_plays : `select * from plays where email = $1 and name = $2;`,
    insert_song_likes : `INSERT INTO likes(email, name) VALUES($1, $2);`,
    insert_song_plays: "insert into plays(email, name) values($1, $2)",
    delete_likes : `DELETE FROM likes WHERE email = $1 and name = $2;`,
    delete_plays: `DELETE FROM plays WHERE email = $1 and name = $2;`,
    delete_song: 'delete from songs where name = $1'
    // not adding delete song coz other users might be liking the same song
}

var user_email;
var user_type;
router.get('/', async function(req, res, next){
    user_type = req.session.passport.user.id;
    if(req.session.passport == undefined){
        console.log("user not logged in");
        res.redirect("login");
    } else if (user_type == "passenger"){
            user_email = req.session.passport.user.email;
            var fav_songs_data = await pool.query(sql.query.fav_songs, [user_email]);
            if (fav_songs_data != undefined) {
                console.log(fav_songs_data.rows)
                res.render('songs', {
                    songs: fav_songs_data.rows,
                    user_name: req.session.passport.user.name,
                    user_type: req.session.passport.user.id
                });
            } else {
                console.log('fav songs data is undefined')
            }
    } else if (user_type == "driver"){
        user_email = req.session.passport.user.email;
        var fav_songs_data = await pool.query(sql.query.play_songs, [user_email]);
        if (fav_songs_data != undefined) {
            console.log(fav_songs_data.rows)
            res.render('songs', {
                songs: fav_songs_data.rows,
                user_name: req.session.passport.user.name,
                user_type: req.session.passport.user.id
            });
        } else {
            console.log('fav songs data is undefined')
        }
        
    }else {
        //user not logged in
        res.redirect("login");
    }
})

router.post('/fav_song', async function(req, res, next){
    try {
        var name = req.body.fav_song;
        //var duration = req.body.fav_song_duration;


        var mins = req.body.fav_song_mins;
        var secs = req.body.fav_song_secs;
        var duration = "00:"+mins+":"+secs;



        var artist = req.body.fav_song_artist;
        var existing_song_data = await pool.query(sql.query.all_songs, [name]);
        if (existing_song_data != undefined) {
            if (existing_song_data.rows.length == 0) {
                var insert_song = await pool.query(sql.query.insert_song, [name, duration, artist])
                if (insert_song != undefined) {
                    console.log('insert song data success')
                } else {
                    console.log('insert song data is undefined')
                }
            }
        } else {
            console.log('existing song data is undefined')
        }
        
        if(user_type == "driver"){
            //user is driver
            var all_plays = await pool.query(sql.query.all_plays, [user_email, name]);
            if (all_plays != undefined) {
                if (all_plays.rows.length == 0) {
                    var insert_song_play = await pool.query(sql.query.insert_song_plays, [user_email, name]);
                    if(insert_song != undefined){
                        console.log(insert_song_play);
                    } else {
                        console.log("insert plays song data is undefined");
                    }
                }
            } else {
                console.log('all plays data is undefined')
            }
            
        } else if (user_type == "passenger"){
            var all_likes = await pool.query(sql.query.all_likes, [user_email, name]);
            if (all_likes != undefined) {
                if (all_likes.rows.length == 0) {
                    var insert_song_likes = await pool.query(sql.query.insert_song_likes, [user_email,name])
                    if (insert_song_likes != undefined) {
                        console.log(insert_song_likes)
                    } else {
                        console.log('insert likes song data is undefined')
                    }   
                }
            } else {
                console.log('all likes data is undefined')
            }
            
        } else {
            //gtfo of here
            res.redirect('login');
        }
        res.redirect('./');
    } catch {
        console.log('unhandled promise')
    }
})

router.post('/delete_song', async function(req, res, next){
    var delete_id = req.body.delete_id-1;

    if(req.session.passport.user.id == "passenger"){
        var fav_songs_data = await pool.query(sql.query.fav_songs, [user_email]);
        if (fav_songs_data != undefined) {
            console.log(fav_songs_data.rows);
        } else {
            console.log('fav songs data is undefined')
        }
        var deleted_song = fav_songs_data.rows[delete_id]
        var name = deleted_song.name;
        var delete_song_likes = await pool.query(sql.query.delete_likes, [user_email, name]);
        if (delete_song_likes != undefined) {
            console.log(delete_song_likes)
        } else {
            console.log('delete song likes data is undefined')
        }
        var delete_the_song = await pool.query(sql.query.delete_song, [name]);
        if(delete_the_song != undefined){
            console.log("the song deleted form song table");
        } else {
            console.log("song  not delete. PROBLEM!");
        }
    
    } else if(req.session.passport.user.id == "driver"){
        var play_songs_data = await pool.query(sql.query.play_songs, [user_email]);
        if (play_songs_data != undefined) {
            console.log(play_songs_data.rows);
        } else {
            console.log('play songs data is undefined')
        }
        var deleted_song = play_songs_data.rows[delete_id]
        var name = deleted_song.name;
        console.log("HERE IS THE NAME OF THE SONG: "+name);
        var delete_song_plays = await pool.query(sql.query.delete_plays, [user_email, name]);
        if (delete_song_plays != undefined) {
            console.log(delete_song_plays)
        } else {
            console.log('delete song likes data is undefined')
        }

        // try{
        //     var delete_the_song = await pool.query(sql.query.delete_song, [name]);
        //     if(delete_the_song != undefined){
        //         console.log("the song deleted form song table");
        //     } else {
        //         console.log("song  not delete. PROBLEM!");
        //     }
        // } catch(e){
        //     console.log(e);
        //     redirect('./');
        // }

    
    }

    // reason has been mentioned above
    /*var artist = deleted_song.artist;
    var duration = deleted_song.duration;
    var delete_song = await pool.query(sql.query.delete_song, [name, artist, duration])
    if (delete_song != undefined) {
        console.log(delete_song)
    } else {
        console.log('delete song data is undefined')
    }*/
    res.redirect("./");
})

module.exports = router;
