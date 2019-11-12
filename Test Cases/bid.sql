CREATE TABLE IF NOT EXISTS bid (
    `is_win` VARCHAR(5) CHARACTER SET utf8,
    `amount` INT,
    `start_loc` VARCHAR(12) CHARACTER SET utf8,
    `end_loc` VARCHAR(12) CHARACTER SET utf8,
    `email_bidder` VARCHAR(30) CHARACTER SET utf8,
    `email_driver` VARCHAR(28) CHARACTER SET utf8,
    `liscence_plate` VARCHAR(17) CHARACTER SET utf8,
    `a_date` DATETIME,
    `a_time` VARCHAR(8) CHARACTER SET utf8,
    `e_date` VARCHAR(19) CHARACTER SET utf8,
    `e_time` VARCHAR(8) CHARACTER SET utf8,
    `review` VARCHAR(14) CHARACTER SET utf8,
    `rating` VARCHAR(5) CHARACTER SET utf8
);

INSERT INTO bid VALUES
    ('True',1,'Leroy','Killdeer','gfranklinu@toplist.cz','sseargeant0@virginia.edu','1G4GD5EG8AF170879','2019/05/09','5:08 PM','6/22/2019','5:08 PM','Progressive','1'),
    ('True',2,'Iowa','Arapahoe','epauletv@csmonitor.com','mcowhig1@google.de','4T1BK1EB2FU675137','2019/06/07','5:47 AM','7/19/2019','5:47 AM','empowering','2'),
    ('True',3,'Jenifer','Sycamore','fblacktinw@bandcamp.com','fjanes2@discovery.com','1G4GH5G39CF815962','2019/08/11','9:37 PM','11/18/2019','9:37 PM','Persevering','3'),
    ('True',4,'Stang','Westend','smilnthorpex@sfgate.com','challer3@tamu.edu','WBAVT73538F202477','2019/03/24','8:16 PM','3/25/2019','8:16 PM','high/level','4'),
    ('True',6,'Autumn Leaf','Wayridge','hcorryz@webnode.com','jnewlove5@yellowbook.com','1G6DA5E5XC0102297','2019/05/04','5:38 PM','2019/05/05','5:38 PM','Self/enabling','5'),
    ('True',7,'Fordem','Debra','ahaddeston10@ebay.com','gwinterborne6@reddit.com','5N1BA0ND3FN274477','2019/03/02','11:10 AM','2019/03/03','11:10 AM','success','5'),
    ('True',8,'1st','Sycamore','dduchateau11@delicious.com','gphlippsen7@gizmodo.com','2G4WC582971273551','2019/09/11','5:07 PM','2019/12/09','5:07 PM','responsive','5'),
    ('True',9,'Hauk','South','smeardon12@nyu.edu','jeirwin8@seesaa.net','1FTNF2A57AE392390','2019/03/19','7:18 AM','3/20/2019','7:18 AM','Managed','4'),
    ('True',10,'Laurel','Oxford','sweldon13@nyu.edu','iprendeguest9@t/online.de','WA1WKBFP2CA827432','2019/07/10','4:08 AM','7/20/2019','4:08 AM','adapter','5'),
    ('True',11,'Twin Pines','Norway Maple','gtoovey14@google.cn','smarteleta@ed.gov','SCBZK25E92C164062','2019/07/31','4:11 AM','2019/10/08','4:11 AM','Synergized','2'),
    ('True',12,'Stone Corner','Troy','vwawer15@altervista.org','bhaithb@imdb.com','KNAFX5A89E5089064','2019/09/10','4:30 AM','2019/11/09','4:30 AM','demand/driven','3'),
    ('True',13,'Glacier Hill','Scofield','mgobourn16@feedburner.com','mcallendarc@reverbnation.com','1N6AA0EC3EN659606','2019/10/21','2:00 AM','10/22/2019','2:00 AM','flexibility','1'),
    ('True',14,'Muir','Beilfuss','dchaman17@wikispaces.com','fdelasalled@ameblo.jp','JN8AS1MU5AM764944','2019/05/10','7:16 AM','2019/11/05','7:16 AM','leverage','5'),
    ('True',15,'Rowland','Laurel','aharsent18@newyorker.com','nsodore@mapy.cz','3GYFK62827G547801','2019/05/29','3:38 AM','5/30/2019','3:38 AM','cohesive','4'),
    ('True',16,'Westerfield','Bobwhite','rgambell19@paginegialle.it','ebinnallf@devhub.com','KL4CJBSB9EB243428','2019/03/23','11:06 AM','3/24/2019','11:06 AM','mobile','4'),
    ('True',18,'Independence','Elmside','hbocock1b@state.gov','scastellsh@salon.com','3C3CFFCRXFT148309','2018/12/01','9:52 PM','2018/12/04','9:52 PM','Good','5'),
    ('True',20,'Killdeer','Tennyson','pbaus1d@washington.edu','rwarehamj@woothemes.com','JN8AF5MR1DT733109','2019/09/11','5:07 PM','2019/12/09','17:07:00','Upgradable','4'),
    ('True',21,'Arapahoe','Springs','gscrauniage1e@techcrunch.com','sseargeant0@virginia.edu','1G4GD5EG8AF170879','2019/03/19','7:18 AM','3/20/2019','7:18 AM','client/driven','3'),
    ('True',22,'Sycamore','Little Fleur','mdevericks1f@desdev.cn','mcowhig1@google.de','4T1BK1EB2FU675137','2019/07/10','4:08 AM','2019/11/07','4:08 AM','encryption','2'),
    ('True',23,'Westend','Amoth','kpawelczyk1g@ebay.co.uk','fjanes2@discovery.com','1G4GH5G39CF815962','2019/07/31','4:11 AM','2019/08/01','4:11 AM','Realigned','1'),
    ('True',25,'Wayridge','Mendota','dvarga1i@bandcamp.com','ajanik4@hud.gov','1G4HD57266U331769','2019/10/21','2:00 AM','10/22/2019','2:00 AM','Future/proofed','5'),
    ('True',26,'Debra','Comanche','jcalderwood1j@miitbeian.gov.cn','jnewlove5@yellowbook.com','1G6DA5E5XC0102297','2019/05/10','7:16 AM','2019/11/05','7:16 AM','background','4'),
    ('True',27,'Sycamore','Old Shore','fpooly1k@illinois.edu','gwinterborne6@reddit.com','5N1BA0ND3FN274477','2019/05/29','3:38 AM','5/30/2019','3:38 AM','User/centric','5'),
    ('True',28,'South','Corry','bwhistan1l@sohu.com','gphlippsen7@gizmodo.com','2G4WC582971273551','2019/03/23','11:06 AM','3/24/2019','11:06 AM','systematic','2'),
    ('True',30,'Norway Maple','Washington','wsterzaker1n@mayoclinic.com','iprendeguest9@t/online.de','WA1WKBFP2CA827432','2018/12/01','9:52 PM','2019/02/12','9:52 PM','tangible','3');


INSERT INTO "bid" VALUES
     ('True',5,'Red Cloud','Golf View','mmarshlandy@typepad.com','ajanik4@hud.gov','1G4HD57266U331769','2019/08/04','7:31 PM', null, null, null, null),
     ('True',29,'Oxford','Mitchell','afeldmesser1m@mtv.com','jeirwin8@seesaa.net','1FTNF2A57AE392390','2019/10/02','5:30 PM',null, null, null, null);

INSERT INTO "bid" VALUES
     ('False',5,'Red Cloud','Golf View','mmarshlandy@typepad.com','ajanik4@hud.gov','1G4HD57266U331769','2019/08/04','7:31 PM', null, null, null, null),
     ('False',29,'Oxford','Mitchell','afeldmesser1m@mtv.com','jeirwin8@seesaa.net','1FTNF2A57AE392390','2019/10/02','5:30 PM',null, null, null, null);

