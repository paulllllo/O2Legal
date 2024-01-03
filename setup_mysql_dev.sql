-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS lb_db;
CREATE USER IF NOT EXISTS 'lb_dev'@'localhost' IDENTIFIED BY 'lb_pwd';
GRANT ALL PRIVILEGES ON `lb_db`.* TO 'lb_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'lb_dev'@'localhost';
FLUSH PRIVILEGES;
