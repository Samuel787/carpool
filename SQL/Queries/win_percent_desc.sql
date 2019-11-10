/*percent of is_win bids*/
with TOTAL as (select distinct start_loc, count(*) as frequency
        from bid
        group by start_loc)

select distinct TOTAL.start_loc as location, (((WIN.frequency)*100)/(TOTAL.frequency)) as percent
from (
    select distinct TOTAL.start_loc, count(W.start_loc) as frequency
    from 
        TOTAL
    left join 
        (select distinct start_loc, count(*) as frequency
         from bid 
         where is_win is true
         group by start_loc) as W
         on TOTAL.start_loc = W.start_loc
         group by TOTAL.start_loc) 
    as WIN, TOTAL
where WIN.start_loc = TOTAL.start_loc
order by percent desc;