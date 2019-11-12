/*OUTDATED*/

/*orders the average ratings of the driver descending order*/
with B as (select distinct email_driver, avg(rating) as avg_rating
from bid 
where is_win is true
group by email_driver)

select distinct U.name as driver, round(B.avg_rating,2) as avg_rating
from users U, B
where U.email = B.email_driver
order by round(B.avg_rating,2) desc;


/*maximum number of bids at any time of the day*/
select distinct s_time as time, count(*) as frequency
from bid 
group by s_time
order by count(*) desc;

/*hotspots for carpool bidding*/
with B as (select distinct start_loc, count(*) as frequency
from bid
group by start_loc)

select distinct L.loc_name as location, B.frequency
from location L, B
where L.loc_name = B.start_loc
order by B.frequency desc;

/* prints the statistics for the passenger that counts the number of successful trips from every particular location*/
with B as (select distinct start_loc, count(*) as frequency
from bid 
where is_win is True
group by start_loc)

select distinct L.loc_name as location, B.frequency
from location L, B
where L.loc_name = B.start_loc 
order by B.frequency desc;


/*average expenditure of passengers*/
with B as (select distinct email_bidder, avg(amount) as avg_expenditure
from bid
where is_win is true
group by email_bidder)

select distinct U.name as passenger, B.avg_expenditure
from users U, B
where U.email = B.email_bidder;



