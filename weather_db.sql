-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2025 a las 07:54:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `weather_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensores`
--

CREATE TABLE `sensores` (
  `id` int(11) NOT NULL,
  `temperatura` float DEFAULT NULL,
  `humedad` float DEFAULT NULL,
  `suelo` int(11) DEFAULT NULL,
  `luz` float DEFAULT NULL,
  `viento_direccion` varchar(20) DEFAULT NULL,
  `viento_velocidad` float DEFAULT NULL,
  `lluvia` varchar(10) DEFAULT NULL,
  `lluvia_mm` float DEFAULT NULL,
  `estado_lluvia` varchar(10) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensores`
--

INSERT INTO `sensores` (`id`, `temperatura`, `humedad`, `suelo`, `luz`, `viento_direccion`, `viento_velocidad`, `lluvia`, `lluvia_mm`, `estado_lluvia`, `fecha`, `hora`, `timestamp`) VALUES
(1, 22.5, 65.3, 40, 150, 'Noreste', 2.8, 'Sí', 0.7, 'Fuerte', '2025-04-19', '15:30:00', '2025-04-19 22:00:29'),
(2, 23.1, 66, 39, 155, 'Noreste', 3.1, 'Sí', 1.2, 'Fuerte', '2025-04-19', '16:00:00', '2025-04-19 22:19:46'),
(3, 22.5, 65, 40, 150, 'Norte', 2.1, 'Sí', 1.2, 'Fuerte', '2025-04-19', '08:00:00', '2025-04-19 22:54:27'),
(4, 23.7, 66.5, 39, 155, 'Noreste', 2.3, 'Sí', 0.9, 'Media', '2025-04-19', '10:00:00', '2025-04-19 22:54:27'),
(5, 21.9, 63, 38, 145, 'Este', 2, 'No', 0, 'Nula', '2025-04-19', '12:00:00', '2025-04-19 22:54:27'),
(6, 25.3, 70.1, 37, 160, 'Sur', 3.2, 'Sí', 1.5, 'Fuerte', '2025-04-19', '14:00:00', '2025-04-19 22:54:27'),
(7, 20.8, 62, 36, 140, 'Oeste', 1.8, 'No', 0, 'Nula', '2025-04-19', '16:00:00', '2025-04-19 22:54:27'),
(8, 22.5, 65.3, 40, 150, 'Noreste', 2.8, 'Sí', 0.7, 'Fuerte', '2025-04-17', '08:00:00', '2025-04-19 23:21:05'),
(9, 23.1, 66, 39, 155, 'Noreste', 3.1, 'Sí', 1.2, 'Fuerte', '2025-04-17', '10:00:00', '2025-04-19 23:21:05'),
(10, 21.9, 63, 38, 145, 'Este', 2, 'No', 0, 'Nula', '2025-04-18', '08:00:00', '2025-04-19 23:21:05'),
(11, 24.2, 67, 37, 160, 'Sur', 3.2, 'Sí', 1.5, 'Fuerte', '2025-04-18', '10:00:00', '2025-04-19 23:21:05'),
(12, 20.8, 62, 36, 140, 'Oeste', 1.8, 'No', 0, 'Nula', '2025-04-19', '08:00:00', '2025-04-19 23:21:05'),
(13, 25, 68, 40, 150, 'Norte', 2.2, 'Sí', 0.8, 'Media', '2025-04-19', '10:00:00', '2025-04-19 23:21:05'),
(14, 22, 64, 38, 130, 'Noroeste', 2.6, 'No', 0, 'Nula', '2025-04-20', '08:00:00', '2025-04-19 23:21:05'),
(15, 23.3, 66.2, 39, 155, 'Noreste', 3.3, 'Sí', 1, 'Fuerte', '2025-04-20', '10:00:00', '2025-04-19 23:21:05'),
(16, 24.5, 69, 41, 160, 'Sur', 3.5, 'Sí', 1.4, 'Fuerte', '2025-04-21', '08:00:00', '2025-04-19 23:21:05'),
(17, 21.7, 60.5, 35, 135, 'Oeste', 1.5, 'No', 0, 'Nula', '2025-04-21', '10:00:00', '2025-04-19 23:21:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sensores`
--
ALTER TABLE `sensores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sensores`
--
ALTER TABLE `sensores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
