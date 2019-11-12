select distinct email_driver, avg(rating) 
from bid
where is_win is true 
and e_date is not null 
and e_time is not null
group by email_driver;
