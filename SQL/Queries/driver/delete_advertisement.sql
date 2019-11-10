delete from advertisesTrip 
where email = 'saiabhishek.karnati@gmail.com'
and vehicle = 'sgx2271ewds'
and start_loc = 'NUS'
and end_loc = 'Yishun'
and a_date = '2019-01-01'
and a_time = '01:01:00';

/*with B as (select P.email_driver as drive, P.vehicle as car, P.pax-W.count as current_pax
from  (select distinct Q1.email_driver, count(Q2.email_driver)
                from 
                    (select distinct email_driver, count(*)
                    from bid
                    group by email_driver) Q1
                left join 
                    (select distinct email_driver, count(*) 
                    from bid 
                    where is_win is true
                    group by email_driver) Q2
                on Q1.email_driver = Q2.email_driver
                group by Q1.email_driver
            union
            select distinct D.email as email_driver, 0 as count 
                from driver D left join bid B
                on D.email = B.email_driver
                where B.email_driver is null) W, 
        (select distinct A.email as email_driver, A.vehicle, V.pax
            from vehicles V, advertisestrip A 
            where V.license_plate = A.vehicle) P
where W.email_driver = P.email_driver and W.email_driver = email)



delete from advertisesTrip where B.current_pax
 = (select V.pax from Vehicles V where V.vehicle = B.car) and B.drive = A.email;*/
