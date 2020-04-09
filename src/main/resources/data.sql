DROP TYPE IF EXISTS daysEnum CASCADE;
DROP TYPE IF EXISTS shiftsEnum CASCADE;
DROP TYPE IF EXISTS hoursEnum CASCADE;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS DeliveryRiders CASCADE;
DROP TABLE IF EXISTS FTRiders CASCADE;
DROP TABLE IF EXISTS FTSchedules CASCADE;
DROP TABLE IF EXISTS PTRiders CASCADE;
DROP TABLE IF EXISTS PTSchedules CASCADE;
DROP TABLE IF EXISTS PTShifts CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS FDSManagers CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS RestaurantStaff CASCADE;
DROP TABLE IF EXISTS FoodItems CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Feedback CASCADE;

/*
CREATE TYPE daysEnum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
CREATE TYPE shiftsEnum AS ENUM ('10am', '11am', '12pm', '1pm');
CREATE TYPE hoursEnum AS ENUM ('10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm');
*/

CREATE TABLE Users (
    uid INTEGER PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL /* NEW */
);

CREATE TABLE DeliveryRiders (
    drid INTEGER PRIMARY KEY,
    salary MONEY,
    FOREIGN KEY (drid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE FTRiders (
    drid INTEGER PRIMARY KEY,
    dayOption INTEGER check(dayOption in (1,2,3,4,5,6,7)),
	shiftOption INTEGER check(shiftOption in (1,2,3,4)),
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid) ON DELETE CASCADE
);

/*
CREATE TABLE PTSchedules (
    psid INTEGER PRIMARY KEY,
    totalHours INTEGER
);
*/

/* psid = id of assigned schedule */
CREATE TABLE PTRiders (
    drid INTEGER PRIMARY KEY,
    psid INTEGER,
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid) ON DELETE CASCADE
--     FOREIGN KEY (psid) REFERENCES PTSchedules
);

CREATE TABLE PTShifts (
    ptsid INTEGER PRIMARY KEY,
    drid INTEGER,
    dow INTEGER check(dow in (1,2,3,4,5,6,7)),
    startHour INTEGER check(startHour in (10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21)),
    endHour INTEGER check(endHour in (11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22)),
	FOREIGN KEY (drid) REFERENCES PTRiders (drid) ON DELETE CASCADE,
	CHECK (startHour <= endHour)
);

CREATE TABLE Customers (
    cid INTEGER PRIMARY KEY,
    creditCardNumber VARCHAR(16),
    rewardPoints INTEGER,
    recentPlaces VARCHAR(100) ARRAY,
    FOREIGN KEY (cid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE FDSManagers (
    fmid INTEGER PRIMARY KEY,
    FOREIGN KEY (fmid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE Promotions (
    pid INTEGER PRIMARY KEY,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    promotionType VARCHAR(100),
    discount NUMERIC
);

/* pid = id of promotion offered by restaurant */
CREATE TABLE Restaurants (
    rid INTEGER PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(1000), /* NEW */
    mininumPurchase MONEY,
    pid INTEGER,
    FOREIGN KEY (pid) REFERENCES Promotions (pid)
);

CREATE TABLE RestaurantStaff (
    rsid INTEGER PRIMARY KEY,
    employedBy INTEGER NOT NULL,
    FOREIGN KEY (rsid) REFERENCES Users (uid) ON DELETE CASCADE,
    FOREIGN KEY (employedBy) REFERENCES Restaurants (rid)
);

CREATE TABLE FoodItems (
    fid INTEGER,
    rid INTEGER,
    name VARCHAR(100),
    category VARCHAR(100),
    price MONEY,
    dailyLimit INTEGER,
    PRIMARY KEY (fid, rid), -- make a composite key consisting of partial key and rid
    FOREIGN KEY (rid) REFERENCES Restaurants (rid) ON DELETE CASCADE
);

CREATE TABLE Orders (
    oid INTEGER PRIMARY KEY,
    cid INTEGER,
    drid INTEGER,
    rid INTEGER,
    totalCost MONEY, -- changed INTEGER to MONEY
    deliveryFee MONEY,
    paymentType VARCHAR(100), -- changed INTEGER to VARCHAR
    location VARCHAR(100),
    orderTime TIMESTAMP,
    departureTime TIMESTAMP,
    restaurantArrivalTime TIMESTAMP,
    restaurantDepartureTime TIMESTAMP,
    deliveryTime TIMESTAMP,
    FOREIGN KEY (cid) REFERENCES Customers (cid),
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid)
);

/* remove fid */
CREATE TABLE Feedback (
    fid INTEGER PRIMARY KEY,
    rid INTEGER, -- new
    oid INTEGER,
    rating INTEGER,
    review VARCHAR(1000),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid),
    FOREIGN KEY (oid) REFERENCES Orders (oid)
);


INSERT INTO Restaurants
VALUES (1, 'Ikea', 'A Swedish furniture company that is also known for their meatballs.', 10),
       (2, 'Seoul Good', 'A Korean fusion cafe by Punggol Promenade', 8),
       (3, 'Mr Chicken Rice', 'An up and coming restaurant that reinvented the Chicken Rice', 4);

INSERT INTO FoodItems
VALUES (1, 1, 'Swedish Meatballs', 'Swedish', 5, 100),
       (2, 1, 'Fried Rice', 'Local', 3, 100),
       (3, 1, 'Mushroom Soup', 'Western', 6, 100),
       (4, 1, 'Dumplings', 'Asian', 2, 150),

       (1, 2, 'Grilled Chicken Rice', 'Korean', 9.80, 100),
       (2, 2, 'Grilled Salmon Rice', 'Korean', 11.80, 100),
       (3, 2, 'Army Stew', 'Korean', 23.90, 50),
       (4, 2, 'Squid Ink Pasta', 'Western', 11.90, 100),

       (1, 3, 'Regular Chicken Rice', 'Singaporean', 3, 500),
       (2, 3, 'Cabbage with Sesame Oil', 'Singaporean', 3, 500),
       (3, 3, 'Char Siew', 'Singaporean', 3, 500);

INSERT INTO Users
VALUES (1, 'admin', 'admin', 'Customer'),
       (2, 'rider', 'rider', 'Delivery Rider');

INSERT INTO Customers
VALUES (1);

INSERT INTO DeliveryRiders
VALUES (2);

INSERT INTO Orders
VALUES (1, 1, 2, 2, 100, 10, 'Credit Card', 'Seoul Good',
        '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06'),
       (2, 1, 2, 2, 100, 10, 'Credit Card', 'Seoul Good',
        '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06'),
       (3, 1, 2, 2, 100, 10, 'Credit Card', 'Seoul Good',
        '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06'),
       (4, 1, 2, 2, 100, 10, 'Credit Card', 'Seoul Good',
        '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06', '2020-04-01 04:05:06');
