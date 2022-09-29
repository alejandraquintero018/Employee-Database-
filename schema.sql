DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db; 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,  
    nameof VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30), 
    salary DECIMAL (8, 2), 
    department_id INT, 
    FOREIGN KEY (department_id)
	REFERENCES department(id)
    ON DELETE SET NULL
); 

CREATE TABLE employee ( 
    id INT NOT NULL AUTO_INCREMENT, 
    PRIMARY KEY (id),
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id), 
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
); 

SHOW TABLES; 


SELECT * FROM department; 

SELECT * FROM role; 

SELECT * FROM employee; 

