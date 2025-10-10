-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Sep 30, 2025 at 02:44 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quan_ly_thang_may`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `number_phone` varchar(15) NOT NULL,
  `address` text,
  `description` varchar(225) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `status` datetime DEFAULT NULL,
  `staffId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `email`, `createdAt`, `updatedAt`, `deletedAt`, `number_phone`, `address`, `description`, `full_name`, `status`, `staffId`) VALUES
(1, '', '2025-06-27 18:05:18.719663', '2025-06-27 18:06:36.000000', NULL, '0862201004', 'Tỉnh Thái Nguyên, Huyện Định Hóa,Xã Điềm Mặc, ', '', 'Nguyễn Quốc Tình ', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Kinh Doanh', 'Kinh Doanh', '2024-12-31 10:32:15.641468', '2025-01-13 20:10:11.287673', NULL),
(2, 'Kỹ Thuật', 'Kỹ Thuật ', '2024-12-31 10:31:51.212185', '2025-01-07 08:18:32.000000', NULL),
(3, 'Hành Chính', 'Hành Chính', '2024-12-31 10:32:05.493161', '2024-12-31 10:32:05.493161', NULL),
(19, 'Giám sát', 'mô tả công việc của phòng giám sát', '2025-02-21 15:18:54.935686', '2025-02-21 15:19:08.000000', NULL),
(20, 'Kế toán', 'mô tả công việc của phòng kế toán', '2025-02-21 15:20:07.955353', '2025-02-21 15:20:07.955353', NULL),
(21, 'Chăm sóc khách hàng', 'chăm soc\r\n\r\n', '2025-02-21 16:37:41.083970', '2025-02-21 16:37:41.083970', NULL),
(23, 'Phòng ban ', '', '2025-06-25 13:54:20.828638', '2025-06-25 13:56:36.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `departments_step`
--

CREATE TABLE `departments_step` (
  `id` int NOT NULL,
  `departmentId` int DEFAULT NULL,
  `stepId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_maintenance`
--

CREATE TABLE `history_maintenance` (
  `id` int NOT NULL,
  `timeStart` date NOT NULL,
  `timeEnd` date NOT NULL,
  `projectId` int DEFAULT NULL,
  `countMaintenance` int NOT NULL,
  `free` tinyint NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `history_maintenance`
--

INSERT INTO `history_maintenance` (`id`, `timeStart`, `timeEnd`, `projectId`, `countMaintenance`, `free`, `price`) VALUES
(32, '2025-06-17', '2025-07-11', 124, 2, 0, 1222222),
(33, '2025-06-22', '2025-07-02', 124, 2, 0, 0),
(34, '2025-07-03', '2026-03-02', 124, 12, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `id` int NOT NULL,
  `time` date NOT NULL,
  `reason` varchar(255) NOT NULL,
  `projectName` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `fee` tinyint NOT NULL DEFAULT '1',
  `historyMaintenanceId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`id`, `time`, `reason`, `projectName`, `createdAt`, `updatedAt`, `deletedAt`, `projectId`, `fee`, `historyMaintenanceId`) VALUES
(188, '2025-06-18', 'Bảo trì định kì', NULL, '2025-06-30 18:13:26.630886', '2025-06-30 18:15:09.508726', NULL, 124, 1, 32),
(189, '2025-06-18', 'Bảo trì định kì', NULL, '2025-06-30 18:13:40.531628', '2025-06-30 18:15:11.667774', NULL, 124, 1, 32);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_action`
--

CREATE TABLE `maintenance_action` (
  `id` int NOT NULL,
  `status` datetime DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `image` json DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `staffId` int DEFAULT NULL,
  `maintenanceId` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `feedback` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isRead` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `staffId` int NOT NULL,
  `projectId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permision`
--

CREATE TABLE `permision` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `codeParent` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permision`
--

INSERT INTO `permision` (`id`, `name`, `code`, `description`, `codeParent`) VALUES
(1, 'Xem trang tổng quan', '1', 'Cho phép truy cập và xem trang tổng quan thống kê. (Đề xuất: Admin, Trưởng phòng kinh doanh)', ''),
(2, 'Xem danh sách phòng ban', '2', 'Cho phép quản lý phòng ban và chức vụ.(Đề xuất: Admin)', ''),
(3, 'Quản lý nhân viên và bảng công', '3', 'Cho phép quản lý nhân viên và bảng công. (Đề xuất: Admin, Trưởng phòng)', ''),
(4, 'Quản lý quy trình làm việc', '4', 'Cho phép quản lý các quy trình làm việc. (Đề xuất: Admin)', ''),
(5, 'Quản lý nhân viên kinh doanh', '5', 'Cho phép quản nhân viên kinh doanh.(Đề xuất: Admin, Trưởng phòng kinh doanh)', ''),
(6, 'Quản lí danh sách dự án dự kiến', '6', 'Cho phép quản lý danh sách dự án dự kiến.(Đề xuất: Admin, Trưởng phòng kinh doanh)', ''),
(7, 'Quản lý công trình', '7', 'Cho phép quản lý công trình. (Đề xuất: Admin, Nhân viên kinh doanh)', ''),
(8, 'Quản lý bảo trì, bảo hành', '8', 'Cho phép quản lý phần bảo trì và bảo hành. (Đề xuất: Admin, Nhân viên kinh doanh)', ''),
(9, 'Danh sách công trình phụ trách', '9', 'Hiển thị danh sách các công trình mà nhân viên kinh doanh đang phụ trách (Đề xuất: Nhân viên kinh doanh)', '');

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Trưởng phòng 12', 'Giám Đốc', '2024-12-31 10:09:24.000000', '2025-06-25 13:56:44.000000', NULL),
(2, 'Nhân viên', 'Nhân viên', '2024-12-31 10:33:19.360438', '2025-02-21 11:55:13.715249', NULL),
(14, 'add ', '', '2025-06-25 13:56:49.407382', '2025-06-25 13:56:49.407382', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `number_phone` varchar(15) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text,
  `infor_product` json DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `price` bigint NOT NULL DEFAULT '0',
  `code_project` varchar(225) NOT NULL,
  `tax` varchar(255) NOT NULL,
  `type` enum('BAOTRI','LAPDAT') NOT NULL DEFAULT 'LAPDAT',
  `warrantyStart` date DEFAULT NULL,
  `warrantyEnd` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `full_name`, `number_phone`, `email`, `address`, `infor_product`, `description`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `price`, `code_project`, `tax`, `type`, `warrantyStart`, `warrantyEnd`) VALUES
(122, 'Nguyễn Quốc Tình ', '0862201004', NULL, 'Tỉnh Quảng Ninh, Huyện Cô Tô,Xã Đồng Tiến, Số nhà 11', '\"{}\"', NULL, 0, '2024-06-01 00:00:02.941405', '2025-06-30 18:59:19.686116', NULL, 19, '123', 'Không', 'LAPDAT', NULL, NULL),
(123, 'Nguyễn Quốc Tình ', '0862201009', NULL, 'Tỉnh Thái Nguyên, Thành phố Phổ Yên,Phường Tân Phú, số 123', '\"{}\"', NULL, 1, '2024-06-01 00:00:02.941405', '2025-06-30 19:03:44.000000', NULL, 19, '32131', 'Có', 'LAPDAT', '2025-06-16', '2025-11-29'),
(124, 'công tình bảo trì 213', '0876554444', NULL, 'Tỉnh Quảng Ninh, Huyện Cô Tô,Thị trấn Cô Tô, số nhà 123', '\"{}\"', NULL, 0, '2024-06-01 00:00:02.941405', '2025-06-30 18:59:34.101063', NULL, 18600, '2123', 'Không', 'BAOTRI', '2024-06-11', '2025-08-21'),
(125, 'Nguyễn Quốc Tình', '0862201004', NULL, 'Tỉnh Quảng Ninh, Huyện Cô Tô,Thị trấn Cô Tô, Yên mô ninh bình', '\"{}\"', NULL, 0, '2024-06-01 00:00:02.941405', '2025-06-30 18:59:12.692726', NULL, 18600, '1223', 'Có', 'BAOTRI', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_edit`
--

CREATE TABLE `project_edit` (
  `id` int NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `number_phone` varchar(15) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text,
  `infor_product` json DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `staffId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `price` bigint NOT NULL DEFAULT '0',
  `code_project` varchar(225) NOT NULL,
  `tax` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_staff`
--

CREATE TABLE `project_staff` (
  `id` int NOT NULL,
  `projectId` int DEFAULT NULL,
  `staffId` int DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_steps`
--

CREATE TABLE `project_steps` (
  `id` int NOT NULL,
  `weight` int DEFAULT NULL,
  `status` datetime DEFAULT NULL,
  `image` json DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` timestamp(6) NULL DEFAULT NULL,
  `workflowStepId` int DEFAULT NULL,
  `projectId` int DEFAULT NULL,
  `staffId` int DEFAULT NULL,
  `feedback` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project_steps`
--

INSERT INTO `project_steps` (`id`, `weight`, `status`, `image`, `createdAt`, `updatedAt`, `deletedAt`, `workflowStepId`, `projectId`, `staffId`, `feedback`) VALUES
(242, NULL, NULL, NULL, '2025-06-27 12:43:33.295254', '2025-06-27 12:43:33.295254', NULL, 105, 122, NULL, NULL),
(244, NULL, NULL, NULL, '2025-06-27 12:47:15.462968', '2025-06-27 12:47:15.462968', NULL, 107, 123, NULL, NULL),
(245, NULL, NULL, NULL, '2025-06-27 12:47:15.469214', '2025-06-27 12:47:15.469214', NULL, 108, 123, NULL, NULL),
(246, NULL, NULL, NULL, '2025-06-27 12:47:15.474929', '2025-06-27 12:47:15.474929', NULL, 109, 123, NULL, NULL),
(247, NULL, NULL, NULL, '2025-06-27 12:58:25.629931', '2025-06-27 12:58:36.000000', NULL, 106, 123, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `number_phone` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text,
  `avatar` varchar(255) NOT NULL,
  `description` text,
  `status` tinyint NOT NULL DEFAULT '1',
  `password` varchar(255) NOT NULL,
  `role_admin` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `positionId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `full_name`, `number_phone`, `email`, `address`, `avatar`, `description`, `status`, `password`, `role_admin`, `createdAt`, `updatedAt`, `deletedAt`, `departmentId`, `positionId`) VALUES
(3, 'Đỗ Quang Trung', '0862201006', 'admin@gmail.com', 'Hải dương', 'admin.jpg', 'Thái', 1, '$2b$10$7QUzk5EJVmQFU5vX3iCtI.BPQqPuTFUSLY8qWgL.bsyYIg41bMiQS', 1, '2024-12-31 10:09:43.000000', '2025-02-21 16:43:01.000000', NULL, 1, 1),
(23, 'Nguyễn Quốc Tình ', '0862201004', 'nguyentinh140321@gmail.com', 'Yên Mô Ninh Bình', 'file-1750832792483.jpg', '', 1, '$2b$10$An0NVrBzgKpULnlItzvzoudHXLYhHyPJ/FC9JpC6133ofe4e.1IMq', 0, '2025-06-25 13:26:32.557571', '2025-06-28 23:47:46.000000', NULL, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `staff_permisions_permision`
--

CREATE TABLE `staff_permisions_permision` (
  `staffId` int NOT NULL,
  `permisionId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `staff_permisions_permision`
--

INSERT INTO `staff_permisions_permision` (`staffId`, `permisionId`) VALUES
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(23, 3),
(23, 9);

-- --------------------------------------------------------

--
-- Table structure for table `step`
--

CREATE TABLE `step` (
  `id` int NOT NULL,
  `name` varchar(225) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `step`
--

INSERT INTO `step` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(31, 'Bước 4', 'Mô tả bước 4', '2025-06-27 12:53:15.776986', '2025-06-27 12:53:15.776986', NULL),
(64, 'Bước 2', 'Mô tả bước 2', '2025-06-27 12:52:07.240862', '2025-06-27 12:52:07.240862', NULL),
(66, 'Bước 3 ', 'Mô tả bước 3', '2025-06-27 12:52:16.921374', '2025-06-27 12:52:16.921374', NULL),
(68, 'Bước 1 21', 'mô tả bước 1 3412', '2025-06-27 12:51:05.172131', '2025-06-27 12:54:53.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `target_busine`
--

CREATE TABLE `target_busine` (
  `id` int NOT NULL,
  `year` int NOT NULL,
  `target` int NOT NULL,
  `staffId` int DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workflow`
--

CREATE TABLE `workflow` (
  `id` int NOT NULL,
  `name` varchar(225) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `workflow`
--

INSERT INTO `workflow` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(19, 'Quy trình làm việc', 'mô tả quy trình làm việc 1\r\n', '2025-06-27 12:50:53.308394', '2025-06-27 12:50:53.308394', NULL),
(20, 'Quy trình làm việc 2 21', 'mô tả quy trình 2', '2025-06-27 12:52:59.528780', '2025-06-27 12:53:46.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workflow_steps`
--

CREATE TABLE `workflow_steps` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `stepId` int DEFAULT NULL,
  `workflowId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `workflow_steps`
--

INSERT INTO `workflow_steps` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `stepId`, `workflowId`) VALUES
(102, '2025-06-27 14:39:06.384474', '2025-06-27 14:39:06.384474', NULL, 64, 20),
(103, '2025-06-27 14:39:06.391738', '2025-06-27 14:39:06.391738', NULL, 31, 20),
(104, '2025-06-27 14:39:06.398061', '2025-06-27 14:39:06.398061', NULL, 68, 20),
(105, '2025-06-27 14:39:06.407569', '2025-06-27 14:39:06.407569', NULL, 66, 20),
(106, '2025-06-27 14:39:18.319685', '2025-06-27 14:39:18.319685', NULL, 31, 19),
(107, '2025-06-27 14:39:18.330995', '2025-06-27 14:39:18.330995', NULL, 66, 19),
(108, '2025-06-27 14:39:18.336099', '2025-06-27 14:39:18.336099', NULL, 64, 19),
(109, '2025-06-27 14:39:18.340391', '2025-06-27 14:39:18.340391', NULL, 68, 19);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cb2ceded1b4dfbe28971da113d9` (`staffId`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_471da4b90e96c1ebe0af221e07` (`name`);

--
-- Indexes for table `departments_step`
--
ALTER TABLE `departments_step`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f02429e45fd79cf84365dffb3cd` (`departmentId`),
  ADD KEY `FK_4ce14685549bf1b8779f89d17ea` (`stepId`);

--
-- Indexes for table `history_maintenance`
--
ALTER TABLE `history_maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_713fae251978e8d44ade7286a30` (`projectId`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_36fd45c85d8b8cdd892f8016f3a` (`projectId`),
  ADD KEY `FK_1b29faad5e347b91486058fa5a4` (`historyMaintenanceId`);

--
-- Indexes for table `maintenance_action`
--
ALTER TABLE `maintenance_action`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_378034640063d25466cadad3785` (`staffId`),
  ADD KEY `FK_2b0fd318b21404b6569bdaf2af4` (`maintenanceId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_431561c3b765dc6470a83065f3b` (`staffId`),
  ADD KEY `FK_28a43a0b8c114e48b5bb002dc22` (`projectId`);

--
-- Indexes for table `permision`
--
ALTER TABLE `permision`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_42324a29b1680596ad5da7762a` (`name`),
  ADD UNIQUE KEY `IDX_de789de7e2709ff2fe6ccfb63f` (`code`),
  ADD UNIQUE KEY `IDX_ca3ad09a0296692b3aebbfc001` (`description`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_94b556b24267b2d75d6d05fcd1` (`name`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_edit`
--
ALTER TABLE `project_edit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f637d22253ec8bf0da9383375c3` (`staffId`),
  ADD KEY `FK_7d1c36128cc11b6fcb9339fc800` (`projectId`);

--
-- Indexes for table `project_staff`
--
ALTER TABLE `project_staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b58f9306295fb4023fd6f0220bd` (`projectId`),
  ADD KEY `FK_b9bf22f951531ca046cd9e0350e` (`staffId`);

--
-- Indexes for table `project_steps`
--
ALTER TABLE `project_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_20cfc514807b152fa21c2ab4385` (`workflowStepId`),
  ADD KEY `FK_71a6f2786d5ab73f33a9c6743f2` (`projectId`),
  ADD KEY `FK_8e6ec5f7c40afcfbf6a78d06426` (`staffId`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_dc4d943e2778d8e33e82809e90` (`number_phone`),
  ADD UNIQUE KEY `IDX_902985a964245652d5e3a0f5f6` (`email`),
  ADD KEY `FK_67b6b543fe99f3accd85374f886` (`departmentId`),
  ADD KEY `FK_f74be2df1d854b814f3e8ad753f` (`positionId`);

--
-- Indexes for table `staff_permisions_permision`
--
ALTER TABLE `staff_permisions_permision`
  ADD PRIMARY KEY (`staffId`,`permisionId`),
  ADD KEY `IDX_d565673cefe9d57547d2c7983b` (`staffId`),
  ADD KEY `IDX_a614109f2fdf210f40b099def1` (`permisionId`);

--
-- Indexes for table `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_563407b4665d9df4efe7a1124d` (`name`);

--
-- Indexes for table `target_busine`
--
ALTER TABLE `target_busine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e385535ebafe4069f9e3de64664` (`staffId`);

--
-- Indexes for table `workflow`
--
ALTER TABLE `workflow`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_8ec5afd3566bb368910c59f441` (`name`);

--
-- Indexes for table `workflow_steps`
--
ALTER TABLE `workflow_steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4a89968c2911f931db8509b61b1` (`stepId`),
  ADD KEY `FK_eb0c057661503827a7cd6d8ea41` (`workflowId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `departments_step`
--
ALTER TABLE `departments_step`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `history_maintenance`
--
ALTER TABLE `history_maintenance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT for table `maintenance_action`
--
ALTER TABLE `maintenance_action`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `permision`
--
ALTER TABLE `permision`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `project_edit`
--
ALTER TABLE `project_edit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `project_staff`
--
ALTER TABLE `project_staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `project_steps`
--
ALTER TABLE `project_steps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `step`
--
ALTER TABLE `step`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `target_busine`
--
ALTER TABLE `target_busine`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `workflow`
--
ALTER TABLE `workflow`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `workflow_steps`
--
ALTER TABLE `workflow_steps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FK_cb2ceded1b4dfbe28971da113d9` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`);

--
-- Constraints for table `departments_step`
--
ALTER TABLE `departments_step`
  ADD CONSTRAINT `FK_4ce14685549bf1b8779f89d17ea` FOREIGN KEY (`stepId`) REFERENCES `step` (`id`),
  ADD CONSTRAINT `FK_f02429e45fd79cf84365dffb3cd` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`);

--
-- Constraints for table `history_maintenance`
--
ALTER TABLE `history_maintenance`
  ADD CONSTRAINT `FK_713fae251978e8d44ade7286a30` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`);

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `FK_1b29faad5e347b91486058fa5a4` FOREIGN KEY (`historyMaintenanceId`) REFERENCES `history_maintenance` (`id`),
  ADD CONSTRAINT `FK_36fd45c85d8b8cdd892f8016f3a` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`);

--
-- Constraints for table `maintenance_action`
--
ALTER TABLE `maintenance_action`
  ADD CONSTRAINT `FK_2b0fd318b21404b6569bdaf2af4` FOREIGN KEY (`maintenanceId`) REFERENCES `maintenance` (`id`),
  ADD CONSTRAINT `FK_378034640063d25466cadad3785` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `FK_28a43a0b8c114e48b5bb002dc22` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FK_431561c3b765dc6470a83065f3b` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`);

--
-- Constraints for table `project_edit`
--
ALTER TABLE `project_edit`
  ADD CONSTRAINT `FK_7d1c36128cc11b6fcb9339fc800` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_f637d22253ec8bf0da9383375c3` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_staff`
--
ALTER TABLE `project_staff`
  ADD CONSTRAINT `FK_b58f9306295fb4023fd6f0220bd` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FK_b9bf22f951531ca046cd9e0350e` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`);

--
-- Constraints for table `project_steps`
--
ALTER TABLE `project_steps`
  ADD CONSTRAINT `FK_20cfc514807b152fa21c2ab4385` FOREIGN KEY (`workflowStepId`) REFERENCES `workflow_steps` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_71a6f2786d5ab73f33a9c6743f2` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_8e6ec5f7c40afcfbf6a78d06426` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `FK_67b6b543fe99f3accd85374f886` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `FK_f74be2df1d854b814f3e8ad753f` FOREIGN KEY (`positionId`) REFERENCES `position` (`id`);

--
-- Constraints for table `staff_permisions_permision`
--
ALTER TABLE `staff_permisions_permision`
  ADD CONSTRAINT `FK_a614109f2fdf210f40b099def1b` FOREIGN KEY (`permisionId`) REFERENCES `permision` (`id`),
  ADD CONSTRAINT `FK_d565673cefe9d57547d2c7983b8` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `target_busine`
--
ALTER TABLE `target_busine`
  ADD CONSTRAINT `FK_e385535ebafe4069f9e3de64664` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`);

--
-- Constraints for table `workflow_steps`
--
ALTER TABLE `workflow_steps`
  ADD CONSTRAINT `FK_4a89968c2911f931db8509b61b1` FOREIGN KEY (`stepId`) REFERENCES `step` (`id`),
  ADD CONSTRAINT `FK_eb0c057661503827a7cd6d8ea41` FOREIGN KEY (`workflowId`) REFERENCES `workflow` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
