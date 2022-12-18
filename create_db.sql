
-- Goldsmiths University of London
-- Author....: Carlos Manuel de Oliveira Alves
-- Student...: cdeol003
-- Created...: 18/12/2022

-- Create the database
CREATE DATABASE myRecipesBuddy;

-- Use the database
USE myRecipesBuddy;

-- Create the table user
CREATE USER
    'appuser' @'localhost' IDENTIFIED
WITH
    mysql_native_password BY 'app2027';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON myRecipesBuddy.* TO 'appuser'@'localhost';

-- Create the table foods
CREATE TABLE
    foods (
        id INT AUTO_INCREMENT NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL,
        name VARCHAR(50),
        value DECIMAL(5, 2) unsigned,
        unit DECIMAL(5, 2) unsigned,
        carbs DECIMAL(5, 2) unsigned
        PRIMARY KEY(id)
    );

-- Insert data into the table foods
INSERT INTO foods (username, name, value, unit, carbs)
VALUES
('calves@gmail.com', 'Apple', 0.52, 1, 0.13),
('mike@gmail.com', 'Pepper', 0.32, 1, 0.70),
('georgina@gmail.com','Banana', 1.82, 1, 2.30);

-- Path: create_db.sql
CREATE TABLE 
    users (
        user_id INT NOT NULL AUTO_INCREMENT UNIQUE,
        username VARCHAR(50) NOT NULL,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR (255) NOT NULL,
        hashedPassword CHAR(255),
        PRIMARY KEY(user_id)
    );