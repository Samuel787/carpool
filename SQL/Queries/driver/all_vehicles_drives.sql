select distinct D.license_plate, V.pax
from drives D, vehicles V
where D.license_plate = V.license_plate
and D.email = $1;
