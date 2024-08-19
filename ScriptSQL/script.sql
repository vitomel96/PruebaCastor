-- Crear tabla Solicitante
CREATE TABLE IF NOT EXISTS Solicitante (
    IdSolicitante INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255) NOT NULL
);

-- Crear tabla EstadoSolicitud
CREATE TABLE IF NOT EXISTS EstadoSolicitud (
    IdEstadoSolicitud INT PRIMARY KEY AUTO_INCREMENT,
    NombreEstado VARCHAR(255) NOT NULL
);

-- Crear tabla Servicio
CREATE TABLE IF NOT EXISTS Servicio (
    IdServicio INT PRIMARY KEY AUTO_INCREMENT,
    NombreServicio VARCHAR(255) NOT NULL
);

-- Crear tabla Solicitud
CREATE TABLE IF NOT EXISTS Solicitud (
    IdSolicitud INT PRIMARY KEY AUTO_INCREMENT,
    FechaSolicitud DATE NOT NULL,
    IdSolicitante INT,
    IdEstadoSolicitud INT,
    FOREIGN KEY (IdSolicitante) REFERENCES Solicitante(IdSolicitante) ON DELETE CASCADE,
    FOREIGN KEY (IdEstadoSolicitud) REFERENCES EstadoSolicitud(IdEstadoSolicitud) ON DELETE CASCADE
);

-- Crear tabla SolicitudServicio
CREATE TABLE IF NOT EXISTS SolicitudServicio (
    IdSolicitud INT,
    IdServicio INT,
    PRIMARY KEY (IdSolicitud, IdServicio),
    FOREIGN KEY (IdSolicitud) REFERENCES Solicitud(IdSolicitud) ON DELETE CASCADE,
    FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio) ON DELETE CASCADE
);

-- Ejemplo de consulta para obtener datos
SELECT 
    s.IdSolicitud AS NroSolicitud,
    sol.Nombre AS NombreSolicitante,
    es.IdEstadoSolicitud AS NroEstadoSolicitud,
    es.NombreEstado AS NombreEstadoSolicitud,
    ser.IdServicio AS NroServicio,
    ser.NombreServicio AS NombreServicio
FROM 
    Solicitud s
    INNER JOIN Solicitante sol ON s.IdSolicitante = sol.IdSolicitante
    INNER JOIN EstadoSolicitud es ON s.IdEstadoSolicitud = es.IdEstadoSolicitud
    INNER JOIN SolicitudServicio ss ON s.IdSolicitud = ss.IdSolicitud
    INNER JOIN Servicio ser ON ss.IdServicio = ser.IdServicio;
