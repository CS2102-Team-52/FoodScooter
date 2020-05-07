# FoodScooter

## What
* A food delivery system.

## Setup

### Prerequisites
* Install Java
* Install PostgreSQL
* Install Angular
* Install npm (Node Package Manager)

### Running
We recommend using an IDE like Intellij for running the program, but it is not necessary.

#### Frontend
The following step takes place in the home folder of the project:
* Run the command `ng serve` 

#### Backend
The following steps take place in the home folder of the project:
1. Run the command `./gradlew build`
2. Run the command `./gradlew bootRun`

#### Database
1. Create a superuser with username `root` and password `root`
2. Create a database with name `foodscooter`
3. In the folder `FoodScooter/src/main/resources`, run the command `\i data.sql` 
