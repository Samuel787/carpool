select distinct P.name, R.email_driver, R.rating, Q.common_songs
from (select distinct email_driver, avg(rating) as rating 
        from bid B
        where B.is_win is true 
        and B.e_date is not null and B.e_time is not null
        group by email_driver) R, 
    (select distinct P.email, count(*) as common_songs
        from likes L inner join plays P 
        on L.name = P.name
        where L.email = 'ayurenev5@icio.us'
        group by P.email) Q, 
    passenger P
where R.email_driver = Q.email
and P.email = R.email_driver
order by rating desc, common_songs desc;
