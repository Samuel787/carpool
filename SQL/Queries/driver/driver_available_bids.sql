select distinct N.name, B.email_bidder, B.vehicle, B.start_loc, B.end_loc, B.amount, B.s_date, B.s_time
from Bid B, 
    (select distinct P.name, P.email
        from passenger P, bid B
        where P.email = B.email_bidder) N
where B.email_bidder = N.email
and B.email_driver = 'e0311192@u.nus.edu'
and B.is_win is false;
