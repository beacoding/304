DROP DATABASE ubc_clubs;

CREATE DATABASE ubc_clubs;

USE ubc_clubs;



CREATE TABLE Clubs(
  id INT AUTO_INCREMENT NOT NULL, 
  name VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE Members(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  password VARCHAR(255),
  name VARCHAR(255),
  department VARCHAR(255),
  student_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE Events(
  id INT AUTO_INCREMENT NOT NULL, 
  club_id INT, 
  event_date DATE,
  description VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (club_id) REFERENCES Clubs(id)
);

CREATE TABLE Posts(
  id INT AUTO_INCREMENT NOT NULL, 
  club_id INT, 
  body VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (club_id) REFERENCES Clubs(id)
);

CREATE TABLE Members_Clubs(
  club_id INT, 
  member_id INT, 
  admin BOOLEAN,
  PRIMARY KEY (member_id, club_id),
  FOREIGN KEY (club_id) REFERENCES Clubs(id)
);

CREATE TABLE Messages(
  id INT AUTO_INCREMENT NOT NULL, 
  club_id INT, 
  sender_id INT, 
  receiver_id INT, 
  body VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (club_id) REFERENCES Clubs(id),
  FOREIGN KEY (sender_id) REFERENCES Members(id),
  FOREIGN KEY (receiver_id) REFERENCES Members(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/init.sql
 *  to create the database and the tables.*/

