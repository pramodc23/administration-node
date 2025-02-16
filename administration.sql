-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2025 at 04:34 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `administration`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(10) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `code`, `department_id`, `created_at`) VALUES
(1, 'Data Structures', 'CS101', 1, '2025-01-05 05:10:18'),
(2, 'Algorithms', 'CS102', 1, '2025-01-05 05:10:18'),
(3, 'Linear Algebra', 'MATH101', 2, '2025-01-05 05:10:18'),
(4, 'Operating Systems', 'CS201', 1, '2025-01-05 05:12:41'),
(5, 'Discrete Mathematics', 'MATH201', 2, '2025-01-05 05:12:41'),
(6, 'Quantum Mechanics', 'PHYS101', 3, '2025-01-05 05:12:41'),
(7, 'Compiler Design', 'CS301', 1, '2025-01-05 05:12:41'),
(8, 'Probability Theory', 'MATH202', 2, '2025-01-05 05:12:41');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `created_at`) VALUES
(1, 'Computer Science', '2025-01-05 05:10:17'),
(2, 'Mathematics', '2025-01-05 05:10:17'),
(3, 'Physics', '2025-01-05 05:10:17'),
(4, 'biology', '2025-01-07 03:55:21');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `enrolled_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `student_id`, `course_id`, `enrolled_at`) VALUES
(1, 1, 1, '2025-01-05 05:12:41'),
(2, 1, 2, '2025-01-05 05:12:41'),
(3, 2, 3, '2025-01-05 05:12:41'),
(4, 3, 1, '2025-01-05 05:12:41'),
(5, 3, 4, '2025-01-05 05:12:41'),
(6, 4, 5, '2025-01-05 05:12:41'),
(7, 5, 3, '2025-01-05 05:12:41'),
(10, 7, 2, '2025-01-05 05:12:41');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`id`, `name`, `email`, `phone`, `department_id`, `created_at`) VALUES
(1, 'Dr. Alice', 'alice@example.com', '9876543210', 1, '2025-01-05 05:10:18'),
(3, 'Robert shwanss', 'Robertshwassn@test.com', '9856321111', 3, '2025-01-05 05:12:41'),
(4, 'Dr. David Wilson', 'david.wilson@example.com', '6543210987', 1, '2025-01-05 05:12:41'),
(5, 'Dr. Emily Davis', 'emily.davis@example.com', '5432109876', 2, '2025-01-05 05:12:41'),
(6, 'Dr. Frank Carter', 'frank.carter@example.com', '4321098765', 3, '2025-01-05 05:12:41'),
(7, 'robin marlo', 'davidsinsdsa@test.com', '9856321470', 1, '2025-01-05 17:30:22');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `phone`, `department_id`, `created_at`) VALUES
(1, 'John Doe', 'john.doe@example.com', '1234567890', 1, '2025-01-05 05:10:18'),
(2, 'Jane Smith', 'jane.smith@example.com', '0987654321', 2, '2025-01-05 05:10:18'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '2345678901', 1, '2025-01-05 05:12:41'),
(4, 'Bob Brown', 'bob.brown@example.com', '3456789012', 2, '2025-01-05 05:12:41'),
(5, 'Charlie White', 'charlie.white@example.com', '4567890123', 3, '2025-01-05 05:12:41'),
(7, 'Evan Black', 'evan.black@example.com', '6789012345', 3, '2025-01-05 05:12:41'),
(15, 'harshi singssh', 'davidsingh@test.com', '9856321470', 1, '2025-01-05 08:59:27'),
(16, 'charli handly', 'charli@test.com', '9856321222', 3, '2025-01-07 03:32:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
