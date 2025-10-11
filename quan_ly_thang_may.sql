
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



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



CREATE TABLE `department` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `departments_step` (
  `id` int NOT NULL,
  `departmentId` int DEFAULT NULL,
  `stepId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
--------------------------------------------

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
