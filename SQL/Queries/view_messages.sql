select distinct Q.msg_date, Q.msg_time, Q.sender, Q.sender_email, P.name as receiver, Q.receiver_email, Q.msg
from (select distinct M.msg_date, M.msg_time, P.name as sender, M.sender_email, M.receiver_email, M.msg
from message M, passenger P
where P.email = M.sender_email) Q, passenger P
where P.email = Q.receiver_email
order by Q.msg_date desc, Q.msg_time desc;
