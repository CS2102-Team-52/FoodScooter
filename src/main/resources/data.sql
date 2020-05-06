DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS CustomerRecentDeliveryLocations CASCADE;
DROP TABLE IF EXISTS DeliveryRiders CASCADE;
DROP TABLE IF EXISTS FTRiders CASCADE;
DROP TABLE IF EXISTS FTShift CASCADE;
DROP TABLE IF EXISTS PTRiders CASCADE;
DROP TABLE IF EXISTS PTShifts CASCADE;
DROP TABLE IF EXISTS FDSManagers CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS RestaurantStaff CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS RestaurantPromotions CASCADE;
DROP TABLE IF EXISTS FoodItems CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;

DROP TRIGGER IF EXISTS hashPasswordTrigger ON Users CASCADE;
DROP TRIGGER IF EXISTS updateCustomerRewardPointsTrigger ON Orders CASCADE;
DROP TRIGGER IF EXISTS updateCustomerRecentDeliveryLocationsTrigger ON Orders CASCADE;
DROP TRIGGER IF EXISTS checkAcceptedOrdersTrigger ON Orders CASCADE;
DROP TRIGGER IF EXISTS checkAcceptOneOrderTrigger ON Orders CASCADE;
DROP TRIGGER IF EXISTS checkPartTimeRiderShiftBreakTrigger ON PTShifts CASCADE;
DROP TRIGGER IF EXISTS checkPartTimeRiderShiftHoursTrigger ON PTShifts CASCADE;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Users (
    uid INTEGER PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Customer', 'Delivery Rider', 'Food Scooter Manager', 'Restaurant Staff'))
);

CREATE TABLE Customers (
    cid INTEGER PRIMARY KEY,
    creditCardNumber VARCHAR(16),
    rewardPoints INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (cid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE CustomerRecentDeliveryLocations (
    cid INTEGER,
    deliveryLocation VARCHAR(100) NOT NULL,
    orderTime TIMESTAMP NOT NULL,
    PRIMARY KEY (cid, deliveryLocation),
    FOREIGN KEY (cid) REFERENCES Customers (cid) ON DELETE CASCADE
);

CREATE TABLE DeliveryRiders (
    drid INTEGER PRIMARY KEY,
    salary INTEGER NOT NULL,
    rating NUMERIC(2,1),
    FOREIGN KEY (drid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE FTRiders (
    drid INTEGER PRIMARY KEY,
    dayOption INTEGER ARRAY[5] NOT NULL DEFAULT '{1,2,3,4,5}',
	shiftOption INTEGER ARRAY[5] NOT NULL DEFAULT '{1,2,3,4,1}',
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid) ON DELETE CASCADE
);

CREATE TABLE FTShift (
    fsid INTEGER PRIMARY KEY,
	startOneHour INTEGER NOT NULL,
	endOneHour INTEGER NOT NULL,
	startTwoHour INTEGER NOT NULL,
	endTwoHour INTEGER NOT NULL
);

CREATE TABLE PTRiders (
    drid INTEGER PRIMARY KEY,
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid) ON DELETE CASCADE
);

CREATE TABLE PTShifts (
    ptsid INTEGER PRIMARY KEY,
    drid INTEGER,
    dow INTEGER NOT NULL CHECK (dow in (1,2,3,4,5,6,7)),
    startHour INTEGER NOT NULL CHECK (startHour in (10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21)),
    endHour INTEGER NOT NULL CHECK (endHour in (11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22)),
	FOREIGN KEY (drid) REFERENCES PTRiders (drid) ON DELETE CASCADE,
	CHECK (startHour <= endHour)
);

CREATE TABLE FDSManagers (
    fmid INTEGER PRIMARY KEY,
    FOREIGN KEY (fmid) REFERENCES Users (uid) ON DELETE CASCADE
);

CREATE TABLE Restaurants (
    rid INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    minimumPurchase NUMERIC(6, 2) NOT NULL DEFAULT 0 CHECK (minimumPurchase >= 0)
);

CREATE TABLE RestaurantStaff (
    rsid INTEGER PRIMARY KEY,
    employedBy INTEGER NOT NULL,
    FOREIGN KEY (rsid) REFERENCES Users (uid) ON DELETE CASCADE,
    FOREIGN KEY (employedBy) REFERENCES Restaurants (rid) ON DELETE CASCADE
);

CREATE TABLE Promotions (
    pid INTEGER PRIMARY KEY,
    name VARCHAR(100),
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    type VARCHAR(100) NOT NULL,
    discount NUMERIC(5, 2) NOT NULL CHECK (discount > 0 AND discount <= 100)
);

CREATE TABLE RestaurantPromotions (
    rid INTEGER,
    pid INTEGER UNIQUE,
    PRIMARY KEY (rid, pid),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid),
    FOREIGN KEY (pid) REFERENCES Promotions (pid)
);

CREATE TABLE FoodItems (
    fid INTEGER,
    rid INTEGER,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(6, 2) NOT NULL CHECK (price > 0),
    availability INTEGER NOT NULL CHECK (availability >= 0),
    PRIMARY KEY (fid, rid),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid) ON DELETE CASCADE
);

CREATE TABLE Orders (
    oid INTEGER PRIMARY KEY,
    cid INTEGER,
    drid INTEGER,
    rid INTEGER,
    foodCost NUMERIC(6, 2) NOT NULL CHECK (foodCost >= 0),
    deliveryFee NUMERIC(6, 2) NOT NULL CHECK (deliveryFee >= 0),
    rewardPointsUsed INTEGER NOT NULL CHECK (rewardPointsUsed >= 0),
    paymentType VARCHAR(100) NOT NULL,
    deliveryLocation VARCHAR(100) NOT NULL,
    orderTime TIMESTAMP NOT NULL,
    departureTime TIMESTAMP,
    restaurantArrivalTime TIMESTAMP,
    restaurantDepartureTime TIMESTAMP,
    deliveryTime TIMESTAMP,
    FOREIGN KEY (cid) REFERENCES Customers (cid),
    FOREIGN KEY (drid) REFERENCES DeliveryRiders (drid),
    FOREIGN KEY (rid) REFERENCES Restaurants (rid)
);

CREATE TABLE Reviews (
    rvid INTEGER PRIMARY KEY,
    rid INTEGER,
    oid INTEGER,
    content VARCHAR(1000) NOT NULL,
    FOREIGN KEY (rid) REFERENCES Restaurants (rid),
    FOREIGN KEY (oid) REFERENCES Orders (oid)
);

CREATE OR REPLACE FUNCTION hashPassword() RETURNS TRIGGER AS $$
    BEGIN
        NEW.password = crypt(NEW.password, gen_salt('bf'));
		RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER hashPasswordTrigger
    BEFORE UPDATE OR INSERT
	ON Users
    FOR EACH ROW
	EXECUTE FUNCTION hashPassword();

CREATE OR REPLACE FUNCTION checkAcceptedOrders() RETURNS TRIGGER AS $$
	DECLARE
		adrid INTEGER;
    BEGIN
		SELECT O.drid INTO adrid
			FROM Orders O
			WHERE O.oid = NEW.oid;
        IF adrid IS NOT NULL THEN
			RAISE exception '% has already accepted %', adrid, NEW.oid;
		END IF;
		RETURN NULL;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER checkAcceptedOrdersTrigger
    BEFORE UPDATE OF drid
	ON Orders
    FOR EACH ROW
	EXECUTE FUNCTION checkAcceptedOrders();

CREATE OR REPLACE FUNCTION checkAcceptOneOrder() RETURNS TRIGGER AS $$
	DECLARE
		aoid INTEGER;
    BEGIN
		SELECT O.oid INTO aoid
			FROM Orders O
			WHERE O.drid = NEW.drid AND O.deliveryTime IS NULL AND O.oid <> NEW.oid;
        IF aoid IS NOT NULL THEN
			RAISE exception '% has already accepted %', NEW.drid, aoid;
		END IF;
		RETURN NULL;
    END;
$$ LANGUAGE PLPGSQL;

CREATE CONSTRAINT TRIGGER checkAcceptOneOrderTrigger
    AFTER UPDATE OF drid OR INSERT
	ON Orders
	DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
	EXECUTE FUNCTION checkAcceptOneOrder();

CREATE OR REPLACE FUNCTION updateCustomerRewardPoints() RETURNS TRIGGER AS $$
    BEGIN
        UPDATE Customers
        SET rewardpoints = rewardpoints + NEW.foodcost - NEW.rewardpointsused
        WHERE cid = NEW.cid;
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER updateCustomerRewardPointsTrigger
    AFTER UPDATE
    ON Orders
    FOR EACH ROW
    EXECUTE FUNCTION updateCustomerRewardPoints();

CREATE OR REPLACE FUNCTION checkPartTimeRiderShiftBreak() RETURNS TRIGGER AS $$
	DECLARE
		shift INTEGER;
    BEGIN
		SELECT P.ptsid INTO shift
			FROM PTShifts P
			WHERE P.drid = NEW.drid AND P.dow = NEW.dow AND P.ptsid <> NEW.ptsid AND NOT
			((NEW.startHour - P.endHour >= 1) OR (P.startHour - NEW.endHour >= 1));
        IF shift IS NOT NULL THEN
			RAISE exception 'Need at least 1 hour break interval';
		END IF;
		RETURN NULL;
    END;
$$ LANGUAGE PLPGSQL;

CREATE CONSTRAINT TRIGGER checkPartTimeRiderShiftBreakTrigger
    AFTER INSERT
	ON PTShifts
	DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
	EXECUTE FUNCTION checkPartTimeRiderShiftBreak();

CREATE OR REPLACE FUNCTION checkPartTimeRiderShiftHours() RETURNS TRIGGER AS $$
	DECLARE
		totalHours INTEGER;
    BEGIN
		SELECT SUM(P.endHour - P.startHour) INTO totalHours
			FROM PTShifts P
			WHERE P.drid = NEW.drid;
        IF ((totalHours < 10) OR (totalHours > 48)) THEN
			RAISE exception 'Total work hours = %. Must be at least 10 and at most 48.', totalHours;
		END IF;
		RETURN NULL;
    END;
$$ LANGUAGE PLPGSQL;

CREATE CONSTRAINT TRIGGER checkPartTimeRiderShiftHoursTrigger
    AFTER INSERT OR DELETE
	ON PTShifts
	DEFERRABLE INITIALLY DEFERRED
    FOR EACH ROW
	EXECUTE FUNCTION checkPartTimeRiderShiftHours();

CREATE OR REPLACE FUNCTION updateCustomerRecentDeliveryLocations() RETURNS TRIGGER AS $$
    BEGIN
        CASE
            WHEN
                (SELECT COUNT(*) FROM CustomerRecentDeliveryLocations WHERE cid = NEW.cid) < 5
                    THEN
                        CASE NEW.deliverylocation IN (
                            SELECT deliverylocation
                            FROM CustomerRecentDeliveryLocations CRDL
                            WHERE CRDL.cid = NEW.cid
                            )
                            WHEN TRUE THEN
                                UPDATE CustomerRecentDeliveryLocations
                                SET ordertime = NEW.ordertime
                                WHERE cid = NEW.cid
                                AND deliverylocation = NEW.deliverylocation;
                            WHEN FALSE THEN
                                INSERT INTO CustomerRecentDeliveryLocations
                                VALUES (NEW.cid, NEW.deliverylocation, NEW.ordertime);
                            ELSE

                        END CASE;
            WHEN
                (SELECT COUNT(*) FROM CustomerRecentDeliveryLocations WHERE cid = NEW.cid) = 5
                    THEN
                        CASE NEW.deliveryLocation IN (
                            SELECT deliverylocation
                            FROM CustomerRecentDeliveryLocations CRDL
                            WHERE CRDL.cid = NEW.cid
                            )
                            WHEN TRUE THEN
                                UPDATE CustomerRecentDeliveryLocations
                                SET ordertime = NEW.ordertime
                                WHERE cid = NEW.cid
                                AND deliverylocation = NEW.deliverylocation;
                            WHEN FALSE THEN
                                DELETE FROM CustomerRecentDeliveryLocations
                                WHERE ordertime = (
                                    SELECT ordertime
                                    FROM CustomerRecentDeliveryLocations
                                    WHERE cid = NEW.cid
                                    ORDER BY ordertime
                                    LIMIT 1);
                                INSERT INTO CustomerRecentDeliveryLocations
                                VALUES (NEW.cid, NEW.deliverylocation, NEW.ordertime);
                            ELSE

                        END CASE;
        END CASE;
        RETURN NEW;
    END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER updateCustomerRecentDeliveryLocationsTrigger
    AFTER UPDATE
    ON Orders
    FOR EACH ROW
    EXECUTE FUNCTION updateCustomerRecentDeliveryLocations();

INSERT INTO FTShift
VALUES (1, 10, 14, 15, 19),
       (2, 11, 15, 16, 20),
       (3, 12, 16, 17, 21),
	   (4, 13, 17, 18, 22);

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


