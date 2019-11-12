select L.loc_name as location, T.total_bids, AB.average_bid
from Location L, 
    (select distinct start_loc as location, avg(amount) as average_bid
    from bid
    where s_time between '22:00:00' and '00:00:00'
    group by location
    ) AB, 
    (select distinct start_loc as location, count(*) as total_bids
    from bid
    where s_time between '22:00:00' and '00:00:00'
    group by start_loc
    ) T
where L.loc_name = AB.location and L.loc_name = T.location;
