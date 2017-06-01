

use brewDB;

CREATE TABLE user (
id INT NOT NULL AUTO_INCREMENT,
  userName VARCHAR(45) NOT NULL,
  userPass VARCHAR(45) NOT NULL,
  userEmail VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE brew (
id INT NOT NULL AUTO_INCREMENT,
  beerName VARCHAR(45) NOT NULL,
  beerType VARCHAR(45) NOT NULL,
  recipe TEXT NOT NULL,
  rating INTEGER,
  notes TEXT

  PRIMARY KEY (id)
);