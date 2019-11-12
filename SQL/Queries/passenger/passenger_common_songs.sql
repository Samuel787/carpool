select distinct P.email, count(*) as common_songs
from likes L inner join plays P 
on L.name = P.name
where L.email = 'ayurenev5@icio.us'
group by P.email;
