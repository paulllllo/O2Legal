-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS o2_db;
CREATE USER IF NOT EXISTS 'o2_dev'@'localhost' IDENTIFIED BY 'o2_pwd';
GRANT ALL PRIVILEGES ON `o2_db`.* TO 'o2_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'o2_dev'@'localhost';
FLUSH PRIVILEGES;
