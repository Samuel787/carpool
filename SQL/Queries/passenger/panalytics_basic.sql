with AVG_BID as (
    select distinct start_loc as location, avg(amount) as average_bid
    from bid
    group by location),

WIN_BIDS as (
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
    group by location), 

WIN_PERCENT as (
    select distinct TOTAL.start_loc as location, (((WIN.frequency)*100)/(TOTAL.frequency)) as percent
    from (
        select distinct TOTAL.start_loc, count(W.start_loc) as frequency
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
            group by TOTAL.start_loc) 
        as WIN, (select distinct start_loc, count(*) as frequency
            from bid
            group by start_loc) as TOTAL
    where WIN.start_loc = TOTAL.start_loc)
    
select L.loc_name as location, WB.successful_bids, WP.percent, AB.average_bid
from Location L, AVG_BID AB, WIN_BIDS WB, WIN_PERCENT WP
where L.loc_name = AB.location and L.loc_name = WB.location and L.loc_name = WP.location;


