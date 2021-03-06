# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.9)
# Database: aquilex
# Generation Time: 2012-12-16 04:32:24 +0000
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
	(1,13,28.5927720000,-81.3052550000,'FS4A - Web I',NULL),
	(2,13,28.5917660000,-81.3040220000,'FS4B',NULL),
	(3,13,28.5912810000,-81.3042040000,'FS4C',NULL),
	(4,13,28.5944770000,-81.3039730000,'FS3C',NULL),
	(5,11,NULL,NULL,'Building J',NULL),
	(6,11,NULL,NULL,'Building R',NULL),
	(7,11,NULL,NULL,'Building G',NULL),
	(9,13,28.5962550000,-81.3023690000,'FS2',NULL),
	(10,13,28.5966620000,-81.3013610000,'FS1',NULL),
	(11,13,28.5955250000,-81.3041290000,'FS3A ',NULL),
	(12,13,28.5951290000,-81.3040320000,'FS3B',NULL),
	(13,13,28.5941680000,-81.3041400000,'FS3D',NULL),
	(14,13,28.5939560000,-81.3045260000,'FS3E',NULL),
	(15,13,28.5937960000,-81.3050270000,'FS3F',NULL),
	(16,13,28.5910270000,-81.3044820000,'FS4D',NULL),
	(17,13,28.5907870000,-81.3047180000,'FS4E',NULL),
	(18,13,28.5904500000,-81.3050780000,'FS4F',NULL),
	(19,13,28.5901620000,-81.3053920000,'FS4G',NULL),
	(20,13,28.5924260000,-81.3046490000,'FS4A - Film',NULL),
	(21,13,28.5921810000,-81.3042690000,'FS4A - Web II',NULL),
	(31,17,28.5383000000,-81.3792000000,'kj',9),
	(32,17,28.5407693893,-81.3794574921,'kress',9);

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
  `google_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `campuses` WRITE;
/*!40000 ALTER TABLE `campuses` DISABLE KEYS */;

INSERT INTO `campuses` (`id`, `name`, `latitude`, `longitude`, `campus_type_id`, `added_by_id`, `google_id`)
VALUES
	(13,'Full Sail University',28.5967130000,-81.3015990000,1,1,'c515daecb7da7cc8c6906f532723dbba52ddf890'),
	(14,'Adventist University of Health Sciences',28.5765070000,-81.3676300000,1,1,'3f6efd0d9aa77a9e93e03cb24231af0028fbeda3'),
	(15,'Annie Russell Theatre: Box Office',28.5927080000,-81.3475040000,1,1,'df0e0b28f1132c782bbbd6bb9bc71a2208983696'),
	(16,'Valencia College - East Campus',28.5532260000,-81.2511950000,1,1,'fd6586d10350f5adac347aa6da8842468d29dfd5'),
	(17,'Valencia Community College: Downtown Center',28.5405020000,-81.3791150000,NULL,1,'70f3f655ee1b4934ecfe806f3a64b92a78b7ccc9'),
	(18,'Orlando Tech',28.5499480000,-81.3831890000,NULL,1,'3f352f981ae37794f8818942449bdba563a9f639'),
	(19,'Valencia College -West Campus',28.5219030000,-81.4634180000,NULL,1,'d5e0cea47289d7bcc6ac23775aca9c5e21f93000'),
	(20,'DeVry University',28.4919900000,-81.4267600000,NULL,1,'d60a86e7ca76959bd4a41bc47810de44e35edd10'),
	(21,'Webster University',28.3592410000,-80.6838750000,NULL,NULL,'58c2f391ccaa9246538efc1abad057ce781048ed'),
	(22,'Florida Solar Energy Center',28.3864000000,-80.7551500000,NULL,NULL,'3c8dd0440380657845651f4942af558d0d1757da'),
	(23,'WBCC-TV',28.3830350000,-80.7593580000,NULL,NULL,'c63d45f6a7bbf7de0f697436ae1c41e235f80cb6'),
	(24,'Everest University',28.6110910000,-81.3875640000,NULL,NULL,'88d9523d6770f0ffc687a68eb0d1ad9315da9019'),
	(25,'Keiser University',28.5382590000,-81.3116180000,NULL,NULL,'0db9a288094faff0cca5304cd90ca355e0c28e29');

/*!40000 ALTER TABLE `campuses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fb_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fb_users`;

CREATE TABLE `fb_users` (
  `fb_id` varchar(250) NOT NULL DEFAULT '',
  `fb_first_name` varchar(250) DEFAULT NULL,
  `fb_middle_name` varchar(250) DEFAULT NULL,
  `fb_last_name` varchar(250) DEFAULT NULL,
  `fb_gender` varchar(250) DEFAULT NULL,
  `fb_link` varchar(250) DEFAULT NULL,
  `fb_locale` varchar(250) DEFAULT NULL,
  `fb_name` varchar(250) DEFAULT NULL,
  `fb_timezone` varchar(250) DEFAULT NULL,
  `fb_updated_time` date DEFAULT NULL,
  `fb_username` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`fb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



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
	(17,NULL,NULL,NULL,28.596834921242450000000000000000,-81.339972476196300000000000000000),
	(18,NULL,NULL,NULL,28.600000000000000000000000000000,-81.339200000000000000000000000000);

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
	(3,'conference room'),
	(4,'office');

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
  `room_type_id` int(11) unsigned DEFAULT '1',
  `floor` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;

INSERT INTO `rooms` (`id`, `building_id`, `latitude`, `longitude`, `name`, `added_by_id`, `room_type_id`, `floor`)
VALUES
	(10,12,NULL,NULL,'106A',NULL,1,1),
	(11,12,NULL,NULL,'137',NULL,1,1),
	(12,12,NULL,NULL,'136',NULL,1,1),
	(13,12,NULL,NULL,'112',NULL,1,1),
	(14,12,NULL,NULL,'113',NULL,1,1),
	(15,12,NULL,NULL,'131',NULL,1,1),
	(16,12,NULL,NULL,'130',NULL,1,1),
	(17,12,NULL,NULL,'304',NULL,1,1),
	(18,12,NULL,NULL,'305',NULL,1,1),
	(19,12,NULL,NULL,'307',NULL,1,1),
	(20,12,NULL,NULL,'308',NULL,1,1),
	(21,12,NULL,NULL,'309',NULL,1,1),
	(22,4,NULL,NULL,'120',NULL,1,1),
	(23,4,NULL,NULL,'116',NULL,1,1),
	(24,4,NULL,NULL,'115',NULL,1,1),
	(25,4,NULL,NULL,'102',NULL,1,1),
	(26,4,NULL,NULL,'103',NULL,1,1),
	(27,4,NULL,NULL,'104',NULL,1,1),
	(28,4,NULL,NULL,'105',NULL,1,1),
	(29,4,NULL,NULL,'110',NULL,1,1),
	(30,1,NULL,NULL,'102',NULL,1,1),
	(31,1,NULL,NULL,'103',NULL,1,1),
	(32,1,NULL,NULL,'106',NULL,1,1),
	(33,1,NULL,NULL,'107',NULL,1,1),
	(34,1,NULL,NULL,'108',NULL,1,1),
	(35,2,NULL,NULL,'110',NULL,1,1),
	(36,2,NULL,NULL,'111',NULL,1,1),
	(37,2,NULL,NULL,'113',NULL,1,1),
	(38,2,NULL,NULL,'114',NULL,1,1),
	(39,2,NULL,NULL,'132',NULL,1,1),
	(40,2,NULL,NULL,'131',NULL,1,1),
	(41,2,NULL,NULL,'130',NULL,1,1),
	(42,2,NULL,NULL,'129',NULL,1,1),
	(43,2,NULL,NULL,'126',NULL,1,1),
	(44,2,NULL,NULL,'127',NULL,1,1),
	(45,3,NULL,NULL,'Offices',NULL,4,1),
	(46,9,NULL,NULL,'107R',NULL,1,1),
	(47,9,NULL,NULL,'107S',NULL,1,1),
	(48,9,NULL,NULL,'107Q',NULL,1,1),
	(49,9,NULL,NULL,'107H',NULL,1,1),
	(50,9,NULL,NULL,'107J',NULL,1,1),
	(51,9,NULL,NULL,'108A',NULL,1,1),
	(52,9,NULL,NULL,'107D',NULL,1,1),
	(53,9,NULL,NULL,'106S',NULL,1,1),
	(54,9,NULL,NULL,'106G',NULL,1,1),
	(55,9,NULL,NULL,'106D',NULL,1,1),
	(56,9,NULL,NULL,'106B',NULL,1,1),
	(57,9,NULL,NULL,'106H',NULL,1,1),
	(58,9,NULL,NULL,'106E',NULL,1,1),
	(59,9,NULL,NULL,'106C',NULL,1,1),
	(60,9,NULL,NULL,'105E',NULL,1,1),
	(61,9,NULL,NULL,'105B',NULL,1,1),
	(62,9,NULL,NULL,'104B',NULL,1,1),
	(63,9,NULL,NULL,'104F',NULL,1,1),
	(64,9,NULL,NULL,'103A',NULL,1,1),
	(65,9,NULL,NULL,'101T',NULL,1,1),
	(66,9,NULL,NULL,'102A',NULL,1,1),
	(67,9,NULL,NULL,'102i',NULL,1,1),
	(68,9,NULL,NULL,'102K',NULL,1,1),
	(69,9,NULL,NULL,'207F',NULL,1,2),
	(70,9,NULL,NULL,'206P',NULL,1,2),
	(71,9,NULL,NULL,'206N',NULL,1,2),
	(72,9,NULL,NULL,'206Q',NULL,1,2),
	(73,9,NULL,NULL,'206K',NULL,1,2),
	(74,9,NULL,NULL,'206J',NULL,1,2),
	(75,9,NULL,NULL,'206H',NULL,1,2),
	(76,9,NULL,NULL,'206A',NULL,1,2),
	(77,9,NULL,NULL,'202N',NULL,1,2),
	(78,9,NULL,NULL,'202Q',NULL,1,2),
	(79,9,NULL,NULL,'202R',NULL,1,2),
	(80,9,NULL,NULL,'202S',NULL,1,2),
	(81,10,NULL,NULL,'126A',NULL,1,1),
	(82,10,NULL,NULL,'209H',NULL,1,2),
	(83,11,NULL,NULL,'Audio Temple',NULL,1,1),
	(84,13,NULL,NULL,'APP',NULL,1,1),
	(85,13,NULL,NULL,'SRD',NULL,1,1),
	(86,14,NULL,NULL,'Media Center',NULL,1,1),
	(87,15,NULL,NULL,'111',NULL,1,1),
	(88,15,NULL,NULL,'121',NULL,1,1),
	(89,16,NULL,NULL,'Offices',NULL,4,1),
	(90,17,NULL,NULL,'Distribution Center',NULL,1,1),
	(91,18,NULL,NULL,'105',NULL,1,1),
	(92,19,NULL,NULL,'Enrollment',NULL,4,1),
	(93,20,NULL,NULL,'104S',NULL,1,1),
	(94,20,NULL,NULL,'106S',NULL,1,1),
	(95,20,NULL,NULL,'109S',NULL,1,1),
	(96,21,NULL,NULL,'139',NULL,1,1),
	(97,21,NULL,NULL,'135',NULL,1,1),
	(98,21,NULL,NULL,'138',NULL,1,1);

/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;


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
  `fb_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
