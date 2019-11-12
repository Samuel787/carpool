select L.loc_name as location, T.total_bids, AB.average_bid
from Location L, 
    (select distinct start_loc as location, avg(amount) as average_bid
    from bid
    group by location
    ) AB, 
    (select distinct start_loc as location, count(*) as total_bids
    from bid
    group by start_loc
    ) T
where L.loc_name = AB.location and L.loc_name = T.location;
