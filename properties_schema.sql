CREATE TABLE `coworking_registery`.`properties` (
    `property_id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `property_title` VARCHAR(200) NOT NULL,
    `property_description` TEXT NOT NULL,
    `property_type` VARCHAR(50) NOT NULL,
    `property_address` VARCHAR(500) NOT NULL,
       `property_contact` VARCHAR(500) NOT NULL,
    `property_neighbourhood` VARCHAR(100) NOT NULL,
    `property_area` INT(50) NOT NULL,
    `property_seats` INT(10) NOT NULL,
    `prop_smoking_area` VARCHAR(10) NOT NULL,
    `prop_parking_facility` VARCHAR(10) NOT NULL,
    `prop_availability` DATE NOT NULL,
    `property_lease` VARCHAR(50) NOT NULL,
    `property_rent` INT(10) NOT NULL
) ENGINE = InnoDB;
