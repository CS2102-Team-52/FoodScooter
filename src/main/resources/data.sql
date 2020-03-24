CREATE TYPE daysEnum AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
CREATE TYPE shiftsEnum AS ENUM ('10am', '11am', '12pm', '1pm');
CREATE TYPE hoursEnum AS ENUM ('10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm');

CREATE TABLE Users (
    uid INTEGER PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE DeliveryRiders (
	drid INTEGER PRIMARY KEY,
	salary MONEY,
	FOREIGN KEY (drid) REFERENCES Users (uid) ON DELETE CASCADE	
);

-- daysEnum specifies the starting day of the 5 consecutive days
-- shiftsEnum specifies the starting hour of the respective shift option
CREATE TABLE FTSchedules (
	fsid INTEGER PRIMARY KEY,
	daysOption daysEnum,
	shiftsOption shiftsEnum
);

-- fsid = id of assigned schedule
CREATE TABLE FTRiders (
	drid INTEGER PRIMARY KEY,
	fsid INTEGER,
	FOREIGN KEY (drid) REFERENCES DeliveryRiders,
	FOREIGN KEY (fsid) REFERENCES FTSchedules
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

-- psid = id of assigned schedule
CREATE TABLE PTRiders (
	drid INTEGER PRIMARY KEY,
	psid INTEGER,
	FOREIGN KEY (drid) REFERENCES DeliveryRiders,
	FOREIGN KEY (psid) REFERENCES PTSchedules
);

CREATE TABLE Customers (
    cid INTEGER PRIMARY KEY,
    creditCardNumber INTEGER,
    rewardPoints INTEGER,
    recentPlaces INTEGER ARRAY,
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

-- pid = id of promotion offered by restaurant
CREATE TABLE Restaurants (
	rid INTEGER PRIMARY KEY,
	name VARCHAR(100),
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

CREATE TABLE Reviews (
	rvid INTEGER PRIMARY KEY,
	rating INTEGER,
	content VARCHAR(1000)
);

CREATE TABLE Orders (
    oid INTEGER PRIMARY KEY,
	drid INTEGER,
	rvid INTEGER,
    totalCost INTEGER,
    deliveryFee MONEY,
    paymentType INTEGER,
    location VARCHAR(100),
    orderTime TIMESTAMP,
    departureTime TIMESTAMP,
    restaurantArrivalTime TIMESTAMP,
    restaurantDepartureTime TIMESTAMP,
    deliveryTime TIMESTAMP,
	FOREIGN KEY (drid) REFERENCES DeliveryRiders,
	FOREIGN KEY (rvid) REFERENCES Reviews
);

CREATE TABLE OrdersContains (
	oid INTEGER,
	fid INTEGER,
	PRIMARY KEY (oid, fid),
	FOREIGN KEY (oid) REFERENCES Orders,
	FOREIGN KEY (fid) REFERENCES FoodItems
);
