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
DROP TABLE IF EXISTS Reviews CASCADE;

CREATE TYPE daysEnum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
CREATE TYPE shiftsEnum AS ENUM ('10am', '11am', '12pm', '1pm');
CREATE TYPE hoursEnum AS ENUM ('10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm');

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
    FOREIGN KEY (drid) REFERENCES DeliveryRiders ON DELETE CASCADE
);

CREATE TABLE PTSchedules (
    psid INTEGER PRIMARY KEY,
    totalHours INTEGER
);

CREATE TABLE PTShifts (
    ptsid INTEGER PRIMARY KEY,
    psid INTEGER,
    day daysEnum,
    startHour hoursEnum,
    endHour hoursEnum,
    FOREIGN KEY (psid) REFERENCES PTSchedules ON DELETE CASCADE
);

/* psid = id of assigned schedule */
CREATE TABLE PTRiders (
    drid INTEGER PRIMARY KEY,
    psid INTEGER,
    FOREIGN KEY (drid) REFERENCES DeliveryRiders ON DELETE CASCADE,
    FOREIGN KEY (psid) REFERENCES PTSchedules
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
    FOREIGN KEY (pid) REFERENCES promotions
);

CREATE TABLE RestaurantStaff (
    rsid INTEGER PRIMARY KEY,
    employedBy INTEGER NOT NULL,
    FOREIGN KEY (rsid) REFERENCES Users (uid) ON DELETE CASCADE,
    FOREIGN KEY (employedBy) REFERENCES Restaurants (rid)
);

CREATE TABLE FoodItems (
    fid INTEGER PRIMARY KEY,
    rid INTEGER,
    name VARCHAR(100),
    category VARCHAR(100),
    price MONEY,
    dailyLimit INTEGER,
    FOREIGN KEY (rid) REFERENCES Restaurants ON DELETE CASCADE
);

CREATE TABLE Orders (
    oid INTEGER PRIMARY KEY,
    cid INTEGER,
    drid INTEGER,
    totalCost INTEGER,
    deliveryFee MONEY,
    paymentType INTEGER,
    location VARCHAR(100),
    orderTime TIMESTAMP,
    departureTime TIMESTAMP,
    restaurantArrivalTime TIMESTAMP,
    restaurantDepartureTime TIMESTAMP,
    deliveryTime TIMESTAMP,
    FOREIGN KEY (cid) REFERENCES Customers,
    FOREIGN KEY (drid) REFERENCES DeliveryRiders
);

CREATE TABLE Reviews (
    rvid INTEGER PRIMARY KEY,
    fid INTEGER,
    oid INTEGER,
    rating INTEGER,
    content VARCHAR(1000),
    FOREIGN KEY (fid) REFERENCES FoodItems,
    FOREIGN KEY (oid) REFERENCES Orders
);
