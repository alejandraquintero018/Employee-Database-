const inquirer = require('inquirer');
const express = require('express');
const consoletable = require('console.table');
const mysql = require('mysql2');
const { devNull } = require('os');
const { brotliDecompress } = require('zlib');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: "employee_db"
    },
    console.log(`Connected to the employees_db database.`)
);

function wordart() {
    console.log('─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
    console.log('─██████████████─██████──────────██████─██████████████─██████─────────██████████████─████████──████████─██████████████─██████████████─');
    console.log('─██░░░░░░░░░░██─██░░██████████████░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░██──██░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─██░░██████████─██░░░░░░░░░░░░░░░░░░██─██░░██████░░██─██░░██─────────██░░██████░░██─████░░██──██░░████─██░░██████████─██░░██████████─');
    console.log('─██░░██─────────██░░██████░░██████░░██─██░░██──██░░██─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───██░░██─────────██░░██─────────');
    console.log('─██░░██████████─██░░██──██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██──██░░██───████░░░░░░████───██░░██████████─██░░██████████─');
    console.log('─██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██──██░░██─────████░░████─────██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─██░░██████████─██░░██──██████──██░░██─██░░██████████─██░░██─────────██░░██──██░░██───────██░░██───────██░░██████████─██░░██████████─');
    console.log('─██░░██─────────██░░██──────────██░░██─██░░██─────────██░░██─────────██░░██──██░░██───────██░░██───────██░░██─────────██░░██─────────');
    console.log('─██░░██████████─██░░██──────────██░░██─██░░██─────────██░░██████████─██░░██████░░██───────██░░██───────██░░██████████─██░░██████████─');
    console.log('─██░░░░░░░░░░██─██░░██──────────██░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██───────██░░██───────██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─██████████████─██████──────────██████─██████─────────██████████████─██████████████───────██████───────██████████████─██████████████─');
    console.log('─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
    console.log('───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
    console.log('─████████████───██████████████─██████████████─██████████████─██████████████───██████████████─██████████████─██████████████─');
    console.log('─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██───██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─██░░████░░░░██─██░░██████░░██─██████░░██████─██░░██████░░██─██░░██████░░██───██░░██████░░██─██░░██████████─██░░██████████─');
    console.log('─██░░██──██░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░██──██░░██───██░░██──██░░██─██░░██─────────██░░██─────────');
    console.log('─██░░██──██░░██─██░░██████░░██─────██░░██─────██░░██████░░██─██░░██████░░████─██░░██████░░██─██░░██████████─██░░██████████─');
    console.log('─██░░██──██░░██─██░░░░░░░░░░██─────██░░██─────██░░░░░░░░░░██─██░░░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─██░░██──██░░██─██░░██████░░██─────██░░██─────██░░██████░░██─██░░████████░░██─██░░██████░░██─██████████░░██─██░░██████████─');
    console.log('─██░░██──██░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░██────██░░██─██░░██──██░░██─────────██░░██─██░░██─────────');
    console.log('─██░░████░░░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░████████░░██─██░░██──██░░██─██████████░░██─██░░██████████─');
    console.log('─██░░░░░░░░████─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
    console.log('─████████████───██████──██████─────██████─────██████──██████─████████████████─██████──██████─██████████████─██████████████─');
    console.log('───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
}
wordart();


function appMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userchoice',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
        },
    ]).then((choice) => {
        switch (choice.userchoice) {
            case 'View all Departments':
                //query to show all Departments or query the department table 
                db.query('SELECT * from department', function (err, results) {
                    console.table(results);
                    if (err) {
                        console.log(err);
                    }
                });
                break;
            case 'View all Roles':
                //query to show the roles table 
                db.query('SELECT * from role', function (err, results) {
                    console.table(results);
                    if (err) {
                        console.log(err);
                    }
                });
                break;
            case 'View all Employees':
                // query to show the employees table 
                db.query('SELECT * from employee', function (err, results) {
                    console.table(results);
                });
                break;
            case 'Add a Department':
                //function to add a department to the department table 
                createDepartment();
                break;
            case 'Add a Role':
                //function to add a role to the role table 
                createRole();
                break;
            case 'Add an Employee':
                createEmployee();
                break;
            case 'Update an Employee Role':
                //function to update an employee's role 
                // updateEmployee(); 
                console.log("Update an employee");
                break;
            default:
                console.log("Bye");
                return;
        }
    });
}

appMenu();

function updateEmployee() {
    db.query('SELECT * employee') //then map this 
    const employee
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role would you like to update?",
                choices: employee
            },
            {
                type: 'list',
                name: 'role',
                message: "What would you like the employee's updated role to be?",
                choices: //["Senior Accountant", "Senior Engineer", "Sales Lead", "Human Resource", "Marketing Lead", "Accountant", "Intern", "Entry Level Engineer"]
        }

        ]).then((answers)
        )

}

function createRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: 'SELECT first_name and last_name FROM employee'
                // ["Engineering", "Sales", "Marketing", "Human Resources", "Finance"]
            }
        ])
        .then(function (answers) {
            const { title, salary, department } = answers;
            console.log(answers);
            //query to populate the role table with the role data that the user inputs
            //There is going to be an error here because the answers gives a string for department but we need the department_id which is an INT 
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (${answers})`, function (err, results) {
                console.table(results);
                appMenu();
            });
        });
}

//helper functions 
function createEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
        const employees = results.map(({ id, first_name, last_name }) => (
            {
                value: id,
                name: `${first_name} ${last_name}`
            }
        ))
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the Employee?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the Employee?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the employee?',
                    choices: ["Senior Accountant", "Senior Engineer", "Sales Lead", "Human Resource", "Marketing Lead", "Accountant", "Intern", "Entry Level Engineer"]

                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    choices: //give a list of all employees, ["None", "Marie Curie"]
                },
            ])
    
        .then(function (answers) {
            answers.manager
            const { firstName, lastName, role, manager } = answers;
            //query to populate the employee table with the role data that the user inputs 
            //this query will have the same error as the above function
            db.query(`INSERT INTO employee (first_name, last_name, manager_id) VALUES = ?`, (firstName, lastName, role, manager), function (err, results) {
                console.log(answers);
                appMenu();
            });
            db.query('SELECT * from employee');
        });

};

function createDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            },
        ])
        .then(function (newDept) {
            console.log(newDept);
            //query to populate the employee table with the role data that the user inputs 
            db.query('INSERT INTO department (name) VALUES = ?', [newDept.name], function (err, results) {
                console.table(results);
                if (err) {
                    console.log(err);
                }
                appMenu();
            })
        });
}



