-- Base de datos Grupo 2
-- Fecha creacion: 23/03/2022

CREATE database Farmacia_Grupo2;
USE Farmacia_Grupo2;
-- -----------------------------------------------------
-- Table `Farmacia`.`proveedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS proveedores (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(45) NOT NULL,
  telefono VARCHAR(9) NULL,
  direccion VARCHAR(250) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`tipos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tipos (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`Personas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Personas (
  id INT NOT NULL AUTO_INCREMENT,
  identidad VARCHAR(13) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  edad INT NOT NULL,
  telefono VARCHAR(9) NULL,
  rtn VARCHAR(45) NULL,
  direccion VARCHAR(250) NULL,
  estado TINYINT(1) NULL,
  imagen VARCHAR(250) NULL,
  tipo ENUM('CL', 'EM') NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Farmacia`.`sucursal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS sucursal (
  id INT NOT NULL AUTO_INCREMENT,
  ciudad VARCHAR(45) NOT NULL,
  direccion VARCHAR(250) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  id_personas INT NOT NULL,
  login VARCHAR(45) NOT NULL,
  correo VARCHAR(250) NOT NULL,
  contrasena VARCHAR(250) NOT NULL,
  estado ENUM('ACTIVO', 'INACTIVO') NULL,
  pin CHAR(4) NULL,
  PRIMARY KEY (id),
  INDEX id_idx (id_personas ASC) VISIBLE,
  CONSTRAINT id
    FOREIGN KEY (id_personas)
    REFERENCES Personas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  fechavencimiento DATETIME NOT NULL,
  codigobarras VARCHAR(45) NOT NULL,
  descripcion VARCHAR(250) NULL,
  impuesto DOUBLE NOT NULL,
  precio DOUBLE NOT NULL,
  idtipo INT NOT NULL,
  imagen VARCHAR(250) NULL,
  estado TINYINT(1) NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idtipo ASC) VISIBLE,
  CONSTRAINT idtipo
    FOREIGN KEY (idtipo)
    REFERENCES tipos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `Farmacia`.`compras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS compras (
  id INT NOT NULL AUTO_INCREMENT,
  idProveedor INT NOT NULL,
  fecha DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idProveedor ASC) VISIBLE,
  CONSTRAINT idProveedor
    FOREIGN KEY (idProveedor)
    REFERENCES proveedores (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Farmacia`.`detalleCompra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS detalleCompra (
  id INT NOT NULL AUTO_INCREMENT,
  idCompra INT NOT NULL,
  idProducto INT NOT NULL,
  precioCompra DOUBLE NOT NULL,
  cantidad INT NOT NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idCompra ASC) VISIBLE,
  INDEX idproducto_idx (idProducto ASC) VISIBLE,
  CONSTRAINT idcompra
    FOREIGN KEY (idCompra)
    REFERENCES compras (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT idproducto
    FOREIGN KEY (idProducto)
    REFERENCES Productos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`Ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Ventas (
  id INT NOT NULL AUTO_INCREMENT,
  idClientes INT NOT NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idClientes ASC) VISIBLE,
  CONSTRAINT idC
    FOREIGN KEY (idClientes)
    REFERENCES Personas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Farmacia`.`detalleVentas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS detalleVentas (
  id INT NOT NULL AUTO_INCREMENT,
  idCarrito INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  descuento DOUBLE NOT NULL,
  PRIMARY KEY (id, idCarrito),
  INDEX id_idx (idCarrito ASC) VISIBLE,
  INDEX idprodct_idx (idProducto ASC) VISIBLE,
  CONSTRAINT idCa
    FOREIGN KEY (idCarrito)
    REFERENCES Ventas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT idprodct
    FOREIGN KEY (idProducto)
    REFERENCES Productos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Farmacia`.`Inventario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Inventario (
  id INT NOT NULL AUTO_INCREMENT,
  idProducto INT NOT NULL,
  idCompras INT NOT NULL,
  idVentas INT NOT NULL,
  stock DOUBLE NOT NULL,
  PRIMARY KEY (id),
  INDEX idProducto_idx (idProducto ASC) VISIBLE,
  INDEX idCompras_idx (idCompras ASC) VISIBLE,
  INDEX idVentas_idx (idVentas ASC) VISIBLE,
  CONSTRAINT idProducto2
    FOREIGN KEY (idProducto)
    REFERENCES Productos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT idCompras2
    FOREIGN KEY (idCompras)
    REFERENCES compras (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT idVentas2
    FOREIGN KEY (idVentas)
    REFERENCES Ventas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB; 

-- -----------------------------------------------------
-- Table `Farmacia`.`Pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pedidos (
  id INT NOT NULL AUTO_INCREMENT,
  idVenta INT NOT NULL,
  fechaPedido DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idVenta ASC) VISIBLE,
  CONSTRAINT id2
    FOREIGN KEY (idVenta)
    REFERENCES Ventas (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `Farmacia`.`Entregas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Entregas (
  id INT NOT NULL AUTO_INCREMENT,
  idpedido INT NOT NULL,
  fecha DATETIME NOT NULL,
  estado TINYINT(1) NOT NULL,
  costo INT NULL,
  idsucursal INT NOT NULL,
  PRIMARY KEY (id),
  INDEX id_idx (idpedido ASC) VISIBLE,
  INDEX idsucursal_idx (idsucursal ASC) VISIBLE,
  CONSTRAINT idp
    FOREIGN KEY (idpedido)
    REFERENCES Pedidos (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT idsucursal
    FOREIGN KEY (idsucursal)
    REFERENCES sucursal (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table Vista DetalleCarrito
-- -----------------------------------------------------

create view DetalleCarritoV as select dv.id, dv.idCarrito, p.nombre, p.codigobarras, p.impuesto, p.precio, t.descripcion, dv.cantidad, dv.descuento, p.imagen from detalleVentas as dv 
inner join Ventas as v on dv.idCarrito=v.id  inner join Productos as p 
on dv.idProducto=p.id inner join tipos as t on p.idtipo=t.id;

select dv.id, dv.idCarrito, p.nombre, p.codigobarras, p.impuesto, p.precio, t.descripcion, dv.cantidad, dv.descuento, p.imagen,
sum(p.precio*dv.cantidad)+sum(p.precio*dv.cantidad)*(p.impuesto/100)-sum(p.precio*dv.cantidad)*(dv.descuento/100) as Total from detalleVentas as dv 
inner join Ventas as v on dv.idCarrito=v.id  inner join Productos as p 
on dv.idProducto=p.id inner join tipos as t on p.idtipo=t.id where dv.idCarrito='1' group by dv.idCarrito,p.nombre,p.codigobarras,
p.impuesto, p.precio,t.descripcion,dv.cantidad, dv.descuento,p.imagen, Total;

select * from Totales;
create view Totales as select sum(p.precio*dv.cantidad) as Subtotal, sum(p.precio*dv.cantidad)*(p.impuesto/100) as Impuesto, 
sum(p.precio*dv.cantidad)*(dv.descuento/100) as Descuento,
sum(p.precio*dv.cantidad)+sum(p.precio*dv.cantidad)*(p.impuesto/100)-sum(p.precio*dv.cantidad)*(dv.descuento/100) as Total
from detalleVentas as dv 
inner join Ventas as v on dv.idCarrito=v.id  inner join Productos as p 
on dv.idProducto=p.id inner join tipos as t on p.idtipo=t.id where dv.idCarrito='1';


-- -----------------------------------------------------
-- INSERCIONES
-- -----------------------------------------------------

insert into tipos (descripcion) values ('Cicatrizantes'),('Analgesico'),('Vitaminas'),('Proteccion');

insert into Personas ( identidad,nombre,apellido,edad,telefono,rtn,direccion,estado,imagen,tipo) 
values('0318200402610','Sandra','Calderon','21','33668853',null,'Siguatepeque',true,null,'EM'),
('1212200100016','Daniela','Vasquez','21','99999999',null,'Marcala',true,null,'EM');

insert into Personas ( identidad,nombre,apellido,edad,telefono,rtn,direccion,estado,imagen,tipo) 
values('0310200100100','Carlos','Flores','25','99012345',null,'Siguatepeque',true,null,'EM');

insert into Productos (nombre,fechavencimiento,codigobarras,descripcion, impuesto, precio,idtipo,imagen, estado) values
 ('Neobol2','2022-01-11','1000001',null,'15','190','1','http://localhost:4001/usuario/img/img-1648009386154-989785856image.jpeg','1'),
 ('Emulsion Scott','2022-01-11','1000002',null,'15','150','3','http://192.168.1.39:4001/usuario/img/img-1648009357110-529719040image.jpeg','1'),
 ('Panadol','2022-01-11','1000003',null,'15','10','2','http://192.168.1.39:4001/usuario/img/img-1648009393523-774329275image.jpeg','1'),
 ('Sudagrip','2022-01-11','1000004',null,'15','10','2','http://192.168.1.39:4001/usuario/img/img-1648009406312-221969336image.jpeg','1'),
 ('Mascarillas','2022-01-11','1000005',null,'15','100','4','http://192.168.1.39:4001/usuario/img/img-1648009375647-515855824image.jpeg','1'),
 ('Gasas','2022-01-11','1000006',null,'15','50','4','http://192.168.1.39:4001/usuario/img/img-1648009362506-228086519image.jpeg','1'),
 ('Acetaminofen','2022-01-11','1000007',null,'15','70','2','http://192.168.1.39:4001/usuario/img/img-1648009339195-237383900image.webp','1'),
 ('Alcohol Clinico','2022-01-11','1000008',null,'15','80','4','http://192.168.1.39:4001/usuario/img/img-1648009349809-857909128image.webp','1'),
 ('Jarabe','2022-01-11','1000009',null,'15','100','2','http://192.168.1.39:4001/usuario/img/img-1648009369503-953969632image.jpeg','1'),
 ('Povidone','2022-01-11','1000010',null,'15','130','1','http://192.168.1.39:4001/usuario/img/img-1648009399820-255465088image.jpeg','1');
 
 insert into Productos (nombre,fechavencimiento,codigobarras,descripcion, impuesto, precio,idtipo,imagen, estado) values
 ('Jabon Asepxia','2022-01-11','1000011',null,'15','190','1','http://192.168.1.7:4001/usuario/img/img-1648009386154-989785856image.jpeg','1');
 insert into Ventas (idClientes) values ('1'),('2');
 
 insert into detalleVentas (idCarrito,idProducto,cantidad,descuento) values 
 ('1','8','2','0'),('1','3','4','0'),('1','4','10','0'),('1','6','4','0'),
 ('1','10','1','0'),('2','9','2','0'),('2','3','5','0'),('2','5','3','0');
 

select * from detalleVentas;
select * from Ventas;
select * from Productos;
select * from DetalleCarritoV;









