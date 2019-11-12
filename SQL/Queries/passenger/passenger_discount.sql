/*gets the current tier with the amount of discount discount*/
/*total expenditure*/
with TE as (select distinct email_bidder, sum(amount) as total_expenditure
from bid
where e_date is not null
group by email_bidder),
/*must combine with passengers who have not made any bids yet*/

/*get the tier of the passenger*/
T as (select distinct email_bidder, 
    case 
        when (total_expenditure < 500) then 0
        when (total_expenditure >= 500 and total_expenditure < 1000) then 1 
        when (total_expenditure >= 1000 and total_expenditure < 1500) then 2
        when (total_expenditure >= 1500 and total_expenditure < 2000) then 3
        when (total_expenditure >= 2000 and total_expenditure < 2500) then 4
        when (total_expenditure >= 2500) then 5
    end as tier
from TE)

select distinct T.email_bidder, D.tier, D.amount/100 as discount, D.description 
from T, discount D
where D.tier = T.tier;

/*compiled query*/
with Q1 as (select distinct T.email_bidder, D.tier, D.amount/100 as discount, D.description  
                from (select distinct email_bidder, 
                            case 
                                when (total_expenditure < 500) then 0
                                when (total_expenditure >= 500 and total_expenditure < 1000) then 1 
                                when (total_expenditure >= 1000 and total_expenditure < 1500) then 2
                                when (total_expenditure >= 1500 and total_expenditure < 2000) then 3
                                when (total_expenditure >= 2000 and total_expenditure < 2500) then 4
                                when (total_expenditure >= 2500) then 5
                            end as tier
                        from (select distinct email_bidder, sum(amount) as total_expenditure
                                from bid
                                where e_date is not null
                                group by email_bidder) TE) T, 
                discount D
                where D.tier = T.tier)

(select email as email_bidder, 0 as tier, 0 as discount, 'no discount' as description
from passenger 
where email not in 
(select distinct email_bidder as email from Q1))
union 
select email_bidder, tier, discount, description from Q1;

/*number of discount coupons*/
select distinct email, count(*)
from gets
where is_used is false
group by email;

/*insertion of the current tier into the gets table*/
with Q1 as (select distinct T.email_bidder, D.tier, D.amount/100 as discount, D.description  
                from (select distinct email_bidder, 
                            case 
                                when (total_expenditure < 500) then 0
                                when (total_expenditure >= 500 and total_expenditure < 1000) then 1 
                                when (total_expenditure >= 1000 and total_expenditure < 1500) then 2
                                when (total_expenditure >= 1500 and total_expenditure < 2000) then 3
                                when (total_expenditure >= 2000 and total_expenditure < 2500) then 4
                                when (total_expenditure >= 2500) then 5
                            end as tier
                        from (select distinct email_bidder, sum(amount) as total_expenditure
                                from bid
                                where e_date is not null
                                group by email_bidder) TE) T, 
                discount D
                where D.tier = T.tier)
insert into gets(email, tier) 
select email_bidder, tier
from ((select distinct email as email_bidder, 0 as tier, 0 as discount, 'no discount' as description
        from passenger 
        where email not in 
        (select distinct email_bidder as email from Q1))
        union 
        select distinct email_bidder, tier, discount, description from Q1) DP
where not exists (select distinct * from gets 
                    where email = DP.email_bidder and tier = DP.tier);

/*available discounts*/
select G.email, D.tier, (1-D.amount/100) as discount, D.description  
from gets G, discount D 
where is_used is false
and D.tier = G.tier
and email = 'saiabhishek.karnati@gmail.com';
                    

/*get highest tier from gets table*/
select G.email, G.tier, D.amount/100 as discount, D.description
from gets G, discount D
where is_used is false
and G.tier = D.tier
order by tier desc;


