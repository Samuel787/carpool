select B.email_bidder, P.name, B.vehicle, B.s_date, B.s_time, B.e_date, B.e_time, B.review, B.rating
from bid B, passenger P
where P.email = B.email_driver;

