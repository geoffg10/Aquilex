# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.9)
# Database: aquilex
# Generation Time: 2012-12-08 19:37:25 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table buildings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `buildings`;

CREATE TABLE `buildings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `campus_id` int(11) unsigned DEFAULT NULL,
  `latitude` decimal(65,10) DEFAULT NULL,
  `longitude` decimal(65,10) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `added_by_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;

INSERT INTO `buildings` (`id`, `campus_id`, `latitude`, `longitude`, `name`, `added_by_id`)
VALUES
	(1,1,NULL,NULL,'4f',NULL);

/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table campus_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campus_types`;

CREATE TABLE `campus_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `campus_types` WRITE;
/*!40000 ALTER TABLE `campus_types` DISABLE KEYS */;

INSERT INTO `campus_types` (`id`, `type`)
VALUES
	(1,'university');

/*!40000 ALTER TABLE `campus_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table campuses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campuses`;

CREATE TABLE `campuses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `latitude` decimal(65,10) DEFAULT NULL,
  `longitude` decimal(65,10) DEFAULT NULL,
  `campus_type_id` int(11) unsigned DEFAULT NULL,
  `added_by_id` int(11) unsigned DEFAULT NULL,
  `google_ref_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `campuses` WRITE;
/*!40000 ALTER TABLE `campuses` DISABLE KEYS */;

INSERT INTO `campuses` (`id`, `name`, `latitude`, `longitude`, `campus_type_id`, `added_by_id`, `google_ref_id`)
VALUES
	(1,'test1',NULL,NULL,1,NULL,'1'),
	(2,'test2',NULL,NULL,2,NULL,NULL),
	(3,NULL,2.0000000000,1.0000000000,2,1,'12');

/*!40000 ALTER TABLE `campuses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `accuracy` int(250) DEFAULT NULL,
  `altitude` int(11) DEFAULT NULL,
  `altitudeAccuracy` int(11) DEFAULT NULL,
  `latitude` decimal(65,30) DEFAULT NULL,
  `longitude` decimal(65,30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;

INSERT INTO `locations` (`id`, `accuracy`, `altitude`, `altitudeAccuracy`, `latitude`, `longitude`)
VALUES
	(1,NULL,NULL,NULL,28.550608100000000000000000000000,-81.368099100000000000000000000000),
	(2,NULL,NULL,NULL,28.550621700000000000000000000000,-81.368088900000000000000000000000),
	(3,NULL,NULL,NULL,28.550652200000000000000000000000,-81.368023400000000000000000000000),
	(4,NULL,NULL,NULL,28.550621000000000000000000000000,-81.368093800000000000000000000000),
	(5,NULL,NULL,NULL,28.550621000000000000000000000000,-81.368093800000000000000000000000),
	(6,NULL,NULL,NULL,28.550621000000000000000000000000,-81.368093800000000000000000000000),
	(7,NULL,NULL,NULL,28.592708000000000000000000000000,-81.347504000000000000000000000000),
	(8,NULL,NULL,NULL,28.576507000000000000000000000000,-81.367630000000000000000000000000),
	(9,NULL,NULL,NULL,28.622924000000000000000000000000,-81.389448000000000000000000000000),
	(10,NULL,NULL,NULL,28.605274919400000000000000000000,-81.333749751300000000000000000000),
	(11,NULL,NULL,NULL,28.601554244800000000000000000000,-81.339344839300000000000000000000),
	(12,NULL,NULL,NULL,28.602901238500000000000000000000,-81.334093074000000000000000000000),
	(13,NULL,NULL,NULL,28.606329871535700000000000000000,-81.334178904724100000000000000000),
	(14,NULL,NULL,NULL,28.609871418992790000000000000000,-81.330016116333010000000000000000),
	(15,NULL,NULL,NULL,28.610097471159765000000000000000,-81.333878497314460000000000000000),
	(16,NULL,NULL,NULL,28.606405224852300000000000000000,-81.332419375610360000000000000000),
	(17,NULL,NULL,NULL,28.596834921242450000000000000000,-81.339972476196300000000000000000);

/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table room_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `room_types`;

CREATE TABLE `room_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `room_types` WRITE;
/*!40000 ALTER TABLE `room_types` DISABLE KEYS */;

INSERT INTO `room_types` (`id`, `type`)
VALUES
	(1,'classroom'),
	(2,'bathroom'),
	(3,'conference room');

/*!40000 ALTER TABLE `room_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table rooms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `building_id` int(11) unsigned DEFAULT NULL,
  `latitude` decimal(65,10) DEFAULT NULL,
  `longitude` decimal(65,10) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `added_by_id` int(11) unsigned DEFAULT NULL,
  `room_type_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_types
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_types`;

CREATE TABLE `user_types` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;

INSERT INTO `user_types` (`id`, `type`)
VALUES
	(1,'admin'),
	(2,'user'),
	(3,'official');

/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_type_id` int(11) unsigned DEFAULT NULL,
  `user_email` varchar(250) DEFAULT NULL,
  `user_pass` varchar(250) DEFAULT NULL,
  `added_by_id` int(11) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `user_type_id`, `user_email`, `user_pass`, `added_by_id`, `enabled`)
VALUES
	(1,NULL,'1@email.com',NULL,NULL,1),
	(4,NULL,'renee.blunt@gmail.com','aksldjfaklsjdfask;jf',NULL,1),
	(5,NULL,'renee.as@gmail.com','asdf',NULL,1),
	(6,NULL,'reneASe.as@gmail.com','asdf',NULL,1),
	(7,NULL,'renaseASe.as@gmail.com','asdf',NULL,1),
	(8,NULL,'re','a',NULL,1),
	(9,NULL,'asdf@asdf.com','40bd001563085fc35165329ea1ff5c5ecbdbbeef',NULL,1),
	(10,NULL,'asdf@aasdfsdf.com','3da541559918a808c2402bba5012f6c60b27661c',NULL,1),
	(11,NULL,'asdf@aaasdfsdfsdf.com','3da541559918a808c2402bba5012f6c60b27661c',NULL,1),
	(12,NULL,'asdf@asdf.comasdfas','40bd001563085fc35165329ea1ff5c5ecbdbbeef',NULL,1);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
