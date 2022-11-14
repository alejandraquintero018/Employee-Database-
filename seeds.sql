-- INSERT INTO department (nameof)
-- VALUES 
--        ("Engineering"),
--        ("Sales"),
--        ("Marketing"), 
--        ("Human Resources"), 
--        ("Finance");

-- INSERT INTO role (title, salary)
-- VALUES ("Senior Accountant", 250000.00),
--        ("Senior Engineer", 80000.00),
--        ("Sales Lead", 135000.00),
--        ("Human Resource", 95000), 
--        ("Marketing Lead", 175000), 
--        ("Accountant", 95000), 
--        ("Intern", 35000), 
--        ("Entry Level Engineer", 75000); 

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Marie", "Curie", 1, null),
--        ("Sally", "Ride", ), 
--        ("Emily", "Dickenson"), 
--        ("Florence", "Nightingale"),
--        ("Hayley","Kiyoko"),
--        ("Samira", "Wiley"), 
--        ("Dorthy", "Hodgkin"); 


INSERT INTO department (nameof)
VALUES 
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Rachel', 'Green', 1, null),
('Gunther', 'Centralperk', 2, 1),
('Ross', 'Geller', 3, null ),
('Joey', 'Tribbiani', 4, 3),
('Chandler', 'Bing', 5, null),
('Monica', 'Geller', 6, 5),
('Phoebe', 'Buffay', 7, null),
('Mike', 'Hannigan', 8, 7);