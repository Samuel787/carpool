--Trigger to check if advertistment is deleted once ride is accepted
update bid set is_win = true where email_bidder = 'shagergham0@theatlantic.com' and email_driver = 'ayurenev5@icio.us' and s_date = '2018-12-21' and s_time = '09:10:00'
delete from advertisesTrip where start_loc = 'Queenstown' and email = 'ayurenev5@icio.us' and a_date = '2018-12-21' and a_time = '09:10:00';

--Trigger to check if an invalid bid can be made to an advertistment that does not exist
insert into bid(is_win, s_date, s_time, amount, start_loc, end_loc, email_bidder, email_driver, vehicle) values ('false', '2018-12-21', '09:11:00', '25.3', 'Queenstown', 'NUS', 'shagergham0@theatlantic.com', 'ayurenev5@icio.us', 'SBD0170');

--Trigger to check if an entry tier inserted is lower than the current tier the user is on
insert into gets(email, tier, is_used, exp_date) values ('ayurenev5@icio.us', 4, 'false', '2019-11-01');
insert into gets(email, tier, is_used, exp_date) values ('ayurenev5@icio.us', 3, 'false', '2019-10-02');

--Trigger to check if an unused tier can be deleted
update gets set is_used = true where email =  'ayurenev5@icio.us' and tier = 1;
delete from gets where email =  'ayurenev5@icio.us' and tier = 1;
delete from gets where email =  'ayurenev5@icio.us' and tier = 2;
