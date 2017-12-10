SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `magazin`
--
CREATE DATABASE `AdministrationParking` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `AdministrationParking`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `ParkingSpots` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `parkingAdress` varchar(30) DEFAULT NULL,
  `parkingDescription` varchar(100) DEFAULT NULL,
  `priceParking` varchar(11) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `CarDetails` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `parking_id` smallint(5) DEFAULT NULL,
  `car_no` varchar(10) DEFAULT NULL,
  `parkingAdress` varchar(30) DEFAULT NULL,
  `parkingDescription` varchar(100) DEFAULT NULL,
  `priceParking` varchar(11) DEFAULT NULL,
  `timeParking` varchar(30) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_produse` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



