select P.name as driver, B.email_bidder, B.email_driver, B.start_loc, B.end_loc, B.s_date, B.s_time 
from bid B, passenger P 
where B.email_driver = P.email 
and B.e_date is null 
and B.email_bidder = $1;
