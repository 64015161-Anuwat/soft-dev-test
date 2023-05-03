-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2023 at 05:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `salon_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`) VALUES
(1, 'Eyelash extensions'),
(2, 'Hair salon'),
(3, 'Spa salons'),
(4, 'Nail salons'),
(5, 'Beauty salons');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `latitude` int(11) DEFAULT NULL,
  `longitude` int(11) DEFAULT NULL,
  `location_name` text DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `latitude`, `longitude`, `location_name`, `create_time`, `update_time`) VALUES
(11, NULL, NULL, 'ทะเลสาบ1', '2023-04-22 23:09:16', '2023-04-23 00:17:30'),
(12, NULL, NULL, 'สยาม', '2023-04-22 23:09:36', NULL),
(13, NULL, NULL, 'ทะเลหมาก213', '2023-04-22 23:10:13', '2023-05-01 16:09:23'),
(14, NULL, NULL, 'เขาหย่าย1111', NULL, '2023-05-01 16:11:53'),
(15, NULL, NULL, 'ทะเลหมอก1', NULL, NULL),
(16, NULL, NULL, 'asdqwe123', '2023-04-30 00:54:54', NULL),
(17, NULL, NULL, 'asdqwe123', '2023-04-30 00:56:06', NULL),
(18, NULL, NULL, 'asdqwe123', '2023-04-30 00:57:00', NULL),
(19, NULL, NULL, '213123awsdqwe123', '2023-04-30 00:57:42', NULL),
(20, NULL, NULL, '123123qweqwe213', '2023-04-30 00:59:08', NULL),
(21, NULL, NULL, '', '2023-05-01 18:10:05', NULL),
(22, NULL, NULL, '', '2023-05-01 18:12:56', NULL),
(23, NULL, NULL, '', '2023-05-01 18:13:12', NULL),
(24, NULL, NULL, '', '2023-05-01 18:17:29', NULL),
(25, NULL, NULL, 'asdqwe123', '2023-05-01 18:18:10', NULL),
(26, NULL, NULL, 'asdqwe123', '2023-05-01 18:18:39', NULL),
(27, NULL, NULL, 'qweasdzcx', '2023-05-02 17:23:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `create_by` int(11) DEFAULT NULL,
  `order_at` int(11) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `pay_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `create_by`, `order_at`, `total_price`, `status`, `order_time`, `pay_time`, `create_time`) VALUES
(3, 1, 1, 200, 'Cancel', '2023-04-23 16:41:30', NULL, '2023-04-23 16:42:50'),
(10, 1, 1, 200, 'Cancel', '2023-04-23 16:41:30', NULL, '2023-04-24 05:18:42'),
(11, 1, 1, 200, 'Cancel', '2023-04-23 16:41:30', NULL, '2023-04-24 05:20:37'),
(16, 1, 1, 313, 'Confirmed', '2023-05-01 19:21:34', '2023-05-02 21:02:47', '2023-05-02 02:21:34'),
(17, 1, 1, 2446, 'Confirmed', '2023-05-01 19:38:42', NULL, '2023-05-02 02:38:42'),
(18, 1, 1, 201, 'Cancel', '2023-05-02 03:10:04', NULL, '2023-05-02 10:10:04'),
(19, 12, 1, 201, 'Cancel', '2023-05-02 03:19:14', NULL, '2023-05-02 10:19:14'),
(20, 12, 1, 101, 'Confirmed', '2023-05-02 03:22:07', NULL, '2023-05-02 10:22:07'),
(21, 12, 1, 2021, 'Confirmed', '2023-05-02 05:02:45', '2023-05-02 12:02:51', '2023-05-02 12:02:45'),
(22, 12, 1, 201, 'Cancel', '2023-05-02 07:17:53', '2023-05-02 14:18:06', '2023-05-02 14:17:53'),
(23, 1, 1, 101, 'Confirmed', '2023-05-02 09:29:59', '2023-05-02 16:30:06', '2023-05-02 16:29:59'),
(25, 12, 1, 313, 'Cancel', '2023-05-02 10:31:00', '2023-05-02 17:31:04', '2023-05-02 17:31:00'),
(26, 12, 1, 4254, 'Confirmed', '2023-05-02 10:38:32', '2023-05-02 17:38:39', '2023-05-02 17:38:32'),
(27, 12, 1, 212, 'Cancel', '2023-05-10 13:10:00', '2023-05-02 19:34:44', '2023-05-02 19:34:39'),
(28, 12, 1, 212, 'Cancel', '2023-05-16 12:03:00', NULL, '2023-05-02 19:47:46'),
(29, 12, 1, 100, 'Cancel', '2023-05-16 12:13:00', NULL, '2023-05-02 20:22:57'),
(30, 12, 1, 100, 'Confirmed', '2023-05-10 11:11:00', '2023-05-02 20:44:19', '2023-05-02 20:44:15'),
(31, 12, 1, 100, 'Cancel', '2023-05-16 11:11:00', '2023-05-02 20:54:33', '2023-05-02 20:54:28'),
(32, 12, 1, 101, 'Confirmed', '2023-05-09 11:11:00', '2023-05-02 21:04:06', '2023-05-02 21:04:02'),
(33, 12, 1, 2021, 'Confirmed', '2023-05-24 11:11:00', '2023-05-02 21:05:41', '2023-05-02 21:05:36'),
(34, 12, 1, 100, 'Confirmed', '2023-05-23 11:11:00', '2023-05-02 21:12:33', '2023-05-02 21:12:30'),
(35, 12, 1, 2033, 'Confirmed', '2023-05-10 11:11:00', '2023-05-02 21:20:34', '2023-05-02 21:20:30'),
(36, 12, 1, 12, 'Confirmed', '2023-05-24 11:11:00', '2023-05-02 21:24:24', '2023-05-02 21:24:21');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `menu_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `order_id`, `menu_id`) VALUES
(1, 3, 1),
(2, 3, 1),
(15, 10, 1),
(16, 10, 1),
(17, 11, 1),
(18, 11, 1),
(23, 16, 1),
(24, 16, 5),
(25, 17, 1),
(26, 17, 2),
(27, 17, 3),
(28, 17, 4),
(29, 17, 5),
(30, 18, 1),
(31, 18, 2),
(32, 19, 1),
(33, 19, 2),
(34, 20, 1),
(35, 21, 4),
(36, 22, 1),
(37, 22, 2),
(38, 23, 1),
(40, 25, 1),
(41, 25, 5),
(42, 26, 5),
(43, 26, 4),
(44, 26, 4),
(45, 27, 5),
(46, 28, 5),
(47, 29, 2),
(48, 30, 2),
(49, 31, 2),
(50, 32, 1),
(51, 33, 4),
(52, 34, 2),
(53, 35, 3),
(54, 35, 4),
(55, 36, 3);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'General User');

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `shop_name` varchar(100) DEFAULT NULL,
  `phonenumber` varchar(10) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`id`, `shop_name`, `phonenumber`, `location_id`, `create_time`, `create_by`, `rating`) VALUES
(1, 'TE_TT', '2222222221', 14, '2023-04-21 19:48:37', 1, 0),
(2, 'TTT_Shop', '0987654321', 15, '2023-04-21 22:00:29', 1, 0),
(6, '1112', '1111111111', 26, '2023-05-01 18:18:39', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shop_category`
--

CREATE TABLE `shop_category` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shop_category`
--

INSERT INTO `shop_category` (`id`, `shop_id`, `category_id`) VALUES
(7, 2, 3),
(8, 2, 4),
(23, 1, 1),
(24, 1, 2),
(25, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `shop_menu`
--

CREATE TABLE `shop_menu` (
  `id` int(11) NOT NULL,
  `menu_name` varchar(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `create_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shop_menu`
--

INSERT INTO `shop_menu` (`id`, `menu_name`, `price`, `create_by`) VALUES
(1, 'สระผม', 101, 1),
(2, 'ม้วนผม', 100, 1),
(3, 'asd', 12, 1),
(4, 'qwe', 2021, 1),
(5, 'asd2', 212, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(10) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `display_name`, `firstname`, `lastname`, `phonenumber`, `location_id`, `role_id`) VALUES
(1, '64015161@kmitl.ac.th', '12312312', NULL, 'TTT4', 'TTTT1', '2222222221', 13, 2),
(12, 'tode.2587@gmail.com', '12312312', '', 'qwe', 'ewq', '1111111111', 16, 2),
(15, 'tode.258712@gmail.com', '12312312', '', 'qqqqqqqq', 'wwwwwwwwww', '1231231231', 19, 2),
(16, 'tode.258713@gmail.com', '12312312', '', 'ads', 'zxc', '1231231231', 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_rating_shop`
--

CREATE TABLE `user_rating_shop` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `review_text` text DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_by` (`create_by`),
  ADD KEY `order_at` (`order_at`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_id` (`menu_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_by` (`create_by`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `shop_category`
--
ALTER TABLE `shop_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `shop_menu`
--
ALTER TABLE `shop_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_by` (`create_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `user_rating_shop`
--
ALTER TABLE `user_rating_shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `shop_category`
--
ALTER TABLE `shop_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `shop_menu`
--
ALTER TABLE `shop_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_rating_shop`
--
ALTER TABLE `user_rating_shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`order_at`) REFERENCES `shop` (`id`);

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`menu_id`) REFERENCES `shop_menu` (`id`);

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `shop_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `shop_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Constraints for table `shop_category`
--
ALTER TABLE `shop_category`
  ADD CONSTRAINT `shop_category_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `shop_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `shop_menu`
--
ALTER TABLE `shop_menu`
  ADD CONSTRAINT `shop_menu_ibfk_1` FOREIGN KEY (`create_by`) REFERENCES `shop` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Constraints for table `user_rating_shop`
--
ALTER TABLE `user_rating_shop`
  ADD CONSTRAINT `user_rating_shop_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_rating_shop_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
