select L.email, L.name, S.artist, S.duration
from likes L, songs S
where L.name = S.name
and L.email = $1;
