CREATE TABLE IF NOT EXISTS "discount" (
    "description" TEXT,
    "tier" INT,
    "amount" INT
);
INSERT INTO "discount" VALUES
    ('secured line',1,10),
    ('database',2,20),
    ('static',3,30),
    ('client-driven',4,40),
    ('leverage',5,50);
