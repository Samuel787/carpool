/*Users*/
insert into Passenger (email, name, password, credit_card_num) values ('shagergham0@theatlantic.com', 'Stanton', '5jBNmUMac', '3588017154768897');
insert into Passenger (email, name, password, credit_card_num) values ('ucramphorn1@netlog.com', 'Ulrika', 'krr0DG', '3589400719730926');
insert into Passenger (email, name, password, credit_card_num) values ('shutchence2@usnews.com', 'Sydel', 'KV1hWJpnpJUS', '6397158122038049');
insert into Passenger (email, name, password, credit_card_num) values ('tcrudgington3@godaddy.com', 'Tedd', 'sYlVvV','5472598607645000');
insert into Passenger (email, name, password, credit_card_num) values ('cbramall4@ebay.co.uk', 'Celina', 'namgQWvdERKm', '3546847301117122');

insert into Passenger (email, name, password, credit_card_num) values ('ayurenev5@icio.us', 'Arda', 'aTMTCuI6', '5048374634817862');
insert into Passenger (email, name, password, credit_card_num) values ('rdoog6@yandex.ru', 'Rochelle', 'G7QOE31q', '3587317118342719');
insert into Passenger (email, name, password, credit_card_num) values ('jcashen7@aboutads.info', 'Jennette', 'g1RGdRnEcO', '4026815258736217');
insert into Passenger (email, name, password, credit_card_num) values ('vdequesne8@youku.com', 'Vilma', 'lVejJ4MsuCgv', '30102868370402');
insert into Passenger (email, name, password, credit_card_num) values ('bmulligan9@networkadvertising.org', 'Bertrando', 'WC3J3qm', '3582676673571540');


/*Driver*/
insert into Driver (email) values ('ayurenev5@icio.us');
insert into Driver (email) values ('rdoog6@yandex.ru');
insert into Driver (email) values ('jcashen7@aboutads.info');
insert into Driver (email) values ('vdequesne8@youku.com');
insert into Driver (email) values ('bmulligan9@networkadvertising.org');

/*Vehicles*/
insert into Vehicles (license_plate, pax) values ('SBD0170', '3');
insert into Vehicles (license_plate, pax) values ('SAL4224', '5');
insert into Vehicles (license_plate, pax) values ('SYS4775', '6');
insert into Vehicles (license_plate, pax) values ('WAU3968', '4');
insert into Vehicles (license_plate, pax) values ('SGD9065', '5');

/*Drives*/
insert into Drives (email, license_plate) values ('ayurenev5@icio.us','SBD0170');
insert into Drives (email, license_plate) values ('rdoog6@yandex.ru','SAL4224');
insert into Drives (email, license_plate) values ('jcashen7@aboutads.info','SYS4775');
insert into Drives (email, license_plate) values ('vdequesne8@youku.com','WAU3968');
insert into Drives (email, license_plate) values ('bmulligan9@networkadvertising.org','SGD9065');

/*locations*/
insert into location(loc_name, loc_add) values ('Queenstown','159432');
insert into location(loc_name, loc_add) values ('Jurong','178543');
insert into location(loc_name, loc_add) values ('Ang Mo Kio','760234');
insert into location(loc_name, loc_add) values ('Bishan','643793');
insert into location(loc_name, loc_add) values ('Toa Payoh','784393');
insert into location(loc_name, loc_add) values ('NUS','439924');
insert into location(loc_name, loc_add) values ('Yishun','329483');
insert into location(loc_name, loc_add) values ('Yio Chu Kang','347294');
insert into location(loc_name, loc_add) values ('Raffles','943554');
insert into location(loc_name, loc_add) values ('Pasir Ris','984321');

/*advertisesTrip*/
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Queenstown', 'NUS', 'ayurenev5@icio.us', 'SBD0170', '2018-12-21', '09:10:00');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Jurong', 'Yishun', 'rdoog6@yandex.ru', 'SAL4224', '2018-12-23', '12:20:00');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Ang Mo Kio', 'Yio Chu Kang', 'jcashen7@aboutads.info', 'SYS4775', '2018-11-11', '19:41:30');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Bishan', 'Raffles', 'vdequesne8@youku.com', 'WAU3968', '2018-02-19', '15:29:02');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Toa Payoh', 'Pasir Ris', 'bmulligan9@networkadvertising.org', 'SGD9065', '2018-12-21', '23:51:13');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Queenstown', 'NUS', 'ayurenev5@icio.us', 'SBD0170', '2018-12-23', '10:10:00');
insert into advertisesTrip (start_loc, end_loc, email, vehicle, a_date,a_time) values ('Queenstown', 'NUS', 'ayurenev5@icio.us', 'SBD0170', '2018-12-24', '10:10:00');

/*bid without end and no rating*/
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-12-21', '09:10:00', '25.3', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us', 'SBD0170');
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('false', '2018-12-23', '12:20:00', '19.5', 'Jurong', 'Yishun', 'ucramphorn1@netlog.com', 'rdoog6@yandex.ru', 'SAL4224');
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-11-11', '19:41:30','18.6', 'Ang Mo Kio', 'Yio Chu Kang', 'shutchence2@usnews.com', 'jcashen7@aboutads.info',  'SYS4775');
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-02-19', '15:29:02', '21', 'Bishan', 'Raffles', 'tcrudgington3@godaddy.com', 'vdequesne8@youku.com', 'WAU3968');
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-12-21', '23:51:13', '35', 'Toa Payoh', 'Pasir Ris', 'cbramall4@ebay.co.uk', 'bmulligan9@networkadvertising.org', 'SGD9065'  );
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-12-23', '10:10:00', '2.1', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us',  'SBD0170' );
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('true', '2018-12-24', '10:10:00', '28.5', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us',  'SBD0170' );

/*discounts*/
insert into discount(description, tier, amount) values ('no discount', 0, 0);
insert into discount(description, tier, amount) values ('10% coupon', 1, 10);
insert into discount(description, tier, amount) values ('20% coupon', 2, 20);
insert into discount(description, tier, amount) values ('30% coupon', 3, 30);
insert into discount(description, tier, amount) values ('40% coupon', 4, 40);
insert into discount(description, tier, amount) values ('50% coupon', 5, 50);

/*gets*/
insert into gets(email, tier, is_used, exp_date) values ('ayurenev5@icio.us', 1, 'false', '2019-11-01');
insert into gets(email, tier, is_used, exp_date) values ('ayurenev5@icio.us', 2, 'false', '2019-10-02');

/*messages*/
insert into message(sender_email, receiver_email, msg, msg_time, msg_date) values ('ayurenev5@icio.us','cbramall4@ebay.co.uk','hello1','09:10:00','2018-12-21');
insert into message(sender_email, receiver_email, msg, msg_time, msg_date) values ('cbramall4@ebay.co.uk','rdoog6@yandex.ru','hello 2','19:41:30','2018-12-23');
insert into message(sender_email, receiver_email, msg, msg_time, msg_date) values ('rdoog6@yandex.ru','ayurenev5@icio.us','hello 3','15:29:02','2018-11-11');
insert into message(sender_email, receiver_email, msg, msg_time, msg_date) values ('ayurenev5@icio.us','rdoog6@yandex.ru','hello 4','10:10:00','2018-12-21');
insert into message(sender_email, receiver_email, msg, msg_time, msg_date) values ('cbramall4@ebay.co.uk','ayurenev5@icio.us','hello 5','23:51:13','2018-12-21');

insert into songs(name, duration, artist) values ('bang bang', '00:03:56', 'nirvana');
insert into songs(name, duration, artist) values ('hello', '00:04:01', 'adele');
insert into songs(name, duration, artist) values ('numb', '00:02:59', 'linkin park');

insert into likes(email, name) values ('ayurenev5@icio.us','bang bang');
insert into likes(email, name) values ('cbramall4@ebay.co.uk','hello');
insert into likes(email, name) values ('rdoog6@yandex.ru','numb');
insert into likes(email, name) values ('rdoog6@yandex.ru','bang bang');

insert into plays(email, name) values ('ayurenev5@icio.us','bang bang');
insert into plays(email, name) values ('cbramall4@ebay.co.uk','hello');
insert into plays(email, name) values ('rdoog6@yandex.ru','numb');
insert into plays(email, name) values ('rdoog6@yandex.ru','bang bang');

insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('true', '2018-12-21', '09:10:00', '2018-12-21', '10:10:00', '25.3', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us', 'SBD0170', '3');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('false', '2018-12-23', '12:20:00', '2018-12-24', '13:20:00', '19.5', 'Jurong', 'Yishun', 'ucramphorn1@netlog.com', 'rdoog6@yandex.ru', 'SAL4224', '5');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('true', '2018-11-11', '19:41:30', '2018-11-11',  '23:41:30','18.6', 'Ang Mo Kio', 'Yio Chu Kang', 'shutchence2@usnews.com', 'jcashen7@aboutads.info',  'SYS4775', '3.2');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('true', '2018-02-19', '15:29:02', '2018-02-19', '21:29:02', '21', 'Bishan', 'Raffles', 'tcrudgington3@godaddy.com', 'vdequesne8@youku.com', '', '1.2');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('true', '2018-12-21', '23:51:13', '2018-12-22', '00:50:13', '35', 'Toa Payoh', 'Pasir Ris', 'cbramall4@ebay.co.uk', 'bmulligan9@networkadvertising.org', 'WAU3968',  '5');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('false', '2018-12-23', '10:10:00', '2018-12-24', '11:10:00', '2.1', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us',  'SBD0170', '3');
insert into bid(is_win, s_date, s_time, e_date, e_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle, rating) values ('false', '2018-12-24', '10:10:00', '2018-12-25', '11:10:00', '28.5', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us',  'SBD0170', '3');
 