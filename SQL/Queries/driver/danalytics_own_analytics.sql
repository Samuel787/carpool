select * from
((select distinct email as email_driver, 0 as avg_price, 0 as rating
    from bid, driver
    where email not in (select distinct email_driver from bid where e_date is not null))
union
(select A.email_driver, A.avg_price, coalesce(R.rating,0)
from (select distinct email_driver, avg(amount) as avg_price
        from bid 
        where is_win is true
        and e_time is not null
        and e_date is not null
        group by email_driver) A, 
    (select distinct email_driver, avg(rating) as rating
        from bid
        where is_win is true 
        and e_date is not null 
        and e_time is not null
        group by email_driver) R
where A.email_driver = R.email_driver)) Q
where email_driver = $1;
