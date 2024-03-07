-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.11:3306
-- Generation Time: Feb 19, 2024 at 01:07 PM
-- Server version: 10.6.14-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u725151912_hr_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `announcementId` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `status` varchar(45) NOT NULL,
  `fileUrl` text DEFAULT NULL,
  `issuedBy` text NOT NULL,
  `dateTime` datetime NOT NULL,
  `officeId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `common_folder_files`
--

CREATE TABLE `common_folder_files` (
  `fileId` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `employeePrivacy` tinyint(4) NOT NULL,
  `fileUrl` text NOT NULL,
  `officeId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `companyId` int(11) NOT NULL,
  `name` text NOT NULL,
  `tagLine` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `missionStatement` text DEFAULT NULL,
  `visionStatement` text DEFAULT NULL,
  `regNo` text DEFAULT NULL,
  `email` text NOT NULL,
  `contact` text DEFAULT NULL,
  `website` text DEFAULT NULL,
  `headquaterAddress` text DEFAULT NULL,
  `country` text DEFAULT NULL,
  `logoUrl` text DEFAULT NULL,
  `founder` text DEFAULT NULL,
  `foundedDate` date DEFAULT NULL,
  `employeeCount` int(11) NOT NULL DEFAULT 0,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`companyId`, `name`, `tagLine`, `description`, `missionStatement`, `visionStatement`, `regNo`, `email`, `contact`, `website`, `headquaterAddress`, `country`, `logoUrl`, `founder`, `foundedDate`, `employeeCount`, `createAt`, `modifiedAt`) VALUES
(7, 'ABC LLC', 'aslkdfa kfdjalkjf', 'dkjfalkjflkj', 'asdfasdfa dfa sdfas', 'adsfaiuiwer iw', 'sdf er3wer', 'abc@gmail.com', '78622565', 'hajfhakjshfaeifhjkasdhfj', 'asdfajhdfkj ahdjfhadsjfh asjdhf kj', 'Pakistan', '', 'Ali raza', '2022-01-01', 10, '2024-02-18 11:13:26', '2024-02-18 11:13:26'),
(10, 'ABC LLC h', 'aslkdfa kfdjalkjf', 'dkjfalkjflkj', 'asdfasdfa dfa sdfas', 'adsfaiuiwer iw', 'sdf er3wer', 'abcd@gmail.com', '78622565', 'hajfhakjshfaeifhjkasdhfj', 'asdfajhdfkj ahdjfhadsjfh asjdhf kj', 'Pakistan', '/files/Splash-Icon.png', 'Ali raza', '2022-01-01', 10, '2024-02-18 11:21:10', '2024-02-18 16:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `departmentId` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `officeId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`departmentId`, `name`, `description`, `officeId`, `createAt`, `modifiedAt`) VALUES
(2, 'Head Office', 'ajdhskfjha kjfda', 2, '2024-02-19 10:42:22', '2024-02-19 10:42:22'),
(4, 'Head Office', 'ajdhskfjha kjfda', 4, '2024-02-19 10:44:05', '2024-02-19 10:44:05');

-- --------------------------------------------------------

--
-- Table structure for table `docs`
--

CREATE TABLE `docs` (
  `id` int(11) NOT NULL,
  `staffId` int(11) NOT NULL,
  `title` text NOT NULL,
  `fileName` text NOT NULL,
  `url` text NOT NULL,
  `modifiedOn` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `docs`
--

INSERT INTO `docs` (`id`, `staffId`, `title`, `fileName`, `url`, `modifiedOn`) VALUES
(7, 3, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONAL CERTIFICATE.jpeg', '/files/EDUCATIONAL CERTIFICATE.jpeg', '2024-01-16 09:25:19'),
(8, 3, 'OFFER LETTER', 'OFFER LETTER.pdf', '/files/OFFER LETTER.pdf', '2024-01-22 05:15:27'),
(9, 3, 'NIC', 'NIC FRONT.pdf', '/files/NIC FRONT.pdf', '2024-01-22 05:16:52'),
(11, 4, 'JOINING FORM', 'JOINING FORM.pdf', '/files/JOINING FORM.pdf', '2024-01-22 05:20:23'),
(12, 3, 'JOB DESCRIPTION', 'TOP-Q-ANX-06 Job Descriptions - Asst - Marketing Executive.pdf', '/files/TOP-Q-ANX-06 Job Descriptions - Asst - Marketing Executive.pdf', '2024-01-22 05:22:19'),
(13, 4, 'VISA', 'VISA.pdf', '/files/VISA.pdf', '2024-01-22 05:43:02'),
(14, 4, 'CV', 'ResumeFaizanTariq.pdf', '/files/ResumeFaizanTariq.pdf', '2024-01-22 05:43:26'),
(15, 4, 'MEDICAL', 'MEDICAL.pdf', '/files/MEDICAL.pdf', '2024-01-22 05:43:44'),
(16, 4, 'OFFER LETTER', 'Job Offer Letter - Signed.pdf', '/files/Job Offer Letter - Signed.pdf', '2024-01-22 05:44:01'),
(17, 4, 'EID', 'EID_ (1) (2).pdf', '/files/EID_ (1) (2).pdf', '2024-01-22 05:44:18'),
(18, 4, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONAL CERTIFICATE.pdf', '/files/EDUCATIONAL CERTIFICATE.pdf', '2024-01-22 05:44:36'),
(19, 5, 'CV', 'Ayesha.pdf', '/files/Ayesha.pdf', '2024-01-22 05:51:25'),
(20, 5, 'EID', 'AISHA EID.pdf', '/files/AISHA EID.pdf', '2024-01-22 05:52:11'),
(21, 5, 'INFORMATION SHEET', 'INFORMATION SHEET.pdf', '/files/INFORMATION SHEET.pdf', '2024-01-22 05:58:51'),
(22, 5, 'VISA', 'VISA.pdf', '/files/VISA.pdf', '2024-01-22 06:06:40'),
(23, 5, 'PP', 'PP.pdf', '/files/PP.pdf', '2024-01-22 06:07:04'),
(24, 5, 'SPONSOR PP', 'SP PP.jpeg', '/files/SP PP.jpeg', '2024-01-22 06:14:06'),
(25, 5, 'SP EID', 'SP EID.pdf', '/files/SP EID.pdf', '2024-01-22 06:16:41'),
(26, 5, 'SP VISA', 'SP VISA.pdf', '/files/SP VISA.pdf', '2024-01-22 06:21:51'),
(27, 5, 'CERTIFICATE', 'CERTIFICATE.pdf', '/files/CERTIFICATE.pdf', '2024-01-22 06:25:28'),
(28, 5, 'NOC', 'NOC.pdf', '/files/NOC.pdf', '2024-01-22 06:26:03'),
(29, 5, 'NFC HANDOVER', 'NFC HANDOVER AYESHA.pdf', '/files/NFC HANDOVER AYESHA.pdf', '2024-01-22 06:28:20'),
(30, 5, 'REVISED JOB TITLE', 'REVISED JOB TITLE.pdf', '/files/REVISED JOB TITLE.pdf', '2024-01-22 06:28:41'),
(31, 6, 'OFFER LETTER', 'TEHREEM OFFER LETTER.pdf', '/files/TEHREEM OFFER LETTER.pdf', '2024-01-22 07:01:47'),
(32, 6, 'INFORMATION SHEET', 'TEHREEM INFO SHEET.pdf', '/files/TEHREEM INFO SHEET.pdf', '2024-01-22 07:02:16'),
(33, 6, 'BACHELORS DEGREE', 'Bachelor\'s Degree.pdf', '/files/Bachelor\'s Degree.pdf', '2024-01-22 07:03:07'),
(34, 6, 'EID', 'EID NEW.pdf', '/files/EID NEW.pdf', '2024-01-22 07:03:41'),
(35, 6, 'PP COPY', 'PP Copy.jpeg', '/files/PP Copy.jpeg', '2024-01-22 07:04:16'),
(36, 6, 'SP EID', 'SP EID.pdf', '/files/SP EID.pdf', '2024-01-22 07:05:49'),
(37, 6, 'RAKEZ ID', 'RAKEZ ID Card1.pdf', '/files/RAKEZ ID Card1.pdf', '2024-01-22 07:06:11'),
(38, 6, 'NFC HANDOVER', 'NFC HANDOVER TEHREEM.pdf', '/files/NFC HANDOVER TEHREEM.pdf', '2024-01-22 07:07:39'),
(40, 6, 'SP PP', 'SP PP.jpeg', '/files/SP PP.jpeg', '2024-01-22 07:12:10'),
(41, 7, 'CV', 'Kishor CV.pdf', '/files/Kishor CV.pdf', '2024-01-22 13:22:27'),
(42, 7, 'INFORMATION SHEET', 'KISHOR INFORMATION SHEET.pdf', '/files/KISHOR INFORMATION SHEET.pdf', '2024-01-22 13:25:36'),
(43, 7, 'EDUCATIONAL CERTIFICATE', 'BACHELORS OF ART.jpeg', '/files/BACHELORS OF ART.jpeg', '2024-01-22 13:26:52'),
(44, 7, 'NFC HANDOVER', 'NFC HANDOVER KISHOR.pdf', '/files/NFC HANDOVER KISHOR.pdf', '2024-01-22 13:27:20'),
(45, 7, 'EID', 'EID KISHOR.pdf', '/files/EID KISHOR.pdf', '2024-01-23 05:42:47'),
(46, 7, 'PP COPY', 'Kishor PP.pdf', '/files/Kishor PP.pdf', '2024-01-23 05:45:30'),
(47, 8, 'OFFER LETTER', 'OFFER LETTER-SAAD SIGNED.pdf', '/files/OFFER LETTER-SAAD SIGNED.pdf', '2024-01-23 06:01:03'),
(48, 8, 'INFORMATION SHEET', 'SAAD INFORMATION SHEET.pdf', '/files/SAAD INFORMATION SHEET.pdf', '2024-01-23 06:01:59'),
(49, 8, 'EMPLOYEMENT CONTRACT', 'SIGNED EMPLOYMENT CONTRACT.pdf', '/files/SIGNED EMPLOYMENT CONTRACT.pdf', '2024-01-23 06:02:57'),
(50, 8, 'PERMIT CARD', 'WORK PERMIT SAAD.pdf', '/files/WORK PERMIT SAAD.pdf', '2024-01-23 06:03:16'),
(51, 8, 'PP - VISA', 'PP - VISA.pdf', '/files/PP - VISA.pdf', '2024-01-23 06:04:08'),
(52, 8, 'SAAD EID', 'SAAD EID.pdf', '/files/SAAD EID.pdf', '2024-01-23 06:06:40'),
(53, 9, 'SOUHIR EID', 'SOUHIR EID.pdf', '/files/SOUHIR EID.pdf', '2024-01-23 06:16:58'),
(54, 9, 'PP COPY', 'PP Copy.pdf', '/files/PP Copy.pdf', '2024-01-23 06:18:30'),
(55, 9, 'SP EID', 'SP EID.pdf', '/files/SP EID.pdf', '2024-01-23 06:19:56'),
(56, 9, 'SP PP', 'SP PP.jpeg', '/files/SP PP.jpeg', '2024-01-23 06:20:15'),
(57, 9, 'EDUCATIONAL CERTIFICATE', 'Education cert-Souhir.pdf', '/files/Education cert-Souhir.pdf', '2024-01-23 06:20:43'),
(58, 9, 'NFC HANDOVER', 'NFC HANDOVER SOUHIR.pdf', '/files/NFC HANDOVER SOUHIR.pdf', '2024-01-23 06:21:26'),
(59, 9, 'PHONE HANDOVER', 'PHONE HANDOVER SOUHIR.pdf', '/files/PHONE HANDOVER SOUHIR.pdf', '2024-01-23 06:21:53'),
(60, 9, 'SALARY CERTIFICATE LETTER', 'SOUHIR - SALARY SIGNATURE.pdf', '/files/SOUHIR - SALARY SIGNATURE.pdf', '2024-01-23 06:22:39'),
(61, 10, 'CV', 'SAEED - CV.pdf', '/files/SAEED - CV.pdf', '2024-01-23 06:23:46'),
(62, 10, 'OFFER LETTER', 'OFFER LETTER - SAEED.pdf', '/files/OFFER LETTER - SAEED.pdf', '2024-01-23 06:24:12'),
(63, 10, 'INFORMATION SHEET', 'INFORMATION SHEET.pdf', '/files/INFORMATION SHEET.pdf', '2024-01-23 06:26:46'),
(64, 10, 'JOB DESCRIPTION', 'SAEED - JOB DESCRIPTION.pdf', '/files/SAEED - JOB DESCRIPTION.pdf', '2024-01-23 06:27:15'),
(65, 10, 'PP EID', 'PP-EID.pdf', '/files/PP-EID.pdf', '2024-01-23 06:27:37'),
(66, 10, 'VISA', 'SAEED VISA.pdf', '/files/SAEED VISA.pdf', '2024-01-23 06:28:04'),
(67, 10, 'CERTIFICATES', 'CERTIFICATES.pdf', '/files/CERTIFICATES.pdf', '2024-01-23 06:28:37'),
(68, 10, 'NOC', 'NOC SAEED.pdf', '/files/NOC SAEED.pdf', '2024-01-23 06:29:24'),
(69, 10, 'SP PP', 'SP PP.jpeg', '/files/SP PP.jpeg', '2024-01-23 06:31:05'),
(70, 10, 'LIMITED CONTRACT', 'EMPLOYMENT CONTRACT.pdf', '/files/EMPLOYMENT CONTRACT.pdf', '2024-01-23 06:31:26'),
(71, 10, 'WORK PERMIT', 'WORK PERMIT.pdf', '/files/WORK PERMIT.pdf', '2024-01-23 06:32:00'),
(72, 10, 'TRAINING CHECKLIST', 'TRAINING CHECKLIST.pdf', '/files/TRAINING CHECKLIST.pdf', '2024-01-23 06:32:21'),
(73, 10, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 06:32:56'),
(74, 10, 'LAPTOP HANDOVER', 'LAPTOP HANDOVER.pdf', '/files/LAPTOP HANDOVER.pdf', '2024-01-23 06:34:16'),
(75, 10, 'NFC HANDOVER', 'NFC HANDOVER SAEED.pdf', '/files/NFC HANDOVER SAEED.pdf', '2024-01-23 06:34:40'),
(76, 11, 'OFFER LETTER', 'OFFER LETTER - DIANE.pdf', '/files/OFFER LETTER - DIANE.pdf', '2024-01-23 06:37:02'),
(77, 11, 'TRAINING CHECKLIST', 'TRAINING CHECKLIST.pdf', '/files/TRAINING CHECKLIST.pdf', '2024-01-23 06:39:18'),
(78, 11, 'JOB DESCRIPTION', 'JOB DESCRIPTION.pdf', '/files/JOB DESCRIPTION.pdf', '2024-01-23 06:39:39'),
(79, 11, 'EID', 'Diane Petty (EID).pdf', '/files/Diane Petty (EID).pdf', '2024-01-23 06:40:10'),
(80, 11, 'PP COPY', 'Passport Copy.pdf', '/files/Passport Copy.pdf', '2024-01-23 06:40:28'),
(81, 11, 'INFORMATION SHEET', 'INFO SHEET.pdf', '/files/INFO SHEET.pdf', '2024-01-23 06:40:51'),
(82, 11, 'SIM HANDOVER', 'DIANE ASSET HANDOVER.pdf', '/files/DIANE ASSET HANDOVER.pdf', '2024-01-23 06:41:18'),
(83, 11, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 06:41:55'),
(84, 11, 'EDUCATIONAL CERTIFICATE', 'Educational Certificate.pdf', '/files/Educational Certificate.pdf', '2024-01-23 06:42:17'),
(85, 11, 'BANK DETAILS', 'BANK DETAILS.pdf', '/files/BANK DETAILS.pdf', '2024-01-23 06:42:37'),
(86, 11, 'NFC HANDOVER', 'NFC HANDOVER.pdf', '/files/NFC HANDOVER.pdf', '2024-01-23 06:42:58'),
(87, 12, 'CV', 'CV  PATATI.pdf', '/files/CV  PATATI.pdf', '2024-01-23 06:43:44'),
(88, 12, 'OFFER LETTER SIGNED', 'MONTASSAR OFFER LETTER SIGNED.pdf', '/files/MONTASSAR OFFER LETTER SIGNED.pdf', '2024-01-23 06:44:07'),
(89, 12, 'JOB DESCRIPTION', 'JOB DESCRIPTION.pdf', '/files/JOB DESCRIPTION.pdf', '2024-01-23 06:44:33'),
(90, 12, 'INFORMATION SHEET', 'MONTASSAR INFO SHEET.pdf', '/files/MONTASSAR INFO SHEET.pdf', '2024-01-23 06:47:12'),
(91, 12, 'CONTRACT', 'Attested Employment Contract1 (1).pdf', '/files/Attested Employment Contract1 (1).pdf', '2024-01-23 06:47:33'),
(92, 12, 'EID', 'MONTASSAR EID.pdf', '/files/MONTASSAR EID.pdf', '2024-01-23 06:47:56'),
(93, 12, 'PP', 'PP.pdf', '/files/PP.pdf', '2024-01-23 06:48:14'),
(94, 12, 'VISA', 'VISA.pdf', '/files/VISA.pdf', '2024-01-23 06:48:30'),
(95, 12, 'EDUCATIONAL CERTIFICATE', 'CERTIFICATE.pdf', '/files/CERTIFICATE.pdf', '2024-01-23 06:48:52'),
(96, 12, 'NOC', 'NOC.pdf', '/files/NOC.pdf', '2024-01-23 06:49:09'),
(97, 12, 'SP PP - EID - VISA', 'SP PP - EID - VISA.pdf', '/files/SP PP - EID - VISA.pdf', '2024-01-23 06:51:39'),
(98, 12, 'SIM - PHONE HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 06:52:29'),
(99, 12, 'LAPTOP HANDOVER', 'LAPTOP HANDOVER.pdf', '/files/LAPTOP HANDOVER.pdf', '2024-01-23 06:53:00'),
(100, 12, 'RAKEZ CARD', 'RAKEZ ID Card1.pdf', '/files/RAKEZ ID Card1.pdf', '2024-01-23 06:54:26'),
(101, 13, 'CV', 'CV.pdf', '/files/CV.pdf', '2024-01-23 06:55:08'),
(102, 13, 'EDUCATIONAL CERTIFICATE', 'EDUCATINAL CERTIFICATE.pdf', '/files/EDUCATINAL CERTIFICATE.pdf', '2024-01-23 06:56:50'),
(103, 13, 'EID', 'EID TRIZAH.pdf', '/files/EID TRIZAH.pdf', '2024-01-23 06:57:58'),
(104, 13, 'PP - VISA', 'PP - VISA.pdf', '/files/PP - VISA.pdf', '2024-01-23 06:58:19'),
(105, 13, 'INFORMATION SHEET', 'TRIZAH - INFO SHEET.pdf', '/files/TRIZAH - INFO SHEET.pdf', '2024-01-23 06:58:53'),
(106, 13, 'JOINING FORM', 'TRIZAH - JOINING FORM.pdf', '/files/TRIZAH - JOINING FORM.pdf', '2024-01-23 06:59:11'),
(107, 13, 'NOC', 'NOC.pdf', '/files/NOC.pdf', '2024-01-23 06:59:50'),
(108, 13, 'SP PP - VISA - EID', 'SP PP VISA EID.pdf', '/files/SP PP VISA EID.pdf', '2024-01-23 07:00:28'),
(109, 13, 'TRADE LICENSE', 'License Letter.pdf', '/files/License Letter.pdf', '2024-01-23 07:00:56'),
(110, 13, 'ESTABLISHMENT CARD', 'Establishment card.pdf', '/files/Establishment card.pdf', '2024-01-23 07:01:19'),
(111, 13, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 07:02:11'),
(112, 13, 'ASSET RETURNED FROM TRIZAH', 'ASSET HANDOVER BY TRIZAH.pdf', '/files/ASSET HANDOVER BY TRIZAH.pdf', '2024-01-23 07:02:38'),
(113, 14, 'offer letter', 'OFFER LETTER SIGNED.pdf', '/files/OFFER LETTER SIGNED.pdf', '2024-01-23 07:07:50'),
(114, 14, 'INFORMATION SHEET', 'INFO SHEET.pdf', '/files/INFO SHEET.pdf', '2024-01-23 07:09:26'),
(115, 14, 'JOINING FORM', 'SULTAN JOINING FORM.pdf', '/files/SULTAN JOINING FORM.pdf', '2024-01-23 07:09:45'),
(116, 14, 'EID', 'EID_ (4).pdf', '/files/EID_ (4).pdf', '2024-01-23 07:14:00'),
(117, 14, 'PP', 'PP.pdf', '/files/PP.pdf', '2024-01-23 07:14:40'),
(118, 14, 'VISA', 'VISA.pdf', '/files/VISA.pdf', '2024-01-23 07:14:59'),
(119, 14, 'RAKEZ CONTRACT', 'Contract_PDF.pdf', '/files/Contract_PDF.pdf', '2024-01-23 07:15:23'),
(120, 14, 'RAKEZ CARD', 'IDCARD-SR-951892.pdf', '/files/IDCARD-SR-951892.pdf', '2024-01-23 07:15:58'),
(121, 14, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 07:16:36'),
(122, 14, 'SIM HANDOVER', 'ASSETHANDOVER.pdf', '/files/ASSETHANDOVER.pdf', '2024-01-23 07:17:28'),
(123, 14, 'WHOM IT MAY CONCERN', 'SALARY CERTIFICATE LETTER.pdf', '/files/SALARY CERTIFICATE LETTER.pdf', '2024-01-23 07:20:48'),
(124, 14, 'SALARY CERTIFICATE', 'SULTAN SALARY CERTIFICATE.pdf', '/files/SULTAN SALARY CERTIFICATE.pdf', '2024-01-23 07:21:29'),
(125, 15, 'OFFER LETTER', 'OFFER LETTER SIGNED.pdf', '/files/OFFER LETTER SIGNED.pdf', '2024-01-23 07:22:58'),
(126, 15, 'EID - VISA', 'EID - VISA.pdf', '/files/EID - VISA.pdf', '2024-01-23 07:26:10'),
(127, 15, 'PP', 'PP.jpeg', '/files/PP.jpeg', '2024-01-23 07:26:29'),
(128, 15, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 07:26:45'),
(129, 15, 'NOC', 'noc.pdf', '/files/noc.pdf', '2024-01-23 07:27:06'),
(130, 15, 'SP EID', 'AZIZ SPONSOR EID.jpeg', '/files/AZIZ SPONSOR EID.jpeg', '2024-01-23 07:27:23'),
(131, 15, 'EDUCATIONAL CERTIFICATE', 'BCom Degree(2).pdf', '/files/BCom Degree(2).pdf', '2024-01-23 07:27:48'),
(132, 15, 'NOC FROM THE 1', 'NOC FOR AZIZ.pdf', '/files/NOC FOR AZIZ.pdf', '2024-01-23 07:28:12'),
(133, 16, 'OFFER LETTER', 'HARISH OFFER LETTER SIGNED.pdf', '/files/HARISH OFFER LETTER SIGNED.pdf', '2024-01-23 07:31:08'),
(134, 16, 'INFORMATION SHEET', 'HARISH INFO SHEET.pdf', '/files/HARISH INFO SHEET.pdf', '2024-01-23 07:31:55'),
(135, 16, 'JOINING FORM', 'JOINING FORM.pdf', '/files/JOINING FORM.pdf', '2024-01-23 07:32:12'),
(136, 16, 'PP - VISA - EID', 'PP - VISA - EID.pdf', '/files/PP - VISA - EID.pdf', '2024-01-23 07:33:46'),
(137, 16, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONL CERTIFICATE.pdf', '/files/EDUCATIONL CERTIFICATE.pdf', '2024-01-23 07:34:05'),
(139, 16, 'EMPLOYMENT CONTRACT', 'ATTESTED EMPLOYMENT CONTRACT.pdf', '/files/ATTESTED EMPLOYMENT CONTRACT.pdf', '2024-01-23 07:37:25'),
(140, 16, 'RAKEZ CARD', 'RAKEZ CARD.pdf', '/files/RAKEZ CARD.pdf', '2024-01-23 07:37:53'),
(141, 17, 'OFFER LETTER', 'OFFER LETTER - RAUAN.pdf', '/files/OFFER LETTER - RAUAN.pdf', '2024-01-23 07:41:48'),
(142, 17, 'INFORMATION SHEET', 'RAUAN INFO SHEET.pdf', '/files/RAUAN INFO SHEET.pdf', '2024-01-23 07:43:01'),
(143, 17, 'JOINING FORM', 'RAUAN JOINING FORM.pdf', '/files/RAUAN JOINING FORM.pdf', '2024-01-23 07:43:19'),
(144, 17, 'EID - PP', 'EID - PP.pdf', '/files/EID - PP.pdf', '2024-01-23 07:43:40'),
(145, 17, 'VISA APPLICATION', 'VISA PAGE.jpeg', '/files/VISA PAGE.jpeg', '2024-01-23 07:44:11'),
(146, 17, 'NOC', 'NOC - RAUAN AKMAMBETOV.pdf', '/files/NOC - RAUAN AKMAMBETOV.pdf', '2024-01-23 07:44:44'),
(147, 17, 'EDUCATIONAL CERTIFICATE', 'Новый документ 2020-02-12 12.05.23_20200212120627.pdf', '/files/ÐÐ¾Ð²ÑÐ¸Ì Ð´Ð¾ÐºÑÐ¼ÐµÐ½Ñ 2020-02-12 12.05.23_20200212120627.pdf', '2024-01-23 07:45:09'),
(148, 18, 'OFFER LETTER', 'ISABELLA OFFER LETTER.pdf', '/files/ISABELLA OFFER LETTER.pdf', '2024-01-23 07:46:09'),
(149, 18, 'EID - PP - VISA', 'EID - PP - VISA.pdf', '/files/EID - PP - VISA.pdf', '2024-01-23 07:52:06'),
(150, 18, 'NOC', 'NOC ISABELLA.pdf', '/files/NOC ISABELLA.pdf', '2024-01-23 07:52:25'),
(151, 18, 'TRADE LICENSE', 'License Letter.pdf', '/files/License Letter.pdf', '2024-01-23 07:52:48'),
(152, 18, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONAL CERTIFICATE.jpeg', '/files/EDUCATIONAL CERTIFICATE.jpeg', '2024-01-23 07:53:08'),
(153, 19, 'CV', 'VALERYIA ZHMYKHAVA CV.pdf', '/files/VALERYIA ZHMYKHAVA CV.pdf', '2024-01-23 07:54:22'),
(154, 19, 'EID', 'EID Valeryia Zhmykhava 3.pdf', '/files/EID Valeryia Zhmykhava 3.pdf', '2024-01-23 07:55:09'),
(155, 19, 'PP', 'Passport Valeryia Zhmykhava.pdf', '/files/Passport Valeryia Zhmykhava.pdf', '2024-01-23 07:55:41'),
(156, 19, 'VISA', 'Visa Valeryia Zhmykhava.pdf', '/files/Visa Valeryia Zhmykhava.pdf', '2024-01-23 07:56:12'),
(157, 20, 'OFFER LETTER', 'OFFER LETTER SIGNED.pdf', '/files/OFFER LETTER SIGNED.pdf', '2024-01-23 07:57:01'),
(158, 20, 'CV', 'CV YASSER.pdf', '/files/CV YASSER.pdf', '2024-01-23 07:57:24'),
(159, 20, 'PP', 'YASSER PP.jpeg', '/files/YASSER PP.jpeg', '2024-01-23 07:57:40'),
(160, 20, 'EID', 'YASSER EID.pdf', '/files/YASSER EID.pdf', '2024-01-23 07:57:54'),
(161, 20, 'EDUCATIONAL CERTIFICATE', 'YASSER CERTIFICATE.pdf', '/files/YASSER CERTIFICATE.pdf', '2024-01-23 07:58:19'),
(162, 20, 'ASSET HANDOVER', 'YASSER ASSET HANDOVER.pdf', '/files/YASSER ASSET HANDOVER.pdf', '2024-01-23 08:04:24'),
(163, 21, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONAL CERTIFICATE.pdf', '/files/EDUCATIONAL CERTIFICATE.pdf', '2024-01-23 10:39:45'),
(164, 21, 'CV', 'CV 2021 YASSINE RIAHI.pdf', '/files/CV 2021 YASSINE RIAHI.pdf', '2024-01-23 10:48:46'),
(165, 21, 'EID', 'EID.pdf', '/files/EID.pdf', '2024-01-23 10:49:43'),
(166, 21, 'PP', 'PP.pdf', '/files/PP.pdf', '2024-01-23 11:38:19'),
(167, 21, 'RAKEZ CONTRACT', 'CONTRACT RAKEZ.pdf', '/files/CONTRACT RAKEZ.pdf', '2024-01-23 11:39:08'),
(168, 21, 'TRAINING CHECKLIST', 'TRAINING CHECKLIST.pdf', '/files/TRAINING CHECKLIST.pdf', '2024-01-23 11:39:49'),
(169, 21, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 11:40:11'),
(170, 21, 'ASSET RETURNED FROM YASSINE', 'ASSET RECEIVED BY YASSINE.pdf', '/files/ASSET RECEIVED BY YASSINE.pdf', '2024-01-23 11:40:42'),
(171, 21, 'LAPTOP UNDERTAKING', 'LAPTOP UNDERTAKING - YASSINE.pdf', '/files/LAPTOP UNDERTAKING - YASSINE.pdf', '2024-01-23 11:41:06'),
(172, 21, 'NFC HANDOVER', 'NFC HANDOVER YASSINE.pdf', '/files/NFC HANDOVER YASSINE.pdf', '2024-01-23 11:41:27'),
(173, 22, 'CV', 'CV.pdf', '/files/CV.pdf', '2024-01-23 11:42:01'),
(174, 22, 'OFFER LETTER', 'OFFER LETTER SIGNED.pdf', '/files/OFFER LETTER SIGNED.pdf', '2024-01-23 11:42:57'),
(175, 22, 'JOB DESCRIPTION', 'JOB DESCRIPTION.pdf', '/files/JOB DESCRIPTION.pdf', '2024-01-23 11:43:20'),
(176, 22, 'INFORMATION', 'INFORMATION SHEET.pdf', '/files/INFORMATION SHEET.pdf', '2024-01-23 11:43:54'),
(177, 22, 'JOINING FORM', 'JOINING FORM.pdf', '/files/JOINING FORM.pdf', '2024-01-23 11:44:12'),
(178, 22, 'EID', 'SOBHAN EID.pdf', '/files/SOBHAN EID.pdf', '2024-01-23 11:44:41'),
(179, 22, 'PP', 'PP.pdf', '/files/PP.pdf', '2024-01-23 11:44:57'),
(180, 22, 'VISA', 'VISA.pdf', '/files/VISA.pdf', '2024-01-23 11:45:14'),
(181, 22, 'SIM - PHONE HANDOVER', 'SIM - PHONE HANDOVER.pdf', '/files/SIM - PHONE HANDOVER.pdf', '2024-01-23 11:56:09'),
(182, 22, 'RAKEZ CONTRACT', 'LIMITED CONTRACT.pdf', '/files/LIMITED CONTRACT.pdf', '2024-01-23 11:56:43'),
(183, 22, 'ASSET HANDOVER', 'LAPTOP HANDOVER.pdf', '/files/LAPTOP HANDOVER.pdf', '2024-01-23 11:57:07'),
(184, 22, 'NFC HANDOVER', 'NFC HANDOVER.pdf', '/files/NFC HANDOVER.pdf', '2024-01-23 11:57:28'),
(185, 22, 'EDUCATIONAL CERTIFICATE', 'EDUCATIONAL CERTIFICATE.pdf', '/files/EDUCATIONAL CERTIFICATE.pdf', '2024-01-23 11:57:54'),
(186, 9, 'CV', 'CV.pdf', '/files/CV.pdf', '2024-01-23 12:09:12'),
(187, 7, 'VISA', 'KISHOR - VISA.pdf', '/files/KISHOR - VISA.pdf', '2024-01-23 12:13:00'),
(188, 7, 'JOB DESCRIPTION', 'KISHOR JOB DESCRIPTION.pdf', '/files/KISHOR JOB DESCRIPTION.pdf', '2024-01-23 12:37:35'),
(189, 7, 'TRAINING CHECKLIST', 'TRAINING CHECKLIST KISHOR.pdf', '/files/TRAINING CHECKLIST KISHOR.pdf', '2024-01-23 12:39:03'),
(190, 8, 'ASSET HANDOVER', 'SAAD ASSET HANDOVER.pdf', '/files/SAAD ASSET HANDOVER.pdf', '2024-01-23 12:39:58'),
(191, 9, 'INFORMATION SHEET', 'SOUHIR INFORMATION SHEET.pdf', '/files/SOUHIR INFORMATION SHEET.pdf', '2024-01-23 12:43:28'),
(192, 15, 'INFORMATION SHEET', 'AZIZ INFORMATION SHEET.pdf', '/files/AZIZ INFORMATION SHEET.pdf', '2024-01-23 12:52:04'),
(193, 16, 'CV', 'HARISH CV.pdf', '/files/HARISH CV.pdf', '2024-01-23 12:52:43'),
(194, 21, 'INFORMATION SHEET', 'YASSINE INFO SHEET.pdf', '/files/YASSINE INFO SHEET.pdf', '2024-01-23 12:56:39'),
(195, 4, 'INFORMATION SHEET', 'FAIZAN INFORMATION SHEET.pdf', '/files/FAIZAN INFORMATION SHEET.pdf', '2024-01-23 12:59:07'),
(196, 4, 'LIMITED CONTRACT - RAKEZ', 'FAIZAN LIMITED CONTRACT.pdf', '/files/FAIZAN LIMITED CONTRACT.pdf', '2024-01-23 12:59:38'),
(197, 9, 'JOB DESCRIPTION', 'SOUHIR JOB DESCRIPTION.pdf', '/files/SOUHIR JOB DESCRIPTION.pdf', '2024-01-23 13:00:50'),
(198, 4, 'NDA', 'NON-DISCLOSURE FAIZAN.pdf', '/files/NON-DISCLOSURE FAIZAN.pdf', '2024-01-23 13:02:04'),
(199, 5, 'JOB DESCRIPTION', 'AYESHA JOB DESCRIPTION.pdf', '/files/AYESHA JOB DESCRIPTION.pdf', '2024-01-23 13:02:44'),
(200, 5, 'ASSET HANDOVER', 'AYESHA HANDOVER.pdf', '/files/AYESHA HANDOVER.pdf', '2024-01-23 13:03:03'),
(201, 23, 'INFORMATION SHEET', 'INFO SHEET.pdf', '/files/INFO SHEET.pdf', '2024-01-23 13:40:13'),
(202, 23, 'OFFER LETTER', 'OFFER LETTER - BILAL.pdf', '/files/OFFER LETTER - BILAL.pdf', '2024-01-23 13:40:43'),
(203, 23, 'JOB DECRIPTION', 'JOB DESCRIPTION.pdf', '/files/JOB DESCRIPTION.pdf', '2024-01-23 13:41:28'),
(204, 23, 'JOINING FORM', 'JOINING FORM - BILAL.pdf', '/files/JOINING FORM - BILAL.pdf', '2024-01-23 13:50:34'),
(205, 23, 'EID - PP', 'Bilal docs.pdf', '/files/Bilal docs.pdf', '2024-01-23 13:51:12'),
(206, 23, 'VISA', 'VISA.jpeg', '/files/VISA.jpeg', '2024-01-23 13:51:37'),
(207, 23, 'EDUCATIONAL CERTIFICATE', 'CERTIFICATE 2.jpeg', '/files/CERTIFICATE 2.jpeg', '2024-01-23 13:52:06'),
(208, 23, 'NOC', 'NOC.pdf', '/files/NOC.pdf', '2024-01-23 13:52:31'),
(209, 23, 'SP EID - PP - VISA', 'Ashaq Hussain passport and Visa.pdf', '/files/Ashaq Hussain passport and Visa.pdf', '2024-01-23 13:53:31'),
(210, 23, 'ESTABLISHMENT CARD', 'Establishment_Card (35).pdf', '/files/Establishment_Card (35).pdf', '2024-01-23 13:54:01'),
(211, 23, 'TRADE LICENSE', 'License (7).pdf', '/files/License (7).pdf', '2024-01-23 13:54:26'),
(212, 23, 'ASSET HANDOVER', 'ASSET HANDOVER.pdf', '/files/ASSET HANDOVER.pdf', '2024-01-23 13:55:05'),
(213, 25, 'OFFER LETTER', 'RAKEZ STAMPED OFFER LETTER.pdf', '/files/RAKEZ STAMPED OFFER LETTER.pdf', '2024-01-24 13:01:59'),
(214, 25, 'RAKEZ CONTRACT', 'MOSTAFA CONTRACT STAMPED.pdf', '/files/MOSTAFA CONTRACT STAMPED.pdf', '2024-01-24 13:02:25'),
(215, 25, 'EID', 'MOSTAFA EID.pdf', '/files/MOSTAFA EID.pdf', '2024-01-24 13:02:42'),
(216, 25, 'PP COPY', 'Mostafa Passport Copy.pdf', '/files/Mostafa Passport Copy.pdf', '2024-01-24 13:03:07'),
(217, 25, 'VISA', 'MOSTAFA VISA.pdf', '/files/MOSTAFA VISA.pdf', '2024-01-24 13:03:31'),
(218, 25, 'EDUCATIONAL CERTIFICATE', 'Educational Certificate.pdf', '/files/Educational Certificate.pdf', '2024-01-24 13:04:24'),
(219, 27, 'OFFER LETTER', 'Job Offer Letter - Signed.pdf', '/files/Job Offer Letter - Signed.pdf', '2024-01-24 13:14:15'),
(220, 27, 'RAKEZ - CONTRACT', 'LIMITED EMPLOYMENT CONTRACT (3).pdf', '/files/LIMITED EMPLOYMENT CONTRACT (3).pdf', '2024-01-24 13:14:50'),
(221, 27, 'PP COPY', 'Passport Abdul Razzaq.pdf', '/files/Passport Abdul Razzaq.pdf', '2024-01-24 13:15:18'),
(222, 27, 'EID', 'Abdul Razzaq EID.pdf', '/files/Abdul Razzaq EID.pdf', '2024-01-24 13:15:37'),
(223, 27, 'VISA', 'VISA_15925884 (1).pdf', '/files/VISA_15925884 (1).pdf', '2024-01-24 13:16:26'),
(224, 24, 'OFFER LETTER', 'M. Shanik Offer letter.pdf', '/files/M. Shanik Offer letter.pdf', '2024-01-24 13:21:13'),
(225, 24, 'CERTIFICATE', 'MBA Certificate - Shan 111.pdf', '/files/MBA Certificate - Shan 111.pdf', '2024-01-24 13:21:51'),
(226, 24, 'EID - VISA - PP', 'EID - VISA - PP.pdf', '/files/EID - VISA - PP.pdf', '2024-01-24 13:27:25'),
(227, 24, 'EID - VISA - PP', 'EID - VISA - PP.pdf', '/files/EID - VISA - PP.pdf', '2024-01-24 13:27:25'),
(228, 24, 'RAKEZ CARD', 'RAKEZ ID Card.pdf', '/files/RAKEZ ID Card.pdf', '2024-01-27 06:05:59'),
(234, 26, 'EID', 'Ashmin EID 2024.pdf', '/files/Ashmin EID 2024.pdf', '2024-01-27 06:21:04'),
(235, 26, 'PP', 'Ashmi PP copy New-1 page.pdf', '/files/Ashmi PP copy New-1 page.pdf', '2024-01-27 06:21:34'),
(236, 26, 'VISA', 'Owners Visa Copy.pdf', '/files/Owners Visa Copy.pdf', '2024-01-27 06:22:04'),
(237, 28, 'OFFER LETTER', 'job offer letter-mubsem.pdf', '/files/job offer letter-mubsem.pdf', '2024-01-27 06:24:17'),
(238, 28, 'RAKEZ CONTRACT', '20220921064208.pdf', '/files/20220921064208.pdf', '2024-01-27 06:25:15'),
(239, 28, 'EID', 'EID MUBSEM.pdf', '/files/EID MUBSEM.pdf', '2024-01-27 06:27:44'),
(240, 28, 'PP', 'Mubsem passport new.pdf', '/files/Mubsem passport new.pdf', '2024-01-27 06:29:32'),
(241, 28, 'VISA', 'New Visa.pdf', '/files/New Visa.pdf', '2024-01-27 06:30:28'),
(242, 28, 'WORK PERMIT', 'Work Permit FZ-Mubsem.pdf', '/files/Work Permit FZ-Mubsem.pdf', '2024-01-27 06:31:46'),
(243, 57, 'CV', 'CV.pdf', '/files/CV.pdf', '2024-02-13 07:20:26');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employeeId` int(11) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `dateOfBirth` date NOT NULL,
  `gender` text NOT NULL,
  `nic` text DEFAULT NULL,
  `nationality` text NOT NULL,
  `maritalStatus` varchar(45) NOT NULL,
  `email` text NOT NULL,
  `mobile` text NOT NULL,
  `country` text NOT NULL,
  `state` text DEFAULT NULL,
  `city` text NOT NULL,
  `postalCode` varchar(45) NOT NULL,
  `address` text NOT NULL,
  `photoUrl` text NOT NULL,
  `cvUrl` text DEFAULT NULL,
  `lineManagerId` int(11) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `officeId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  `createAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendance`
--

CREATE TABLE `employee_attendance` (
  `attendanceId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `status` text NOT NULL,
  `dateTime` datetime NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiesAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_bank_info`
--

CREATE TABLE `employee_bank_info` (
  `bankId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `bankName` text NOT NULL,
  `branch` text NOT NULL,
  `accountName` text NOT NULL,
  `accountNumber` text NOT NULL,
  `swift` text NOT NULL,
  `iban` text NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_benifits`
--

CREATE TABLE `employee_benifits` (
  `benifitId` int(11) NOT NULL,
  `employeeId` varchar(45) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `maxAmount` double NOT NULL DEFAULT 0,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_documents`
--

CREATE TABLE `employee_documents` (
  `documentId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `title` text NOT NULL,
  `fileUrl` text NOT NULL,
  `employeePrivacy` tinyint(1) NOT NULL DEFAULT 0,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_emergency_contacts`
--

CREATE TABLE `employee_emergency_contacts` (
  `contactId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `name` text NOT NULL,
  `relationship` text NOT NULL,
  `phone` text NOT NULL,
  `fileUrl` text DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_job_info`
--

CREATE TABLE `employee_job_info` (
  `jobInfoId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `jobTitleId` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `joinDate` date NOT NULL,
  `departmentId` int(11) NOT NULL,
  `officeId` int(11) NOT NULL,
  `positionType` text NOT NULL COMMENT 'One-site\nRemote\nHybrid',
  `lineManagerId` int(11) NOT NULL,
  `employmentType` text NOT NULL,
  `isCurrent` tinyint(4) NOT NULL DEFAULT 0,
  `offboardDate` date DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_leave_requests`
--

CREATE TABLE `employee_leave_requests` (
  `leaveId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `leaveType` text NOT NULL,
  `message` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `fileUrl` text DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_offboard_info`
--

CREATE TABLE `employee_offboard_info` (
  `offboardId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `resignationDate` date NOT NULL,
  `lastWorkingDate` date NOT NULL,
  `reason` text NOT NULL,
  `leaveNote` text NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_payroll_info`
--

CREATE TABLE `employee_payroll_info` (
  `ipayrollId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `jobInfoId` int(11) NOT NULL,
  `salaryId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_probation_info`
--

CREATE TABLE `employee_probation_info` (
  `probationId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `evaluationDate` date DEFAULT NULL,
  `fileUrl` text DEFAULT NULL,
  `comments` text NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_salary_info`
--

CREATE TABLE `employee_salary_info` (
  `salaryId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL,
  `effectiveStart` date NOT NULL,
  `effectiveEnd` date DEFAULT NULL,
  `salary` double NOT NULL,
  `reason` text NOT NULL,
  `currency` varchar(45) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `eventId` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `type` varchar(45) NOT NULL,
  `dateTime` datetime NOT NULL,
  `fileUrl` text DEFAULT NULL,
  `officeId` int(11) NOT NULL,
  `createAt` datetime DEFAULT current_timestamp(),
  `modifiedDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_titles`
--

CREATE TABLE `job_titles` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text DEFAULT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_titles`
--

INSERT INTO `job_titles` (`id`, `title`, `description`, `createAt`, `modifiedAt`) VALUES
(1, 'Senior Flutter Developer', 'develop the apps for company', '2024-02-14 00:00:00', '2024-02-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `officeId` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `contact` text NOT NULL,
  `country` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  `address` text NOT NULL,
  `timezone` text DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `companyId` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`officeId`, `name`, `email`, `contact`, `country`, `city`, `postalCode`, `address`, `timezone`, `startDate`, `endDate`, `companyId`, `createAt`, `modifiedAt`) VALUES
(2, 'Head Office', 'abcd@gmail.com', '78622565', 'hajfhakjshfaeifhjkasdhfj', 'asdfajhdfkj ahdjfhadsjfh asjdhf kj', 'Pakistan', '', 'Ali raza', '2022-01-01', '2022-01-01', 7, '2024-02-18 12:23:24', '2024-02-18 17:25:04'),
(4, 'Head Office', 'abc@gmail.com', '78622565', 'hajfhakjshfaeifhjkasdhfj', 'asdfajhdfkj ahdjfhadsjfh asjdhf kj', 'Pakistan', '', 'Ali raza', '2022-01-01', '2022-01-01', 7, '2024-02-19 10:02:58', '2024-02-19 10:02:58');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `fullName` text NOT NULL,
  `fatherName` text NOT NULL,
  `gender` varchar(45) NOT NULL,
  `mobile` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `nic` text NOT NULL,
  `address` text NOT NULL,
  `emergencyContact` text DEFAULT NULL,
  `dob` date NOT NULL,
  `photo` text NOT NULL,
  `maritalStatus` varchar(45) NOT NULL,
  `nationality` text NOT NULL,
  `designation` text NOT NULL,
  `department` text NOT NULL,
  `reportingManager` text NOT NULL,
  `jobType` varchar(45) NOT NULL,
  `joiningDate` date NOT NULL,
  `jobLocation` text NOT NULL,
  `salary` varchar(45) NOT NULL,
  `education` text NOT NULL,
  `experience` text NOT NULL,
  `fcmToken` text NOT NULL,
  `status` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `fullName`, `fatherName`, `gender`, `mobile`, `email`, `password`, `nic`, `address`, `emergencyContact`, `dob`, `photo`, `maritalStatus`, `nationality`, `designation`, `department`, `reportingManager`, `jobType`, `joiningDate`, `jobLocation`, `salary`, `education`, `experience`, `fcmToken`, `status`, `role`, `createAt`) VALUES
(3, 'Abdul Rehman', 'Muhammad Ramzan Ali', 'Male', '+923089098067', 'mr.abdulrehman.ar@gmail.com', 'U2FsdGVkX18VKBOfd2Ks9DXdZiqdvlRplpsciRRmTMI=', '545-55787878-445', 'Okara, Punjab, Pakistan', '', '1997-01-18', '/files/mypic.jpg', 'Married', 'Pakistani', 'Flutter Developer', 'Development', 'Muhammad Faizan', 'Full Time', '2023-10-16', 'Remote', '100000', 'MSCS', '3 Years', '', 'Active', 'admin', '2024-01-08 06:07:22'),
(4, 'Muhammad Faizan', 'Tariq', 'Male', '0563202330', 'marketing@the1properties.com', 'U2FsdGVkX19A6/Rm5LSb+q0kBS3teHTTr9/DGsAJfuI=', '784-1996-7079011-4', 'Ras Al khaimah', '', '1996-08-16', '/files/FAIZAN PHOTO.jpeg', 'Married', 'Pakistan', 'Manager', 'Marketing', 'Mostafa', 'Full Time', '2021-08-01', 'Ras Al Khaimah', '4000', 'Master', '3', '', 'Active', 'admin', '2024-01-08 14:07:38'),
(5, 'Ayesha Muhammad Rafique', 'Muhammad Rafique Wali', 'Female', '0509321457', 'aisha@the1properties.com', 'U2FsdGVkX18jU71RQ9zUt4gWB/CuklktfGjqGyPiKHs=', '784-1994-9403737-9', 'U.A.Q', '0509321457', '1994-08-13', '/files/PIC NEW.png', 'Single', 'Pakistan', 'Admin', 'Administration', 'Tehreem Mirza', 'Full Time', '2022-11-10', 'RAKEZ - AMenity centre - T1 - 11th Floor- office 5', '2500', 'BBA', '2', '', 'Active', 'admin', '2024-01-12 13:22:05'),
(6, 'Tehreem Mirza Muhammad Shahid', 'Mirza Muhammad Shahid', 'Female', '0525200310', 'tehreem@the1properties.com', 'U2FsdGVkX1/WWfxM2mxNVMmCaHwYYOyvA8jRytD129E=', '784-1997-7243807-5', 'Khuzam - RAK', '0505204660', '1997-11-23', '/files/PHOTO.png', 'Single', 'Pakistan', 'Office Manager', 'Management', 'Abdulrazzaq Tufail', 'Full Time', '2022-03-28', 'RAKEZ - Al Hamra', '4000', 'Bachelors of Business Administration', '2', '', 'Active', 'admin', '2024-01-22 06:59:15'),
(7, 'Kishor Shakya', 'Shakya', 'Male', '0557905029', 'kishor@the1properties.com', 'U2FsdGVkX18KhIsYMtJIdn1c1eSkJreca9akHghAtzs=', '784-1984-6979835-3', 'Al Rams', '0553180157', '1984-01-06', '/files/PHOTO.png', 'Married', 'Nepal', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2021-05-15', 'Julphar', '3000', 'Bachelors of arts', '3', '', 'Active', 'user', '2024-01-22 07:22:17'),
(8, 'Sad Ahmad H Taha', 'Taha', 'Male', '0529249494', 'saad@the1properties.com', 'U2FsdGVkX1+VE1raY5o9VXkf4NAJ5RAeFeUE6PfhvSY=', '784-1993-7132659-8', 'Khuzam', '0508262612', '1993-08-24', '/files/PHOTO.png', 'Married', 'Jordan', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-02-04', 'RAKEZ - Al Hamra', '0', 'High School', '2', '', 'Active', 'user', '2024-01-22 08:45:22'),
(9, 'Souhir Ait Barrehil', 'Barrehil', 'Female', '0552223737', 'souhir@the1properties.com', 'U2FsdGVkX1/g7dDY/a5QZStIwYCqk0qW6h54zbzVofs=', '784-1986-4986575-9', 'Mina Al Arab', '0566275529', '1986-12-20', '/files/SOUHIR PP.png', 'Married', 'Morroco', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-04-01', 'RAKEZ', '3000', 'Bachelors in sciense', '2', '', 'Active', 'user', '2024-01-22 10:14:05'),
(10, 'Muhammad Saeed Uddin', 'Rahim Uddin', 'Male', '0558611853', 'msaeed@the1properties.com', 'U2FsdGVkX18UNcjkrjKD1Q46Up34InFAkVN1PEm4t7Q=', '784-1999-8052646-3', 'Khuzam', '0554512354', '1999-07-17', '/files/PHOTO.png', 'Married', 'Pakistan', 'Property Consultant', 'Sales', 'Kishor Shakya', 'Full Time', '2023-02-14', 'RAKEZ', '-', 'High school', '1', '', 'Active', 'user', '2024-01-22 10:31:10'),
(11, 'Diane', 'Petty', 'Female', '0504571184', 'diane@the1properties.com', 'U2FsdGVkX19voUVQftUBb9ghYYcJYXLAfHwt6B+dweo=', '784-1955-3627619-9', 'Al Hamra viilage', '', '1970-01-10', '/files/PHOTO.png', 'Married', 'British', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-03-09', 'RAKEZ', '-', 'High School', '1', '', 'Active', 'user', '2024-01-22 11:26:56'),
(12, 'Montassar Belah', 'Tlili', 'Male', '0505606984', 'montassar@the1properties.com', 'U2FsdGVkX19BUAyLadPmg6v5L3d5KDRWIr9tMP06EN0=', '784-1987-1570521-0', 'Qusaidath - RAK', '0505606984', '1987-12-07', '/files/PHOTO.png', 'Married', 'Tunisia', 'Property Consultant', 'Sales', 'Kishor', 'Full Time', '2023-09-07', 'Julphar Tower', '-', 'International economic finance', '6 months', '', 'Active', 'user', '2024-01-22 11:41:20'),
(13, 'Trizah Wairimu', 'Wanyoike', 'Female', '0565368181', 'trizah@the1properties.com', 'U2FsdGVkX19WUlFMpZI01Safs6RaI+B7hcUygDK1X+M=', '784-1994-6247647-6', 'Mina Al Arab - RAK', '0565368080', '1994-12-20', '/files/PHOTO.png', 'Single', 'Kenya', 'Property Consultant', 'Sales', 'Kishor', 'Full Time', '2023-08-25', 'RAKEZ', '-', 'Bachelors in Human Resource', '5 months', '', 'Active', 'user', '2024-01-22 11:48:00'),
(14, 'Sultan Khalil Houssni', 'Al Yaaqbeh', 'Male', '0553093771', 'sultan@the1properties.com', 'U2FsdGVkX1/bAuXLUaiXemVVZroWZvtFxIu5ErFlS7E=', '784-1988-7284105-5', 'RAK', '00962787136506', '1988-02-11', '/files/PHOTO.png', 'Single', 'Jordan', 'Property Consultant', 'Sales', 'Abdulrazzaq', 'Full Time', '2023-11-01', 'RAKEZ', '-', 'High school', '2 months', '', 'Active', 'user', '2024-01-22 11:55:13'),
(15, 'Muhammad Aziz Uddin', 'Rahim Uddin', 'Male', '0554512354', 'finance@the1properties.com', 'U2FsdGVkX18DYbLnyg8BqkAHtKKm+x8cILAO8h8Jslg=', '784-1998-3903806-6', 'Khuzam', '0558611853', '1998-08-17', '/files/PHOTO.png', 'Married', 'Pakistan', 'Accountant', 'Finance', 'Abdulrazzaq Tufail', 'Full Time', '2023-09-22', 'RAKEZ', '2500', 'ACCA', '4 months', '', 'Active', 'user', '2024-01-22 12:04:07'),
(16, 'Harish Krishna Morthy', 'Krishna', 'Male', '0585087844', 'harish@the1properties.com', 'U2FsdGVkX18EfpyBZ3wFDTMe6V4k5CUMjg3RdEv0viY=', '784-1997-5210145-3', 'Mina Al Arab', '09841059299', '1997-09-25', '/files/PHOTO.png', 'Single', 'India', 'Videographer', 'Marketing', 'Faizan Traiq', 'Full Time', '2023-10-18', 'RAKEZ', '3500', 'High School', '3 months', '', 'Active', 'user', '2024-01-22 12:09:33'),
(17, 'Rauan', 'Akmambetov', 'Male', '0568476968', 'rauan@the1properties.com', 'U2FsdGVkX1/S+Ih33THEoQNQAggY6tTlHlNH0xf1aUA=', '784-1997-2715720-0', 'RAK', '0565450991', '1997-12-18', '/files/PHOTO.png', 'Single', 'Kazakhistan', 'Property Consultant', 'sales', 'Kishor', 'Full Time', '2023-10-24', 'Julphar', '-', 'High school', '3 months', '', 'Active', 'user', '2024-01-22 12:20:26'),
(18, 'Yeannette Isabella Gebkollisch', 'Barthel', 'Female', '0503083108', 'isabella@the1properties.com', 'U2FsdGVkX194Qp/vShtfag7/0f75ob9HP9c1EWDrNt4=', '784-1971-3572090-8', 'Mina Al Arab', '0566704642', '1971-12-09', '/files/PHOTO.png', 'Married', 'German', 'Property Consultant', 'Sales', 'Kishor', 'Full Time', '2024-01-22', 'Julphar', '-', 'High School', '1 month', '', 'Active', 'user', '2024-01-22 12:41:04'),
(19, 'Valeryia', 'Zhmykhava', 'Female', '0585973353', 'valeryia@the1properties.com', 'U2FsdGVkX1+9gaN7f1rYkAsTKE+GYQESLY73t8CeNEk=', '784-1979-7692181-3', 'RAK', '', '1979-04-01', '/files/PHOTO.png', 'Single', 'Belarus', 'Property Consultant', 'Sales', 'Kishor', 'Full Time', '2024-01-22', 'Julphar', '-', 'High school', '1 Month', '', 'Active', 'user', '2024-01-22 12:58:00'),
(20, 'Yasser Mohamed Abd', 'Al Razek', 'Male', '0566954295', 'nouman@the1properties.com', 'U2FsdGVkX18O577CmgL9Wyo4dmBCt0K6GB3x9dxG7GE=', '784-1990-6108743-5', 'Al Nakheel', '0563338199', '1990-09-18', '/files/PHOTO.png', 'Married', 'Egypt', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2024-01-15', 'RAKEZ', '-', 'Bachelors', '1 month', '', 'Active', 'user', '2024-01-22 13:05:21'),
(21, 'Yassine', 'Riahi', 'Male', '0521246990', 'yassine@the1properties.com', 'U2FsdGVkX1/A61Um/SH3KAJWrdfgIMSBTb3jjD6Hmdg=', '784-1985-4158812-9', 'Mina Al Arab', '0561165873', '1985-07-20', '/files/PHOTO.png', 'Married', 'Morroco', 'Property Consultant', 'Sales', 'Kishor', 'Full Time', '2022-11-15', 'Julphar', '-', 'High School', '1 Year', '', 'Active', 'user', '2024-01-23 10:25:01'),
(22, 'Sobhan Mushtaq', 'Mushtaq Hussain', 'Male', '0524741783', 'msubhan@the1properties.com', 'U2FsdGVkX1/XVaHLTXiJiquGzRj6HOfoAl5QNX7PKMc=', '784-1996-9510872-2', 'RAK', '0544700106', '1996-05-08', '/files/PHOTO.JPG', 'Married', 'Pakistan', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-06-01', 'RAKEZ', '-', 'High School', '6 months', '', 'Active', 'user', '2024-01-23 10:35:11'),
(23, 'Bilal', 'Ashiq', 'Male', '0559258192', 'bilal@the1properties.com', 'U2FsdGVkX1/0b5vj0dNFun1sr2HB+errbic7jaorTCQ=', '784-1985-7509026-7', 'RAK', '0554233728', '1985-01-05', '/files/PHOTO.png', 'Married', 'USA', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-07-10', 'Rakez', '-', 'Bachelors of science in Accounting', '6 Months', '', 'Active', 'user', '2024-01-23 13:39:07'),
(24, 'Muhammad Shanik Puthiyaveettil', 'Majeed', 'Male', '0509762626', 'shanik@the1properties.com', 'U2FsdGVkX19T5SQmm81WoysxW3Na6AImDMZyCDEl2hI=', '784-1981-5949587-2', 'RAK', '0502717999', '1987-04-24', '/files/DSC_0964.JPG', 'Married', 'India', 'Manager', 'Maintenance', 'Abdulrazzaq Tufail', 'Full Time', '2020-12-10', 'RAKEZ', '4000', 'Bachelors in Business Administration', '3 Years', '', 'Active', 'user', '2024-01-24 07:16:37'),
(25, 'Mostafa Ahmad Mostafa', 'Hazim', 'Male', '0502717999', 'mostafa@the1properties.com', 'U2FsdGVkX1+KP3HTJEf57rj7l5kxD/civNlaY+1c5+k=', '784-1981-3963724-7', 'Al Daith North - RAK', '0505978824', '1981-09-05', '/files/Passport Picture.jpeg', 'Married', 'Jordan', 'CCO', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-05-19', 'Rakez', '-', 'High School', '2 Years', '', 'Active', 'user', '2024-01-24 09:03:28'),
(26, 'Ashmin Muhammad Shanik Asharaf', 'Kannankilath', 'Female', '0509762626', 'admin@the1properties.com', 'U2FsdGVkX1+nsz0tMKkiIVy5PeThUzgSUTAVk4kBO94=', '784-1987-9864919-4', 'RAK', '0505978824', '1987-01-01', '/files/Ashmi PP size New.jpeg', 'Married', 'India', 'Manager', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2020-01-20', 'Rakez', '-', 'High School', '3 Years', '', 'Active', 'user', '2024-01-24 12:46:15'),
(27, 'Abdul Razzaq Muhammad', 'Tufail', 'Male', '0505978824', 'abdulrazzaq@the1properties.com', 'U2FsdGVkX18+uLHtxrwBZZp1O8PQlofvSo/0GX9eLZg=', '784-1975-3575470-5', 'Mina Al Arab', '0502717999', '1975-10-01', '/files/6518.JPG', 'Married', 'Pakistan', 'Ceo', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-07-14', 'Rakez', '-', 'High School', '3 Years', '', 'Active', 'user', '2024-01-24 13:12:56'),
(28, 'Maysam Murad', 'Abo Rebea', 'Male', '0567350500', 'mubsem@the1properties.com', 'U2FsdGVkX18yO9LbTHoVJ1BMpBP7SUF2djXnB7SeWkA=', '784-19880468716-2', 'RAK', '', '1988-09-01', '/files/PP size Photo.jpeg', 'Single', 'Syrian Arab Republic', 'Sales Manager', 'Sales', 'Mostafa', 'Full Time', '2024-01-24', 'Rakez', '-', 'High School', '1 Year 10 Months', '', 'Inactive', 'user', '2024-01-24 13:44:04'),
(29, 'Yousef El Araby Hassan', 'Khaleel', 'Male', '9715236700243', 'yousef@the1properties.com', 'U2FsdGVkX18q5JC38lB3HSR+6BeHpMVZ4ZYvespJc7Y=', '784-1998-1713183-4', 'RAK', '', '1998-06-05', '/files/Youssef PP size white.jpg', 'Single', 'Sri Lanka', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2024-01-25', 'RAKEZ', '-', 'High School', '11 Months', '', 'Inactive', 'user', '2024-01-25 07:42:29'),
(30, 'Lubna Iqbal', 'Alimiya', 'Female', '971556102792', 'lubna@the1properties.com', 'U2FsdGVkX19Q/novGzcIUJ/WfrnddNYG0kmd84k6QBk=', '784-1988-6038283-1', 'RAK', '', '1988-02-03', '/files/PHOTO.png', 'Single', 'India', 'Admin', 'Administrtion', 'Shanik', 'Full Time', '2021-10-09', 'RAKEZ', '3500', 'High School', '5 Months', '', 'Inactive', 'user', '2024-01-25 07:48:29'),
(31, 'Mohamed Emad Hamdy', 'Abdelbari', 'Male', '507651750', 'emad@the1properties.com', 'U2FsdGVkX190LcEWjjoDbGBr9N5LYDxMc1LtTlKZ51w=', '784-1992-7698328-7', 'RAK', '', '1992-11-08', '/files/PP Size Pik.jpg', 'Single', 'Palestine', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2021-01-11', 'RAKEZ', '-', 'High School', '6 Months', '', 'Inactive', 'user', '2024-01-25 07:55:18'),
(32, 'Sabri Rabee', 'Alhamed', 'Male', '543490953', 'sabri@the1properties.com', 'U2FsdGVkX1+CD3u11EUI+Ohf3nsH4alc7pooqK8ElpU=', '784-1987-5465148-1', 'RAK', '', '1987-01-01', '/files/PHOTO.png', 'Married', 'Syrian Arab Republic', 'Property Consultant', 'Sales', 'Shanik', 'Full Time', '2022-01-04', 'RAKEZ', '-', 'High School', '3 Months', '', 'Inactive', 'user', '2024-01-25 08:00:33'),
(33, 'Mohamed Mahmoud Ahmed', 'Hassan', 'Male', '971558447007', 'mohamed@the1properties.com', 'U2FsdGVkX180e1oiM62KmTAEfkIqZqKBN7RfGQ5dMgc=', '784-1979-2485361-3', 'Abu Dhabi', '', '1979-12-17', '/files/4x6.jpg', 'Married', 'Egypt', 'Property Consultant', 'Sales', 'Maysam', 'Full Time', '2022-02-02', 'RAKEZ', '-', 'High School', '5 Months', '', 'Inactive', 'user', '2024-01-25 08:09:12'),
(34, 'Sherif Abdelnabbi', 'Mabrouk Abdrabbo', 'Male', '521090277', 'sherif@the1properties.com', 'U2FsdGVkX18d3VS8rdEi5zYhTdjezOzPhkA7Qhqp9NM=', '27935408', 'RAK', '', '1979-07-03', '/files/Screenshot 2024-01-25 121636.png', 'Married', 'Egypt', 'Property Consultant', 'Sales', 'Shanik', 'Full Time', '2022-03-22', 'Rakez', '-', 'High School', '0', '', 'Inactive', 'user', '2024-01-25 08:17:12'),
(35, 'Obaid Majid Bhat', 'Abdul Majid Bhat', 'Male', '971569855089', 'obaid@the1properties.com', 'U2FsdGVkX19P0RbtKqlqEWyi/eJYh2Bx/nXKR860/iA=', '784-1989-50074075-7', 'RAK', '', '1989-07-20', '/files/Passport Picture.jpg', 'Married', 'India', 'Property Consultant', 'Sales', 'Shanik', 'Full Time', '2022-04-04', 'RAKEZ', '2000', 'High Scool', '6 months', '', 'Inactive', 'user', '2024-01-25 08:25:54'),
(36, 'Chadia', 'Bakadir', 'Female', '0545462721', 'chadia@the1properties.com', 'U2FsdGVkX18lu5IaKJAtwtItwKctCKXrFoBaAYD6a34=', '784-1980-4764130-7', 'RAK', '', '1980-08-13', '/files/image (1).jpeg', 'Single', 'Morroco', 'Property Consultant', 'Sales', 'Mostafa', 'Full Time', '2022-05-27', 'RAKEZ', '2000', 'Diploma in finance', '1 year', '', 'Inactive', 'user', '2024-01-25 08:31:41'),
(37, 'Kyle Damian', 'Davis', 'Male', '502923816', 'Kyle@the1properties.com', 'U2FsdGVkX1+TcvEYkniELJeNEAcdGAl4FnCejqW2kgk=', '784-1998-3162170-3', 'RAK', '', '1998-02-22', '/files/WhatsApp Image 2022-07-02 at 9.13.55 AM.jpeg', 'Single', 'South Africa', 'Property Consultant', 'Sales', 'Shanik', 'Full Time', '2022-07-01', 'RAKEZ', '2000', 'High School', '3 Months', '', 'Inactive', 'user', '2024-01-25 08:36:04'),
(38, 'Hanieh Hooshang', 'Ahmad', 'Female', '971521858886', 'hanieh@the1properties.com', 'U2FsdGVkX18SXPm4nSYJLqMriYfuKBZAE0DgChdqlio=', '784-1985-4876937-5', 'RAK', '', '1985-05-27', '/files/Picture.jpeg', 'Single', 'slamic Republic of Iran', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-07-05', 'RAKEZ', '2000', 'High School', '8 Months', '', 'Inactive', 'user', '2024-01-25 08:40:47'),
(39, 'Mohammad Oussamah', 'Alahmed', 'Male', '971506002319', 'Mohammad@the1properties.com', 'U2FsdGVkX1/Z9XMF3+fM5TY9RHeCka7P8MTKjVv5jpc=', '784-1999-0241091-1', 'RAK', '', '1999-05-08', '/files/Screenshot 2024-01-25 124620.png', 'Single', 'Syrian Arab Republic', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-07-15', 'RAKEZ', '2000', 'High School', '10 Months', '', 'Inactive', 'user', '2024-01-25 08:47:19'),
(40, 'Kareem', 'Hany', 'Male', '971585386658', 'kareem@the1properties.com', 'U2FsdGVkX18tpzbI36SoHAIp3iJ/z02pi/PNe/WFWV8=', '784-1986-5463618-9', 'RAK', '', '1986-11-07', '/files/Screenshot 2024-01-25 132735.png', 'Married', 'Egypt', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-09-09', 'RAKEZ', '0', 'High School', '0', '', 'Inactive', 'user', '2024-01-25 09:29:29'),
(41, 'Lisa Josepha', 'Brashear', 'Female', '0503655180', 'lisa@the1properties.com', 'U2FsdGVkX1+XlBV8tSxriB34FspLisy5R0+qsSZoXaM=', '784-1982-3981304-5', 'RAK', '', '1989-04-21', '/files/Screenshot 2024-01-25 152725.png', 'Married', 'USA', 'Property consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-10-19', 'RAKEZ', '-', 'Masters of Arts', '1 Month', '', 'Inactive', 'user', '2024-01-25 11:28:25'),
(42, 'Abdelrahman Mohamed Nadim', 'Mohamed Sadek Drag', 'Male', '0589710944', 'abdelrahman@the1properties.com', 'U2FsdGVkX1+YtvBmq5aN9uBVu/E29oSiNIN2w1o5RT8=', '784-1997-2596500-0', 'RAK', '', '1997-10-20', '/files/19767-2021.jpg', 'Single', 'Egypt', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-11-02', 'RAKEZ', '-', 'Bachelors', '2 Months', '', 'Inactive', 'user', '2024-01-25 12:30:00'),
(43, 'Marisa', 'Bialas', 'Female', '542040029', 'info@bialasimmobilien.com', 'U2FsdGVkX19pdyQe/HK/6aSpn5Pc/rsDMnWfW5uUurQ=', '-----', 'RAK - Al Hamra', '', '1982-07-17', '/files/Screenshot 2024-01-25 163527.png', 'Single', 'German', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-12-19', 'RAKEZ', '-', 'Bachelors in finance', '0 Months', '', 'Inactive', 'user', '2024-01-25 12:35:59'),
(44, 'Ruan', 'Longfei', 'Male', '585301187', 'ruan@the1properties.com', 'U2FsdGVkX18DBWZ7DgXB259dwmXMlIlK0rqJTkqi+Ts=', '----', 'China', '', '1990-12-10', '/files/PHOTO.jpeg', 'Single', 'China', 'Proprty Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2022-12-25', 'RAKEZ', '-', 'High School', '0 Months', '', 'Inactive', 'user', '2024-01-25 12:39:18'),
(45, 'Shadi', 'Humeid', 'Male', '971504243584', 'shadi@gmail.com', 'U2FsdGVkX1+iz7tEZGC6yNHZwo+BTJrMdefS14PJ8Vc=', '----', 'RAK', '', '1980-05-09', '/files/Passport Size Picture.jpeg', 'Married', 'Jordan', 'Sales Manager', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-02-01', 'RAKEZ', '7000', 'High School', '0 Months', '', 'Inactive', 'user', '2024-01-26 07:57:06'),
(46, 'Jamal Saoud Sabil', 'Kashmir', 'Male', '0565996751', 'jamal@the1proprties.com', 'U2FsdGVkX18kY1w7bNcxqmbCcTiHbdhHBqSRAeywUUI=', '784-2002-8132415-0', 'RAK', '', '2002-05-26', '/files/DSC_0388.jpg', 'Single', 'Comoros', 'High School', 'Sales', 'Karen', 'Full Time', '2023-03-16', 'Julphar', '0', 'High School', '4 Months', '', 'Inactive', 'user', '2024-01-26 08:36:15'),
(47, 'Asiaunisa', 'Begum', 'Female', '971505978824', 'admin@the1proprties.com', 'U2FsdGVkX1/MIDY8LRdJ33yDomcnuoKqbq41bB+xhfs=', '784-1963-6497204-0', 'RAK', '', '1970-01-07', '/files/2643a.JPG', 'Married', 'India', 'Admin', 'Admin', 'Abdulrazzaq Tufail', 'Full Time', '2023-05-01', 'RAKEZ', '0', 'High School', '0', '', 'Inactive', 'user', '2024-01-26 08:40:30'),
(48, 'Justine', 'Smith', 'Female', '971547112827', 'justine@the1proprties.com', 'U2FsdGVkX1/b3KBeIKyo2RWR7G54Im3tgZ89IP9rz0Y=', '784-1976-7142140-8', 'RAK', '', '1976-06-14', '/files/Screenshot 2024-01-26 124500.png', 'Single', 'UK', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-05-29', 'RAKEZ', '0', 'Bachelors of art', '3 Months', '', 'Inactive', 'user', '2024-01-26 08:45:39'),
(49, 'Shibel Ali', 'Hasan', 'Male', '971527941958', 'shibel@the1proprties.com', 'U2FsdGVkX199O19f3EyIekjccK4jtfsXzaDyE2g7n00=', '784-1973-4274793-4', 'RAK', '', '1973-11-09', '/files/Screenshot 2024-01-26 125041.png', 'Single', 'United States of America', 'Property Consultant', 'Sales', 'Mostafa Haziim', 'Full Time', '2023-08-01', 'RAKEZ', '0', 'High School', '2 Months', '', 'Inactive', 'user', '2024-01-26 08:51:10'),
(50, 'Enas Abdelrahman', 'Mohamed Hasouba', 'Female', '507975990', 'enas@the1proprties.com', 'U2FsdGVkX1+4UI1aj9W/0VKPfpPrVtEyBSOfnqkeFQ4=', '784-1980-7627598-5', 'RAK', '', '1980-08-20', '/files/Screenshot 2024-01-26 125520.png', 'Single', 'Egypt', 'Property Consultant', 'Sales', 'Karen', 'Full Time', '2023-07-03', 'RAKEZ', '0', 'High School', '0', '', 'Inactive', 'user', '2024-01-26 08:56:28'),
(51, 'Karen Lorraine', 'Starr', 'Female', '508033778', 'karen@the1proprties.com', 'U2FsdGVkX18mkp09pwECsZbtpnz2anzEQJWgfw08on4=', '784-1968-1598587-2', 'RAK', '', '1970-07-10', '/files/Screenshot 2024-01-26 135735.png', 'Married', 'CANADA', 'Property Consultant', 'Sales', 'Mostafa Haziim', 'Full Time', '2022-08-01', 'RAKEZ', '0', 'High School', '1 year 3 months', '', 'Inactive', 'user', '2024-01-26 09:59:07'),
(52, 'Lubomir', 'Michnik', 'Male', '971509229162', 'lubomir@the1proprties.com', 'U2FsdGVkX1+auUlSQ/V7TSbN1VZLeyH5gwb0LYt3/mo=', '784-1976-3591215-3', 'RAK', '', '1976-02-05', '/files/Screenshot 2024-01-26 115605.png', 'Married', 'Slovakia', 'Property Consultant', 'Sales', 'Mostafa Haziim', 'Full Time', '2023-01-17', 'RAKEZ', '8 Months', 'High School', '2 Months', '', 'Inactive', 'user', '2024-01-26 10:03:55'),
(53, 'Reem Gaber Ahmed', 'Hassan', 'Female', '544332467', 'reem@the1proprties.com', 'U2FsdGVkX18rsM7L+lpiazOjSyHctNbLbBMAk6gj4Gk=', '784-1978-635692-2', 'RAK', '', '1978-01-14', '/files/Screenshot 2024-01-26 140803.png', 'Single', 'Egypy', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-09-13', 'RAKEZ', '0', 'High School', '2 Months', '', 'Inactive', 'user', '2024-01-26 10:10:05'),
(54, 'Syed Adel Pasha Syed', 'Kamaal Pasha', 'Male', '0561788720', 'adelpasha97@gmail.com', 'U2FsdGVkX1/FUtNAvIeVkdyr19I61KVZcKlpyyD3NYM=', '784-1997-9586940-5', 'RAK', '', '1997-06-09', '/files/Screenshot 2024-01-26 141356.png', 'Single', 'India', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-10-18', 'RAKEZ', '0', 'High School', '-', '', 'Inactive', 'user', '2024-01-26 10:14:24'),
(55, 'Amir Khan Said', 'Habib', 'Male', '0506905051', 'amir@the1properties.com', 'U2FsdGVkX1+G0FNZc+Yzrk+YEb1vDzjmmYsVLoV+28Y=', '784-1989-5703647-2', 'RAK', '', '1989-02-05', '/files/Screenshot 2024-01-26 141722.png', 'Married', 'Pakistan', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-11-07', 'RAKEZ', '-', 'High School', '1 Month', '', 'Inactive', 'user', '2024-01-26 10:17:50'),
(56, 'Anna', 'Selifonova', 'Female', '528306919', 'anna@the1properties.com', 'U2FsdGVkX1/HJfEOHEV/ddJv1SzHU6n/3SQM5Jwo7x0=', '784-1987-5596853-8', 'RAK', '', '1987-09-08', '/files/Screenshot 2024-01-26 165953.png', 'Single', 'Russian', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2023-07-15', 'RAKEZ', '-', 'High School', '0', '', 'Active', 'user', '2024-01-26 13:00:15'),
(57, 'Roshdi Ghassan', 'Rahed Almufleh', 'Male', '0568838860', 'roshdi@the1properties.com', 'U2FsdGVkX1+Ulv34cMbg2we92OP5jENNzvvbJGCBcd0=', '784-2001-8637326-0', 'RAK', '', '2001-11-21', '/files/Screenshot 2024-01-26 170447.png', 'Single', 'Jordan', 'Property Consultant', 'Sales', 'Abdulrazzaq Tufail', 'Full Time', '2024-01-26', 'RAKEZ', '-', 'Bachelors of Business in human resources', '8 Months', '', 'Active', 'user', '2024-01-26 13:05:25');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `ticketId` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `requestType` text NOT NULL,
  `status` enum('Open','In Progress','Resolved') NOT NULL DEFAULT 'Open',
  `createdBy` int(11) NOT NULL,
  `assignedTo` int(11) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `displayName` text NOT NULL,
  `imageUrl` text DEFAULT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `roleId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  `otp` varchar(45) DEFAULT NULL,
  `otpExpireAt` datetime DEFAULT NULL,
  `lastLoginAt` datetime DEFAULT NULL,
  `lastPassword` text DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `roleId` int(11) NOT NULL,
  `role` text NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permissions`)),
  `description` text DEFAULT NULL,
  `createAt` datetime DEFAULT current_timestamp(),
  `modifiedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`roleId`, `role`, `permissions`, `description`, `createAt`, `modifiedAt`) VALUES
(1, 'Employee', '', '', '2024-02-14 00:00:00', '2024-02-14 00:00:00'),
(2, 'Admin', '', '', '2024-02-14 00:00:00', '2024-02-14 00:00:00'),
(3, 'CEO', '', '', '2024-02-14 00:00:00', '2024-02-14 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`announcementId`),
  ADD KEY `office_id_ann_idx` (`officeId`);

--
-- Indexes for table `common_folder_files`
--
ALTER TABLE `common_folder_files`
  ADD PRIMARY KEY (`fileId`),
  ADD KEY `office_id_file_idx` (`officeId`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`companyId`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`) USING HASH,
  ADD UNIQUE KEY `name_UNIQUE` (`name`) USING HASH;

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`departmentId`),
  ADD KEY `office_id_idx` (`officeId`);

--
-- Indexes for table `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeId`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`) USING HASH,
  ADD UNIQUE KEY `mobile_UNIQUE` (`mobile`) USING HASH,
  ADD KEY `line_manager_id_idx` (`lineManagerId`),
  ADD KEY `office_id_emp_idx` (`officeId`),
  ADD KEY `dep_id_idx` (`departmentId`);

--
-- Indexes for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD PRIMARY KEY (`attendanceId`),
  ADD KEY `emp_id_idx` (`employeeId`);

--
-- Indexes for table `employee_bank_info`
--
ALTER TABLE `employee_bank_info`
  ADD PRIMARY KEY (`bankId`),
  ADD UNIQUE KEY `accountNumber_UNIQUE` (`accountNumber`) USING HASH,
  ADD UNIQUE KEY `iban_UNIQUE` (`iban`) USING HASH,
  ADD KEY `employee_id_bank_idx` (`employeeId`);

--
-- Indexes for table `employee_benifits`
--
ALTER TABLE `employee_benifits`
  ADD PRIMARY KEY (`benifitId`);

--
-- Indexes for table `employee_documents`
--
ALTER TABLE `employee_documents`
  ADD PRIMARY KEY (`documentId`),
  ADD KEY `employee_id_doc_idx` (`employeeId`);

--
-- Indexes for table `employee_emergency_contacts`
--
ALTER TABLE `employee_emergency_contacts`
  ADD PRIMARY KEY (`contactId`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`) USING HASH,
  ADD KEY `employee_id_idx` (`employeeId`);

--
-- Indexes for table `employee_job_info`
--
ALTER TABLE `employee_job_info`
  ADD PRIMARY KEY (`jobInfoId`),
  ADD KEY `employee_id_idx` (`employeeId`),
  ADD KEY `job_title_id_idx` (`jobTitleId`),
  ADD KEY `department_id_idx` (`departmentId`),
  ADD KEY `office_id_idx` (`officeId`),
  ADD KEY `line_manager_id_idx` (`lineManagerId`);

--
-- Indexes for table `employee_leave_requests`
--
ALTER TABLE `employee_leave_requests`
  ADD PRIMARY KEY (`leaveId`),
  ADD KEY `emp_id_leave_idx` (`employeeId`);

--
-- Indexes for table `employee_offboard_info`
--
ALTER TABLE `employee_offboard_info`
  ADD PRIMARY KEY (`offboardId`),
  ADD KEY `employee_id_offboard_idx` (`employeeId`);

--
-- Indexes for table `employee_payroll_info`
--
ALTER TABLE `employee_payroll_info`
  ADD PRIMARY KEY (`ipayrollId`),
  ADD KEY `employee_id_payroll_idx` (`employeeId`),
  ADD KEY `job_info_id_idx` (`jobInfoId`),
  ADD KEY `salary_id_idx` (`salaryId`);

--
-- Indexes for table `employee_probation_info`
--
ALTER TABLE `employee_probation_info`
  ADD PRIMARY KEY (`probationId`),
  ADD KEY `employee_id_idx` (`employeeId`);

--
-- Indexes for table `employee_salary_info`
--
ALTER TABLE `employee_salary_info`
  ADD PRIMARY KEY (`salaryId`),
  ADD KEY `employee_id_salary_idx` (`employeeId`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`eventId`),
  ADD KEY `office_id_ev_idx` (`officeId`);

--
-- Indexes for table `job_titles`
--
ALTER TABLE `job_titles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`officeId`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`) USING HASH,
  ADD KEY `company_id_idx` (`companyId`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`ticketId`),
  ADD KEY `create_by_idx` (`createdBy`),
  ADD KEY `assigned_to_idx` (`assignedTo`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`) USING HASH,
  ADD KEY `role_id_user_idx` (`roleId`),
  ADD KEY `company_id_user_idx` (`companyId`),
  ADD KEY `emp_id_user_idx` (`employeeId`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `announcementId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `common_folder_files`
--
ALTER TABLE `common_folder_files`
  MODIFY `fileId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `companyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `departmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `docs`
--
ALTER TABLE `docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employeeId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `attendanceId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_bank_info`
--
ALTER TABLE `employee_bank_info`
  MODIFY `bankId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_benifits`
--
ALTER TABLE `employee_benifits`
  MODIFY `benifitId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_documents`
--
ALTER TABLE `employee_documents`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_emergency_contacts`
--
ALTER TABLE `employee_emergency_contacts`
  MODIFY `contactId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_job_info`
--
ALTER TABLE `employee_job_info`
  MODIFY `jobInfoId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_leave_requests`
--
ALTER TABLE `employee_leave_requests`
  MODIFY `leaveId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_offboard_info`
--
ALTER TABLE `employee_offboard_info`
  MODIFY `offboardId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_payroll_info`
--
ALTER TABLE `employee_payroll_info`
  MODIFY `ipayrollId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_salary_info`
--
ALTER TABLE `employee_salary_info`
  MODIFY `salaryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_titles`
--
ALTER TABLE `job_titles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `officeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `ticketId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `office_id_ann` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `common_folder_files`
--
ALTER TABLE `common_folder_files`
  ADD CONSTRAINT `office_id_file` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `office_id` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `dep_id` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `line_manager_id` FOREIGN KEY (`lineManagerId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `office_id_emp` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD CONSTRAINT `emp_id` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_bank_info`
--
ALTER TABLE `employee_bank_info`
  ADD CONSTRAINT `employee_id_bank` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_documents`
--
ALTER TABLE `employee_documents`
  ADD CONSTRAINT `employee_id_doc` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_emergency_contacts`
--
ALTER TABLE `employee_emergency_contacts`
  ADD CONSTRAINT `employee_id` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_job_info`
--
ALTER TABLE `employee_job_info`
  ADD CONSTRAINT `department_id_idx` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`departmentId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `employee_id_idx` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `job_title_id` FOREIGN KEY (`jobTitleId`) REFERENCES `job_titles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `line_manager_id_idx` FOREIGN KEY (`lineManagerId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `office_id_idx` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_leave_requests`
--
ALTER TABLE `employee_leave_requests`
  ADD CONSTRAINT `emp_id_leave` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_offboard_info`
--
ALTER TABLE `employee_offboard_info`
  ADD CONSTRAINT `employee_id_offboard` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_payroll_info`
--
ALTER TABLE `employee_payroll_info`
  ADD CONSTRAINT `employee_id_payroll` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `job_info_id` FOREIGN KEY (`jobInfoId`) REFERENCES `employee_job_info` (`jobInfoId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `salary_id` FOREIGN KEY (`salaryId`) REFERENCES `employee_salary_info` (`salaryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_probation_info`
--
ALTER TABLE `employee_probation_info`
  ADD CONSTRAINT `employee_id_prob` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `employee_salary_info`
--
ALTER TABLE `employee_salary_info`
  ADD CONSTRAINT `employee_id_salary` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `office_id_ev` FOREIGN KEY (`officeId`) REFERENCES `offices` (`officeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `offices`
--
ALTER TABLE `offices`
  ADD CONSTRAINT `company_id` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `assigned_to` FOREIGN KEY (`assignedTo`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `create_by` FOREIGN KEY (`createdBy`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `company_id_user` FOREIGN KEY (`companyId`) REFERENCES `companies` (`companyId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `emp_id_user` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`employeeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `role_id_user` FOREIGN KEY (`roleId`) REFERENCES `user_roles` (`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
