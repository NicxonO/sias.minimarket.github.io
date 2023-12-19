-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 08-12-2023 a las 23:42:08
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `juanjosuper`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_cliente`
--

DROP TABLE IF EXISTS `tbl_cliente`;
CREATE TABLE IF NOT EXISTS `tbl_cliente` (
  `tbl_clie_id` int NOT NULL AUTO_INCREMENT,
  `tbl_clie_nombre` varchar(45) NOT NULL,
  `tbl_clie_direccion` varchar(45) DEFAULT NULL,
  `tbl_clie_documento` int DEFAULT NULL,
  `tbl_clie_numero_contacto` int DEFAULT NULL,
  PRIMARY KEY (`tbl_clie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_cliente`
--

INSERT INTO `tbl_cliente` (`tbl_clie_id`, `tbl_clie_nombre`, `tbl_clie_direccion`, `tbl_clie_documento`, `tbl_clie_numero_contacto`) VALUES
(1, 'Tatiana Puerta', 'CR 42 #70-25', 44001673, 2147483647);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_datos_empresa`
--

DROP TABLE IF EXISTS `tbl_datos_empresa`;
CREATE TABLE IF NOT EXISTS `tbl_datos_empresa` (
  `tbl_datos_empresa_id` int NOT NULL AUTO_INCREMENT,
  `tbl_datos_empresa_nombre` varchar(80) NOT NULL,
  `tbl_datos_empresa_nit` varchar(80) DEFAULT NULL,
  `tbl_datos_empresa_correo` varchar(80) DEFAULT NULL,
  `tbl_datos_empresa_iva` int NOT NULL,
  PRIMARY KEY (`tbl_datos_empresa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_datos_empresa`
--

INSERT INTO `tbl_datos_empresa` (`tbl_datos_empresa_id`, `tbl_datos_empresa_nombre`, `tbl_datos_empresa_nit`, `tbl_datos_empresa_correo`, `tbl_datos_empresa_iva`) VALUES
(1, 'JuanjoSuper', '90090391', 'juanjosuper@gmail.com', 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_detalle_factura`
--

DROP TABLE IF EXISTS `tbl_detalle_factura`;
CREATE TABLE IF NOT EXISTS `tbl_detalle_factura` (
  `tbl_detalle_factura_id` int NOT NULL AUTO_INCREMENT,
  `tbl_detalle_factura_fact_id` int NOT NULL,
  `tbl_detalle_factura_producto_id` int NOT NULL,
  `tbl_detalle_factura_cantidad_prod` int NOT NULL,
  `tbl_detalle_factura_precio_prod` int NOT NULL,
  `tbl_detalle_factura_total_prod` varchar(45) NOT NULL,
  PRIMARY KEY (`tbl_detalle_factura_id`),
  KEY `id_factura_idx` (`tbl_detalle_factura_fact_id`),
  KEY `id_producto_idx` (`tbl_detalle_factura_producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_detalle_factura`
--

INSERT INTO `tbl_detalle_factura` (`tbl_detalle_factura_id`, `tbl_detalle_factura_fact_id`, `tbl_detalle_factura_producto_id`, `tbl_detalle_factura_cantidad_prod`, `tbl_detalle_factura_precio_prod`, `tbl_detalle_factura_total_prod`) VALUES
(1, 1, 1, 4, 6500, '26000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_detalle_venta`
--

DROP TABLE IF EXISTS `tbl_detalle_venta`;
CREATE TABLE IF NOT EXISTS `tbl_detalle_venta` (
  `tbl_int_venta_producto_id` int NOT NULL AUTO_INCREMENT,
  `tbl_int_venta` int NOT NULL,
  `tbl_int_producto` int NOT NULL,
  `tbl_det_venta_cantidad_prod` int NOT NULL,
  `tbl_det_venta_precio_prod` int NOT NULL,
  `tbl_det_venta_total_precio` int NOT NULL,
  `tbl_det_venta_descuento` int DEFAULT '0',
  `tbl_det_venta_valor_descuento` int DEFAULT '0',
  PRIMARY KEY (`tbl_int_venta_producto_id`),
  KEY `venta_producto_idx` (`tbl_int_venta`),
  KEY `productos_venta_idx` (`tbl_int_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_detalle_venta`
--

INSERT INTO `tbl_detalle_venta` (`tbl_int_venta_producto_id`, `tbl_int_venta`, `tbl_int_producto`, `tbl_det_venta_cantidad_prod`, `tbl_det_venta_precio_prod`, `tbl_det_venta_total_precio`, `tbl_det_venta_descuento`, `tbl_det_venta_valor_descuento`) VALUES
(1, 1, 1, 4, 6500, 26000, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_factura`
--

DROP TABLE IF EXISTS `tbl_factura`;
CREATE TABLE IF NOT EXISTS `tbl_factura` (
  `tbl_fact_id` int NOT NULL AUTO_INCREMENT,
  `tbl_fact_venta_id` int NOT NULL,
  `tbl_fact_cliente_id` int DEFAULT NULL,
  `tbl_fact_empleado_id` int NOT NULL,
  `tbl_fact_total_iva` int DEFAULT NULL,
  `tbl_fact_total_venta` int NOT NULL,
  `tbl_fact_fecha_venta` date NOT NULL,
  `tbl_fact_cabecera` int NOT NULL,
  PRIMARY KEY (`tbl_fact_id`),
  KEY `factura_venta_idx` (`tbl_fact_venta_id`),
  KEY `factura_cliente_idx` (`tbl_fact_cliente_id`),
  KEY `factura_empleado_idx` (`tbl_fact_empleado_id`),
  KEY `factura_cabecera_idx` (`tbl_fact_cabecera`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_factura`
--

INSERT INTO `tbl_factura` (`tbl_fact_id`, `tbl_fact_venta_id`, `tbl_fact_cliente_id`, `tbl_fact_empleado_id`, `tbl_fact_total_iva`, `tbl_fact_total_venta`, `tbl_fact_fecha_venta`, `tbl_fact_cabecera`) VALUES
(1, 1, 1, 2, 4940, 26000, '0000-00-00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_metodo_pago`
--

DROP TABLE IF EXISTS `tbl_metodo_pago`;
CREATE TABLE IF NOT EXISTS `tbl_metodo_pago` (
  `tbl_metodo_id` int NOT NULL AUTO_INCREMENT,
  `tbl_metodo_nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`tbl_metodo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_metodo_pago`
--

INSERT INTO `tbl_metodo_pago` (`tbl_metodo_id`, `tbl_metodo_nombre`) VALUES
(1, 'Efectivo'),
(2, 'Transferencia'),
(3, 'Mixto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_producto`
--

DROP TABLE IF EXISTS `tbl_producto`;
CREATE TABLE IF NOT EXISTS `tbl_producto` (
  `tbl_prod_id` int NOT NULL AUTO_INCREMENT,
  `tbl_prod_nombre` varchar(45) NOT NULL,
  `tbl_prod_existencias` int NOT NULL,
  `tbl_prod_precio_compra` int NOT NULL,
  `tbl_prod_precio` int NOT NULL,
  `tbl_prod_imagen_referencia` mediumtext NOT NULL,
  `tbl_prod_categoria` int NOT NULL,
  `tbl_prod_proveedor` int NOT NULL,
  `tbl_prod_usuario` int NOT NULL,
  PRIMARY KEY (`tbl_prod_id`),
  KEY `proveedor_producto_idx` (`tbl_prod_proveedor`),
  KEY `producto_usuario_idx` (`tbl_prod_usuario`),
  KEY `categoria_producto_idx` (`tbl_prod_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_producto`
--

INSERT INTO `tbl_producto` (`tbl_prod_id`, `tbl_prod_nombre`, `tbl_prod_existencias`, `tbl_prod_precio_compra`, `tbl_prod_precio`, `tbl_prod_imagen_referencia`, `tbl_prod_categoria`, `tbl_prod_proveedor`, `tbl_prod_usuario`) VALUES
(1, 'Salchichas Zenú', 30, 5000, 6500, '', 2, 1, 2),
(2, 'Arepas al carbón', 50, 2000, 2500, '', 5, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_producto_categoria`
--

DROP TABLE IF EXISTS `tbl_producto_categoria`;
CREATE TABLE IF NOT EXISTS `tbl_producto_categoria` (
  `tbl_producto_categoria_id` int NOT NULL AUTO_INCREMENT,
  `tbl_producto_categoria_nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`tbl_producto_categoria_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_producto_categoria`
--

INSERT INTO `tbl_producto_categoria` (`tbl_producto_categoria_id`, `tbl_producto_categoria_nombre`) VALUES
(1, 'Enbutidos'),
(2, 'Enlatados'),
(3, 'Lacteos'),
(4, 'Carnicos'),
(5, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_proveedor`
--

DROP TABLE IF EXISTS `tbl_proveedor`;
CREATE TABLE IF NOT EXISTS `tbl_proveedor` (
  `tbl_prov_id` int NOT NULL AUTO_INCREMENT,
  `tbl_prov_nombre` varchar(45) NOT NULL,
  `tbl_prov_contacto` int NOT NULL,
  PRIMARY KEY (`tbl_prov_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_proveedor`
--

INSERT INTO `tbl_proveedor` (`tbl_prov_id`, `tbl_prov_nombre`, `tbl_prov_contacto`) VALUES
(1, 'Zenú', 4444444),
(2, 'Fricar', 5555555),
(3, 'Postobon', 3333333),
(4, 'Arepas doña ana', 2222222),
(5, 'Panaderia tunjuelito', 1111111);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_reporte`
--

DROP TABLE IF EXISTS `tbl_reporte`;
CREATE TABLE IF NOT EXISTS `tbl_reporte` (
  `tbl_repo_id` int NOT NULL AUTO_INCREMENT,
  `tbl_repo_nombre` varchar(45) NOT NULL,
  `tbl_repo_datos` varchar(45) NOT NULL,
  `tbl_repo_producto` varchar(45) NOT NULL,
  `tbl_repo_usuario` int DEFAULT NULL,
  PRIMARY KEY (`tbl_repo_id`),
  KEY `reporte_usuario_idx` (`tbl_repo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol_organizacion`
--

DROP TABLE IF EXISTS `tbl_rol_organizacion`;
CREATE TABLE IF NOT EXISTS `tbl_rol_organizacion` (
  `tbl_rol_id` int NOT NULL AUTO_INCREMENT,
  `tbl_rol_nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`tbl_rol_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_rol_organizacion`
--

INSERT INTO `tbl_rol_organizacion` (`tbl_rol_id`, `tbl_rol_nombre`) VALUES
(1, 'Administrador'),
(2, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
CREATE TABLE IF NOT EXISTS `tbl_usuario` (
  `tbl_usu_id` int NOT NULL AUTO_INCREMENT,
  `tbl_usu_nombre` varchar(45) NOT NULL,
  `tbl_usu_nombre_usuario` varchar(45) NOT NULL,
  `tbl_usu_correo` varchar(45) NOT NULL,
  `tbl_usu_contrasena` varchar(45) NOT NULL,
  `tbl_usu_rol` int NOT NULL,
  PRIMARY KEY (`tbl_usu_id`),
  UNIQUE KEY `tbl_usu_correo_UNIQUE` (`tbl_usu_correo`),
  KEY `rol_usuario_idx` (`tbl_usu_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`tbl_usu_id`, `tbl_usu_nombre`, `tbl_usu_nombre_usuario`, `tbl_usu_correo`, `tbl_usu_contrasena`, `tbl_usu_rol`) VALUES
(1, 'Nicxon Ospina', 'nicxono', 'nicxon.andres@hotmail.com', '1000874509', 1),
(2, 'Erika Zapata', 'erikaz', 'erikaandreazapata@gmail.com', '1000653670', 2),
(3, 'Valentina Zapata', 'valenz', 'valenz6@gmail.com', '2336687', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_venta`
--

DROP TABLE IF EXISTS `tbl_venta`;
CREATE TABLE IF NOT EXISTS `tbl_venta` (
  `tbl_vent_id` int NOT NULL AUTO_INCREMENT,
  `tbl_vent_cliente_id` int DEFAULT NULL,
  `tbl_vent_total` int NOT NULL,
  `tbl_vent_total_recibido` int NOT NULL,
  `tbl_vent_total_devuelto` int NOT NULL,
  `tbl_vent_fecha` datetime NOT NULL,
  `tbl_vent_usuario_id` int NOT NULL,
  `tbl_vent_metodo_pago` int NOT NULL,
  PRIMARY KEY (`tbl_vent_id`),
  KEY `metodo_pago_idx` (`tbl_vent_metodo_pago`),
  KEY `empleado_venta_idx` (`tbl_vent_usuario_id`),
  KEY `cliente_venta_idx` (`tbl_vent_cliente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tbl_venta`
--

INSERT INTO `tbl_venta` (`tbl_vent_id`, `tbl_vent_cliente_id`, `tbl_vent_total`, `tbl_vent_total_recibido`, `tbl_vent_total_devuelto`, `tbl_vent_fecha`, `tbl_vent_usuario_id`, `tbl_vent_metodo_pago`) VALUES
(1, 1, 26000, 30000, 4000, '0000-00-00 00:00:00', 2, 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_detalle_factura`
--
ALTER TABLE `tbl_detalle_factura`
  ADD CONSTRAINT `id_factura` FOREIGN KEY (`tbl_detalle_factura_fact_id`) REFERENCES `tbl_factura` (`tbl_fact_id`),
  ADD CONSTRAINT `id_producto` FOREIGN KEY (`tbl_detalle_factura_producto_id`) REFERENCES `tbl_producto` (`tbl_prod_id`);

--
-- Filtros para la tabla `tbl_detalle_venta`
--
ALTER TABLE `tbl_detalle_venta`
  ADD CONSTRAINT `productos_venta` FOREIGN KEY (`tbl_int_producto`) REFERENCES `tbl_producto` (`tbl_prod_id`),
  ADD CONSTRAINT `venta` FOREIGN KEY (`tbl_int_venta`) REFERENCES `tbl_venta` (`tbl_vent_id`);

--
-- Filtros para la tabla `tbl_factura`
--
ALTER TABLE `tbl_factura`
  ADD CONSTRAINT `factura_cabecera` FOREIGN KEY (`tbl_fact_cabecera`) REFERENCES `tbl_datos_empresa` (`tbl_datos_empresa_id`),
  ADD CONSTRAINT `factura_cliente` FOREIGN KEY (`tbl_fact_cliente_id`) REFERENCES `tbl_cliente` (`tbl_clie_id`),
  ADD CONSTRAINT `factura_empleado` FOREIGN KEY (`tbl_fact_empleado_id`) REFERENCES `tbl_usuario` (`tbl_usu_id`),
  ADD CONSTRAINT `factura_venta` FOREIGN KEY (`tbl_fact_venta_id`) REFERENCES `tbl_venta` (`tbl_vent_id`);

--
-- Filtros para la tabla `tbl_producto`
--
ALTER TABLE `tbl_producto`
  ADD CONSTRAINT `categoria_producto` FOREIGN KEY (`tbl_prod_categoria`) REFERENCES `tbl_producto_categoria` (`tbl_producto_categoria_id`),
  ADD CONSTRAINT `producto_usuario` FOREIGN KEY (`tbl_prod_usuario`) REFERENCES `tbl_usuario` (`tbl_usu_id`),
  ADD CONSTRAINT `proveedor_producto` FOREIGN KEY (`tbl_prod_proveedor`) REFERENCES `tbl_proveedor` (`tbl_prov_id`);

--
-- Filtros para la tabla `tbl_reporte`
--
ALTER TABLE `tbl_reporte`
  ADD CONSTRAINT `reporte_usuario` FOREIGN KEY (`tbl_repo_usuario`) REFERENCES `tbl_usuario` (`tbl_usu_id`);

--
-- Filtros para la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `rol_usuario` FOREIGN KEY (`tbl_usu_rol`) REFERENCES `tbl_rol_organizacion` (`tbl_rol_id`);

--
-- Filtros para la tabla `tbl_venta`
--
ALTER TABLE `tbl_venta`
  ADD CONSTRAINT `cliente_venta` FOREIGN KEY (`tbl_vent_cliente_id`) REFERENCES `tbl_cliente` (`tbl_clie_id`),
  ADD CONSTRAINT `empleado_venta` FOREIGN KEY (`tbl_vent_usuario_id`) REFERENCES `tbl_usuario` (`tbl_usu_id`),
  ADD CONSTRAINT `metodo_pago` FOREIGN KEY (`tbl_vent_metodo_pago`) REFERENCES `tbl_metodo_pago` (`tbl_metodo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
