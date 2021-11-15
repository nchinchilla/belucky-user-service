CREATE DATABASE IF NOT EXISTS belucky;

use belucky;

CREATE TABLE user(
id BIGINT NOT NULL AUTO_INCREMENT,
username VARCHAR(256) NOT NULL,
password VARCHAR(256) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE country(
id BIGINT NOT NULL AUTO_INCREMENT,
name VARCHAR(256),
PRIMARY KEY(id));

CREATE TABLE city(
id BIGINT  NOT NULL AUTO_INCREMENT,
countryId BIGINT NOT NULL,
name VARCHAR(256),
PRIMARY KEY(id),
FOREIGN KEY(countryId) REFERENCES country(id));


CREATE TABLE address(
id BIGINT NOT NULL AUTO_INCREMENT,
cityId BIGINT NOT NULL, 
street VARCHAR(256),
PRIMARY KEY(id),
FOREIGN KEY(cityId) REFERENCES city(id));


CREATE TABLE profile(
id BIGINT  NOT NULL AUTO_INCREMENT,
userId BIGINT  NOT NULL,
addressId BIGINT  NOT NULL,
name VARCHAR(256),
PRIMARY KEY(id),
FOREIGN KEY(userId) REFERENCES user(id),
FOREIGN KEY(addressId) REFERENCES address(id));


INSERT INTO country SET name = 'Argentina';
INSERT INTO country SET name = 'Brasil';
INSERT INTO country SET name = 'Chile';
INSERT INTO country SET name = 'Bolivia';
INSERT INTO country SET name = 'Uruguay';
INSERT INTO country SET name = 'Paraguay';


INSERT INTO city SET name = 'Buenos Aires', countryId= 1;
INSERT INTO city SET name = 'San Pablo', countryId= 2;
INSERT INTO city SET name = 'Santiago', countryId= 3;
INSERT INTO city SET name = 'La Paz', countryId= 4;
INSERT INTO city SET name = 'Montevideo', countryId= 5;
INSERT INTO city SET name = 'Asuncion', countryId= 6;













