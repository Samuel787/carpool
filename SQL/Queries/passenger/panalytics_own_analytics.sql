
select * from 
/*passengers who have not completed any trips yet*/
((select distinct email as email_bidder, 0 as expenditure, 0 as avg_price, 0 as current_tier, 0 as discount_coupons
from bid, passenger
where email not in (select distinct email_bidder from bid where e_date is not null))
union
/*passengers who have completed trips*/
(select distinct T.email_bidder, T.expenditure, A.avg_price, DP.tier as current_tier, DC.count as discount_coupons
from (select distinct email_bidder, sum(amount) as expenditure
        from bid 
        where is_win is true 
        and e_time is not null 
        and e_date is not null
        group by email_bidder) T,
    (select distinct email_bidder, avg(amount) as avg_price
        from bid 
        where is_win is true
        and e_time is not null
        and e_date is not null
        group by email_bidder) A,
    (select distinct T.email_bidder, D.tier, D.amount/100 as discount
        from (select distinct email_bidder, 
                    case 
                        when (total_expenditure < 500) then 0
                        when (total_expenditure >= 500 and total_expenditure < 1000) then 1 
                        when (total_expenditure >= 1000 and total_expenditure < 1500) then 2
                        when (total_expenditure >= 1500 and total_expenditure < 2000) then 3
                        when (total_expenditure >= 2000 and total_expenditure < 2500) then 4
                        when (total_expenditure >= 2500) then 5
                    end as tier
                from (select distinct email_bidder, sum(amount) as total_expenditure
                        from bid
                        where e_date is not null
                        group by email_bidder) TE) T, 
        discount D
        where D.tier = T.tier) DP,
    (select distinct email, count(*)
        from gets
        where is_used is false
        group by email) DC
where T.email_bidder = A.email_bidder
and T.email_bidder = DP.email_bidder
and T.email_bidder = DC.email)) Q
where email_bidder = $1;
