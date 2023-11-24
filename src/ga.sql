-- Active: 1698352821439@@127.0.0.1@3306@josecarlosmariategui

USE josecarlosmariategui;

CREATE TABLE
    CONTACTO(
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombres VARCHAR(80),
        email VARCHAR(80) NOT NULL,
        asunto VARCHAR(100) NOT NULL,
        mensaje VARCHAR(200) NOT NULL,
        pendiente char(1),
        CONSTRAINT CHK_EMAIL_formato CHECK (
            email REGEXP '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$'
        )
    );