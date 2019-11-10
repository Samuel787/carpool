select distinct N.name, A.email, CP.current_pax, A.start_loc, A.end_loc, A.a_date, A.a_time
                            from advertisesTrip A, 
                                (select distinct P.name, P.email 
                                    from passenger P, advertisesTrip A
                                    where P.email = A.email) N, 
                                 (select T.email_driver, T.vehicle, (T.pax - O.occupancy) as current_pax
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
                                    where T.email_driver = O.email_driver and T.vehicle = O.vehicle) CP
                            where N.email = A.email
                            and CP.email_driver = A.email
                            and CP.vehicle = A.vehicle
                            order by A.a_date desc, A.a_time desc;
                            