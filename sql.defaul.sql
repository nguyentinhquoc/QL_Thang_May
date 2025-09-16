

INSERT INTO `department` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Kinh Doanh', 'Kinh Doanh', '2024-12-31 10:32:15.641468', '2025-01-13 20:10:11.287673', NULL),
(2, 'Kỹ Thuật', 'Kỹ Thuật ', '2024-12-31 10:31:51.212185', '2025-01-07 08:18:32.000000', NULL),
(3, 'Hành Chính', 'Hành Chính', '2024-12-31 10:32:05.493161', '2024-12-31 10:32:05.493161', NULL),
(19, 'Giám sát', 'mô tả công việc của phòng giám sát', '2025-02-21 15:18:54.935686', '2025-02-21 15:19:08.000000', NULL),
(20, 'Kế toán', 'mô tả công việc của phòng kế toán', '2025-02-21 15:20:07.955353', '2025-02-21 15:20:07.955353', NULL),
(21, 'Chăm sóc khách hàng', 'chăm soc\r\n\r\n', '2025-02-21 16:37:41.083970', '2025-02-21 16:37:41.083970', NULL),
(23, 'Phòng ban ', '', '2025-06-25 13:54:20.828638', '2025-06-25 13:56:36.000000', NULL);



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

INSERT INTO `position` (`id`, `name`, `description`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Trưởng phòng 12', 'Giám Đốc', '2024-12-31 10:09:24.000000', '2025-06-25 13:56:44.000000', NULL),
(2, 'Nhân viên', 'Nhân viên', '2024-12-31 10:33:19.360438', '2025-02-21 11:55:13.715249', NULL),
(14, 'add ', '', '2025-06-25 13:56:49.407382', '2025-06-25 13:56:49.407382', NULL);

INSERT INTO `staff` (`id`, `full_name`, `number_phone`, `email`, `address`, `avatar`, `description`, `status`, `password`, `role_admin`, `createdAt`, `updatedAt`, `deletedAt`, `departmentId`, `positionId`) VALUES
(3, 'Đỗ Quang Trung', '0862201006', 'admin@gmail.com', 'Hải dương', 'admin.jpg', 'Thái', 1, '$2b$10$7QUzk5EJVmQFU5vX3iCtI.BPQqPuTFUSLY8qWgL.bsyYIg41bMiQS', 1, '2024-12-31 10:09:43.000000', '2025-02-21 16:43:01.000000', NULL, 1, 1),
(23, 'Nguyễn Quốc Tình ', '0862201004', 'nguyentinh140321@gmail.com', 'Yên Mô Ninh Bình', 'file-1750832792483.jpg', '', 1, '$2b$10$An0NVrBzgKpULnlItzvzoudHXLYhHyPJ/FC9JpC6133ofe4e.1IMq', 0, '2025-06-25 13:26:32.557571', '2025-06-28 23:47:46.000000', NULL, 1, 2);


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
