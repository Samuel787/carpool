/*to get the vehicles with no occupancy*/
select T.email_driver, T.vehicle, (T.pax - O.occupancy) as current_pax
from (select D.email as email_driver, D.license_plate as vehicle, V.pax
        from drives D, vehicles V
        where D.license_plate = V.license_plate) T,
((select email as email_driver, license_plate as vehicle, 0 as occupancy 
    from drives 
    where (email, license_plate) 
        not in (select Q1.email_driver, Q1.vehicle
                    from 
                        (select email_driver, vehicle, count(*)
                        from bid
                        where e_date is null
                        group by email_driver, vehicle) Q1
                    left join 
                        (select email_driver, vehicle, count(*) 
                        from bid 
                        where is_win is true
                        and e_date is null
                        group by email_driver, vehicle) Q2
                    on  Q1.vehicle = Q2.vehicle
                    and Q1.email_driver = Q2.email_driver
                    group by Q1.email_driver, Q1.vehicle))
union 
/*to get occupancy*/
(select Q1.email_driver, Q1.vehicle, coalesce(sum(Q2.count),0) as occupancy
    from 
        (select email_driver, vehicle, count(*)
        from bid
        where e_date is null
        group by email_driver, vehicle) Q1
    left join 
        (select email_driver, vehicle, count(*) 
        from bid 
        where is_win is true
        and e_date is null
        group by email_driver, vehicle) Q2
    on  Q1.vehicle = Q2.vehicle
    and Q1.email_driver = Q2.email_driver
    group by Q1.email_driver, Q1.vehicle)) O
where T.email_driver = O.email_driver and T.vehicle = O.vehicle;

/*
select distinct P.email_driver, P.vehicle, P.pax-W.count as current_pax
from  (select Q1.email_driver, coalesce(sum(Q2.count),0) as count
            from 
                (select email_driver, count(*)
                from bid
                where e_date is null
                group by email_driver) Q1
            left join 
                (select email_driver, count(*) 
                from bid 
                where is_win is true
                and e_date is null
                group by email_driver) Q2
            on Q1.email_driver = Q2.email_driver
            group by Q1.email_driver
        union
        select D.email as email_driver, 0 as count 
            from driver D left join bid B
            on D.email = B.email_driver
            where B.email_driver is null) W, 
        (select distinct A.email as email_driver, A.vehicle, V.pax
            from vehicles V, advertisestrip A 
            where V.license_plate = A.vehicle) P
where W.email_driver = P.email_driver*/
