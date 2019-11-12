select distinct TOTAL.start_loc as location, count(W.start_loc) as successful_bids
from 
    (select distinct start_loc, count(*) as frequency
    from bid
    group by start_loc) as TOTAL
left join 
    (select distinct start_loc, count(*) as frequency
    from bid 
    where is_win is true
    group by start_loc) as W
on TOTAL.start_loc = W.start_loc
group by location
order by successful_bids desc;