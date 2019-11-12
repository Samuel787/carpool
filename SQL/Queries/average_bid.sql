select distinct start_loc as location, start_time, avg(amount) as average_bid
from bid
group by location
order by avg(amount) desc;