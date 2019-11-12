select distinct P.name as passenger, B.email_bidder, B.email_driver, B.e_date, B.e_time, B.start_loc, B.end_loc, B.review, B.rating 
from bid B, passenger P
where B.e_date is not null
and P.email = B.email_bidder 
and B.email_driver = 'e@u.nus.edu'
order by B.e_date desc, B.e_time desc;
