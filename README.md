# CS2102 Group 45 
## TOPIC Carpooling

RideShare
This is a CS2102 Project done during AY19/20 S1. It allows users to sign up, then depending on when they sign up, they will be able to select if they want to be a driver or they want to be a passenger. Drivers are able to advertise rides and passengers are able to bid for rides. Drivers can then accept the bids in real time. At the end of the ride users can give a rating to the driver and pay for their rides. There are several other unique features like ratings, analytics, messaging, recommendations etc.

## Our Team
1. Karnati Sai Abhishek
2. Suther David Samuel
3. Priyan Rajamohan
4. Marc Phua

## Quick Start
First, clone repo
```
$ git clone https://github.com/Samuel787/carpool.git
$ cd App
```
Create a .env file inside App folder with the following information in the specified format:
```
DATABASE URL=postgres://<username>:<password>@<host address>:<port>/<database name>
SESSION_SECRET=secret    
```
To start the client on localhost:3000:
```
$ node bin/www
```
## Dependencies
```
npm i passport passport-local express-session express-flash dotenv bcrypt
```

## Instructions to Running Schema on PSQL prior to usage
```
Run schema.sql in the directory SQL in your psql database before launching the server
```
