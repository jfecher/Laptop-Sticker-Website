-- MySQL Script generated by MySQL Workbench
-- Mon Nov 26 18:12:20 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

/* SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0; */
/* SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; */
/* SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES'; */

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS mydb DEFAULT CHARACTER SET utf8 ;
-- USE mydb ;

-- -----------------------------------------------------
-- Table `mydb`.`major`
-- -----------------------------------------------------
DROP TABLE IF EXISTS major ;

CREATE TABLE IF NOT EXISTS major (
  major_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (major_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`hometown_location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS hometown_location ;

CREATE TABLE IF NOT EXISTS hometown_location (
  location_id INT NOT NULL,
  city VARCHAR(100) NULL,
  state VARCHAR(100) NULL,
  country VARCHAR(100) NOT NULL,
  PRIMARY KEY (location_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`laptop`
-- -----------------------------------------------------
DROP TABLE IF EXISTS laptop ;

CREATE TABLE IF NOT EXISTS laptop (
  laptop_id INT NOT NULL,
  screen_size INT NOT NULL,
  brand VARCHAR(100) NULL,
  model VARCHAR(100) NULL,
  PRIMARY KEY (laptop_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`survey_location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS survey_location ;

CREATE TABLE IF NOT EXISTS survey_location (
  survey_location_id INT NOT NULL,
  name VARCHAR(100) NULL,
  PRIMARY KEY (survey_location_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`person`
-- -----------------------------------------------------
DROP TABLE IF EXISTS person ;

CREATE TABLE IF NOT EXISTS person (
  person_id INT NOT NULL,
  major_id INT NOT NULL,
  hometown_location_id INT NOT NULL,
  laptop_id INT NOT NULL,
  laptop_purchased_dt TIMESTAMP(0) NULL,
  laptop_picture_url VARCHAR(100) NULL,
  likelihood_to_buy_more INT NULL,
  likelihood_to_put_more INT NULL,
  survey_location_id INT NOT NULL,
  PRIMARY KEY (person_id)
 ,
  CONSTRAINT fk_person_major
    FOREIGN KEY (major_id)
    REFERENCES major (major_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_person_location1
    FOREIGN KEY (hometown_location_id)
    REFERENCES hometown_location (location_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_person_laptop1
    FOREIGN KEY (laptop_id)
    REFERENCES laptop (laptop_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_person_survey_location1
    FOREIGN KEY (survey_location_id)
    REFERENCES survey_location (survey_location_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_person_major_idx ON person (major_id ASC);
CREATE INDEX fk_person_location1_idx ON person (hometown_location_id ASC);
CREATE INDEX fk_person_laptop1_idx ON person (laptop_id ASC);
CREATE INDEX fk_person_survey_location1_idx ON person (survey_location_id ASC);


-- -----------------------------------------------------
-- Table `mydb`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS color ;

CREATE TABLE IF NOT EXISTS color (
  color_id INT NOT NULL,
  name VARCHAR(100) NULL,
  PRIMARY KEY (color_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`brand`
-- -----------------------------------------------------
DROP TABLE IF EXISTS brand ;

CREATE TABLE IF NOT EXISTS brand (
  brand_id INT NOT NULL,
  name VARCHAR(100) NULL,
  PRIMARY KEY (brand_id))
;


-- -----------------------------------------------------
-- Table `mydb`.`sticker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS sticker ;

CREATE TABLE IF NOT EXISTS sticker (
  sticker_id INT NOT NULL,
  text VARCHAR(100) NULL,
  width INT NULL,
  height INT NULL,
  color_id INT NOT NULL,
  price INT NULL,
  brand_id INT NULL,
  PRIMARY KEY (sticker_id)
 ,
  CONSTRAINT fk_sticker_color1
    FOREIGN KEY (color_id)
    REFERENCES color (color_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_sticker_brand1
    FOREIGN KEY (brand_id)
    REFERENCES brand (brand_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_sticker_color1_idx ON sticker (color_id ASC);
CREATE INDEX fk_sticker_brand1_idx ON sticker (brand_id ASC);


-- -----------------------------------------------------
-- Table `mydb`.`person_has_sticker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS person_has_sticker ;

CREATE TABLE IF NOT EXISTS person_has_sticker (
  person_id INT NOT NULL,
  sticker_id INT NOT NULL,
  PRIMARY KEY (person_id, sticker_id)
 ,
  CONSTRAINT fk_person_has_sticker_person1
    FOREIGN KEY (person_id)
    REFERENCES person (person_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_person_has_sticker_sticker1
    FOREIGN KEY (sticker_id)
    REFERENCES sticker (sticker_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX fk_person_has_sticker_sticker1_idx ON person_has_sticker (sticker_id ASC);
CREATE INDEX fk_person_has_sticker_person1_idx ON person_has_sticker (person_id ASC);


/* SET SQL_MODE=@OLD_SQL_MODE; */
/* SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; */
/* SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS; */
