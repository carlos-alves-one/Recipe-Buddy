
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

-- Create the table ingredients
CREATE TABLE
    ingredients (
        id INT AUTO_INCREMENT NOT NULL UNIQUE,
        username VARCHAR(15) NOT NULL,
        ingred_name VARCHAR(30) NOT NULL,
        value_per SMALLINT NOT NULL,
        unit VARCHAR(4) NOT NULL,
        carbs SMALLINT NOT NULL,
        fats SMALLINT NOT NULL,
        protein SMALLINT NOT NULL,
        salt SMALLINT NOT NULL,
        sugar SMALLINT NOT NULL,
        PRIMARY KEY(id)
    );

-- Insert data into the table ingredients
INSERT INTO ingredients (username, ingred_name, value_per, unit, carbs, fats, protein, salt, sugar)
VALUES 
    ('mikesharp', 'plain flour', 250, 'g', 70, 1, 10, 0, 0),
    ('tysongood', 'caster sugar', 400, 'mg', 100, 0, 0, 0, 100),
    ('albertben', 'milk', 700, 'ml', 4, 3, 3, 0, 4),
    ('cdeol003', 'chocolate', 10, 'unit', 50, 30, 5, 0, 40);

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