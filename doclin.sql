-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2020 at 12:56 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doclin`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_pasien`
--

CREATE TABLE `data_pasien` (
  `id_data_pasien` int(11) NOT NULL,
  `nama_pasien` varchar(250) NOT NULL,
  `alamat_pasien` varchar(250) NOT NULL,
  `telpon_pasien` varchar(13) NOT NULL,
  `tl_pasien` varchar(11) NOT NULL,
  `jenis_kelamin` varchar(25) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_pasien`
--

INSERT INTO `data_pasien` (`id_data_pasien`, `nama_pasien`, `alamat_pasien`, `telpon_pasien`, `tl_pasien`, `jenis_kelamin`, `id_user`) VALUES
(4, 'Jack Miller', 'Airmadidi', '0852134679', '11/09/2020', 'Laki - Laki', 12),
(5, 'Will Smith', 'Kanaan', '0852134679', '11/09/2020', 'Laki - Laki', 13),
(6, 'Mary Jane', 'Paniki', '0852134679', '11/09/2020', 'Perempuan', 14);

-- --------------------------------------------------------

--
-- Table structure for table `dokter`
--

CREATE TABLE `dokter` (
  `id_dokter` int(11) NOT NULL,
  `nama_dokter` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(25) DEFAULT NULL,
  `tanggal_lahir` varchar(20) DEFAULT NULL,
  `spesialis` varchar(50) DEFAULT NULL,
  `sub_spesialis` varchar(50) DEFAULT NULL,
  `pendidikan` varchar(3) DEFAULT NULL,
  `jadwal_jam` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dokter`
--

INSERT INTO `dokter` (`id_dokter`, `nama_dokter`, `jenis_kelamin`, `tanggal_lahir`, `spesialis`, `sub_spesialis`, `pendidikan`, `jadwal_jam`) VALUES
(2, 'Dr. Arnold Gomes', 'Laki - Laki', '2020-11-11', 'jantung', 'hati', 'S2', '07:32 - 17:32'),
(3, 'Dr. James', 'Laki - Laki', '2020-11-17', 'Ahli dalam', 'paru -paru', 'S2', NULL),
(4, 'Aaa', 'Laki - Laki', '2020-11-18', 'adfs', 'asdfa', 'S1', NULL),
(5, 'Bbb', 'Perempuan', '2020-11-19', 'asdf', 'asdfas', 'S1', NULL),
(6, 'Www', 'Laki - Laki', '2020-11-18', 'sdfa', 'asdf', 'S1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dokter_klinik`
--

CREATE TABLE `dokter_klinik` (
  `id_dokter_klinik` int(11) NOT NULL,
  `id_klinik` int(11) NOT NULL,
  `id_dokter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dokter_klinik`
--

INSERT INTO `dokter_klinik` (`id_dokter_klinik`, `id_klinik`, `id_dokter`) VALUES
(3, 1, 2),
(5, 6, 3),
(9, 6, 4),
(10, 6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `klinik`
--

CREATE TABLE `klinik` (
  `id_klinik` int(11) NOT NULL,
  `nama_klinik` varchar(250) NOT NULL,
  `lokasi_klinik` varchar(250) NOT NULL,
  `telpon` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `klinik`
--

INSERT INTO `klinik` (`id_klinik`, `nama_klinik`, `lokasi_klinik`, `telpon`) VALUES
(1, 'Klinik Green Medika', 'Jl. Maesa No.49, Paal Dua, Kec. Tikala, Kota Manado, Sulawesi Utara, Indonesia', '082346325566'),
(6, 'Klinik Carisa', 'Jl. Pumorow No 119 A Wanea, Kota Manado, Sulawesi Utara, Indonesia', '081244051099'),
(7, 'Klinik Medika', 'Jl. Raya No.45. Malalayang Dua, Malalayang, Kota Manado, Sulawesi Utara 95162, Indonesia', '0431868695'),
(8, 'Klinik Husada', 'Jl. Ahmad Yani, Sario Tumpaan, Sario, Kota Manado, Sulawesi Utara, Indonesia', '08124426799'),
(9, 'Klinik Madani', 'Kelurahan Maasing Lingkungan 1., Kec. Tuminting, Mahawu, Tuminting, Kota Manado, Sulawesi Utara, Indonesia', '085240134436');

-- --------------------------------------------------------

--
-- Table structure for table `reservasi`
--

CREATE TABLE `reservasi` (
  `id_reservasi` int(11) NOT NULL,
  `id_dokter` int(11) NOT NULL,
  `id_pasien` int(11) NOT NULL,
  `tanggal_reservasi` varchar(10) DEFAULT NULL,
  `waktu_reservasi` varchar(25) DEFAULT NULL,
  `done` varchar(1) NOT NULL DEFAULT '0',
  `terima` varchar(1) NOT NULL DEFAULT '0',
  `no_antrian` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(250) DEFAULT NULL,
  `tipe_user` varchar(15) NOT NULL,
  `username` varchar(21) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` text NOT NULL,
  `id_klinik` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `tipe_user`, `username`, `email`, `password`, `id_klinik`) VALUES
(1, 'Admin', 'Admin', 'admin', NULL, 'd033e22ae348aeb5660fc2140aec35850c4da997', NULL),
(6, 'Staff KGM', 'Staff', 'staff_gm', NULL, '5ce3914569fc39c90f95ae5541a99aafe981b32f', 1),
(7, 'Staff Carisa', 'Staff', 'staff_carisa', NULL, '3552694775e3fbf4d320294052d8da141dc73cfc', 6),
(8, 'Staff Medika', 'Staff', 'staff_medika', NULL, 'f0b00d7ccb8656a3bbfbf52afc7dc3f73b9333fc', 7),
(9, 'Staff Husada', 'Staff', 'staff_husada', NULL, '0c1a77bde15b68207358b691930e56449d166f2c', 8),
(11, 'Staff Madani', 'Staff', 'staff_madani', NULL, '62d60fa65a4726266ed3007553b2412468e4e711', 9),
(12, NULL, 'Pasien', 'jack', 'jack@mail.com', '596727c8a0ea4db3ba2ceceedccbacd3d7b371b8', NULL),
(13, NULL, 'Pasien', 'will', 'will@mail.com', '8cb2237d0679ca88db6464eac60da96345513964', NULL),
(14, NULL, 'Pasien', 'mary', 'mary@mail.com', '8cb2237d0679ca88db6464eac60da96345513964', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_pasien`
--
ALTER TABLE `data_pasien`
  ADD PRIMARY KEY (`id_data_pasien`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `dokter`
--
ALTER TABLE `dokter`
  ADD PRIMARY KEY (`id_dokter`);

--
-- Indexes for table `dokter_klinik`
--
ALTER TABLE `dokter_klinik`
  ADD PRIMARY KEY (`id_dokter_klinik`),
  ADD KEY `id_dokter` (`id_dokter`),
  ADD KEY `id_klinik` (`id_klinik`);

--
-- Indexes for table `klinik`
--
ALTER TABLE `klinik`
  ADD PRIMARY KEY (`id_klinik`);

--
-- Indexes for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`id_reservasi`),
  ADD KEY `id_dokter` (`id_dokter`),
  ADD KEY `id_pasien` (`id_pasien`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_klinik` (`id_klinik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_pasien`
--
ALTER TABLE `data_pasien`
  MODIFY `id_data_pasien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dokter`
--
ALTER TABLE `dokter`
  MODIFY `id_dokter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `dokter_klinik`
--
ALTER TABLE `dokter_klinik`
  MODIFY `id_dokter_klinik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `klinik`
--
ALTER TABLE `klinik`
  MODIFY `id_klinik` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `id_reservasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_pasien`
--
ALTER TABLE `data_pasien`
  ADD CONSTRAINT `data_pasien_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dokter_klinik`
--
ALTER TABLE `dokter_klinik`
  ADD CONSTRAINT `dokter_klinik_ibfk_1` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dokter_klinik_ibfk_2` FOREIGN KEY (`id_klinik`) REFERENCES `klinik` (`id_klinik`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservasi`
--
ALTER TABLE `reservasi`
  ADD CONSTRAINT `reservasi_ibfk_1` FOREIGN KEY (`id_dokter`) REFERENCES `dokter` (`id_dokter`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservasi_ibfk_2` FOREIGN KEY (`id_pasien`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_klinik`) REFERENCES `klinik` (`id_klinik`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
