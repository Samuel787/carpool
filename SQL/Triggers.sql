drop function if exists won CASCADE;
drop trigger if exists check_delete_trip;
drop function if exists uses CASCADE;
drop trigger if exists check_highest_tier;
drop function if exists redeem CASCADE;
drop trigger if exists safe_to_delete;
drop function if exists advertise CASCADE;
drop trigger if exists check_bid_trip;

--checks if there is a corresponding advertistment for the bid
create or replace function advertise()
returns trigger as $$
declare count NUMERIC;
BEGIN
    select COUNT(*) into count from AdvertisesTrip A
    where A.start_loc = NEW.start_loc
    and A.email = NEW.email_driver
    and A.a_date = NEW.s_date
    and A.a_time = NEW.s_time;
    IF count = 1 THEN
        RETURN NEW;
    ELSE
        RETURN NULL;
    END IF;
END;
$$ language plpgsql;

create trigger check_bid_trip
before insert 
on bid
for each row
execute procedure advertise();


--checks if a bid has been accepted by the driver before deleting the advertisement
create or replace function won()
returns trigger as $$
declare count NUMERIC;
BEGIN
   select COUNT(*) into count from bid B
   where B.start_loc = OLD.start_loc
   and B.email_driver = OLD.email
   and B.is_win
   and B.s_date = OLD.a_date
   and B.s_time = OLD.a_time;
   IF count = 1 THEN
      RETURN OLD;
   ELSE 
      RETURN NULL;
   END IF;
END;
$$ language plpgsql;

--check if the new tier obtained by the user is greater than any of them in the gets entity
create trigger check_delete_trip
before delete
on AdvertisesTrip
for each row 
execute procedure won();

create or replace function uses()
returns trigger as $$
BEGIN
    IF NEW.tier > ALL (SELECT G1.tier from gets G1 where G1.email = NEW.email) THEN
        return NEW;
    ELSE
        return NULL;
    END IF;
END;   
$$ LANGUAGE plpgsql;

create trigger check_highest_tier
before INSERT on gets
for each row
execute procedure uses();

--check if the discount is used before deleting
create or replace function redeem()
returns trigger as $$
begin 
    IF OLD.is_used THEN
        raise notice 'safe to delete'; return OLD;
    ELSE 
        return NULL;
    END IF;
end;
$$ language plpgsql;

create trigger safe_to_delete
before delete 
on gets
for each row
execute procedure redeem();

WITH B AS (select T.email_driver as driver, T.vehicle, (T.pax - O.occupancy) as current_pax
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
where T.email_driver = O.email_driver and T.vehicle = O.vehicle);

--prevent driver from accepting any more bids
create or replace function no_accept()
returns trigger as $$
BEGIN  
    IF B.driver = NEW.driver and B.current_pax > 0
    THEN
    return NEW;
    ELSE 
    IF B.driver = NEW.driver and B.current_pax == 0
    THEN return NULL;
    END IF;
END;
$$ language plpgsql;

create trigger prevent_bid
before update
on bid
for each row
execute procedure no accept();






       