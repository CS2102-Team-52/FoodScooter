CREATE TABLE Users (
    uid INTEGER PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Customers (
    cid INTEGER PRIMARY KEY,
    creditCardNumber INTEGER,
    rewardPoints INTEGER,
    recentPlaces INTEGER ARRAY,
    FOREIGN KEY (cid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE Orders (
    oid INTEGER PRIMARY KEY,
    totalCost INTEGER,
    deliveryFee INTEGER,
    paymentType INTEGER,
    location VARCHAR(100),
    orderTime TIMESTAMP,
    departureTime TIMESTAMP,
    restaurantArrivalTime TIMESTAMP,
    restaurantDepartureTime TIMESTAMP,
    deliveryTime TIMESTAMP
)
