const inquirer = require('inquirer');
const express = require('express');
const consoletable = require('console.table');
const mysql = require('mysql2');
const { devNull } = require('os');
const { brotliDecompress } = require('zlib');
const { title } = require('process');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: "employee_db"
    },
    console.log(`Connected to the employees_db database.`)
);

// function wordart() {
//     console.log('─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
//     console.log('─██████████████─██████──────────██████─██████████████─██████─────────██████████████─████████──████████─██████████████─██████████████─');
//     console.log('─██░░░░░░░░░░██─██░░██████████████░░██─██░░░░░░░░░░██─██░░██─────────██░░░░░░░░░░██─██░░░░██──██░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─██░░██████████─██░░░░░░░░░░░░░░░░░░██─██░░██████░░██─██░░██─────────██░░██████░░██─████░░██──██░░████─██░░██████████─██░░██████████─');
//     console.log('─██░░██─────────██░░██████░░██████░░██─██░░██──██░░██─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───██░░██─────────██░░██─────────');
//     console.log('─██░░██████████─██░░██──██░░██──██░░██─██░░██████░░██─██░░██─────────██░░██──██░░██───████░░░░░░████───██░░██████████─██░░██████████─');
//     console.log('─██░░░░░░░░░░██─██░░██──██░░██──██░░██─██░░░░░░░░░░██─██░░██─────────██░░██──██░░██─────████░░████─────██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─██░░██████████─██░░██──██████──██░░██─██░░██████████─██░░██─────────██░░██──██░░██───────██░░██───────██░░██████████─██░░██████████─');
//     console.log('─██░░██─────────██░░██──────────██░░██─██░░██─────────██░░██─────────██░░██──██░░██───────██░░██───────██░░██─────────██░░██─────────');
//     console.log('─██░░██████████─██░░██──────────██░░██─██░░██─────────██░░██████████─██░░██████░░██───────██░░██───────██░░██████████─██░░██████████─');
//     console.log('─██░░░░░░░░░░██─██░░██──────────██░░██─██░░██─────────██░░░░░░░░░░██─██░░░░░░░░░░██───────██░░██───────██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─██████████████─██████──────────██████─██████─────────██████████████─██████████████───────██████───────██████████████─██████████████─');
//     console.log('─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
//     console.log('───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
//     console.log('─████████████───██████████████─██████████████─██████████████─██████████████───██████████████─██████████████─██████████████─');
//     console.log('─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██───██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─██░░████░░░░██─██░░██████░░██─██████░░██████─██░░██████░░██─██░░██████░░██───██░░██████░░██─██░░██████████─██░░██████████─');
//     console.log('─██░░██──██░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░██──██░░██───██░░██──██░░██─██░░██─────────██░░██─────────');
//     console.log('─██░░██──██░░██─██░░██████░░██─────██░░██─────██░░██████░░██─██░░██████░░████─██░░██████░░██─██░░██████████─██░░██████████─');
//     console.log('─██░░██──██░░██─██░░░░░░░░░░██─────██░░██─────██░░░░░░░░░░██─██░░░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─██░░██──██░░██─██░░██████░░██─────██░░██─────██░░██████░░██─██░░████████░░██─██░░██████░░██─██████████░░██─██░░██████████─');
//     console.log('─██░░██──██░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░██────██░░██─██░░██──██░░██─────────██░░██─██░░██─────────');
//     console.log('─██░░████░░░░██─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░████████░░██─██░░██──██░░██─██████████░░██─██░░██████████─');
//     console.log('─██░░░░░░░░████─██░░██──██░░██─────██░░██─────██░░██──██░░██─██░░░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─');
//     console.log('─████████████───██████──██████─────██████─────██████──██████─████████████████─██████──██████─██████████████─██████████████─');
//     console.log('───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────');
// }
// wordart();

//function that gives the user the option of being able to 


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
                    appMenu();
                });

                break;
            case 'View all Roles':
                //query to show the roles table 
                db.query('SELECT role.id, role.title, role.salary, department.nameof FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
                    console.table(results);
                    if (err) {
                        console.log(err);
                    }
                    appMenu();
                });
                //showRoles();
                break;
            case 'View all Employees':
                // query to show the employees with role and manager and salary included 
                db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.nameof AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
                    console.table(results);
                    if (err) {
                        console.log(err);
                    }
                    appMenu();
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
                updateEmployee();
                console.log("Update an employee");
                break;
            default:
                console.log("Bye");
                return;
        }
    });
}
appMenu();

//function where we update the Employee
// function should be done 
function updateEmployee() {
    db.query('SELECT * FROM employee', function (err, results) {
        const employee = results.map(({ id, first_name, last_name }) => (
            {
                value: id,
                name: `${first_name} ${last_name}`
            }
        ));
        db.query('SELECT * FROM role', function (err, results) {
            const roles = results.map(({ id, title }) => (
                {
                    value: id,
                    name: `${title}`
                }
            ))
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
                        choices: roles
                    }
                ]).then(function (answers) {
                    console.log(answers)
                    //where we query the database to update the role of the employee
                    db.query(`UPDATE employee SET role_id WHERE id = ? LEFT JOIN role ON employee.role_id`, (answers.role_id, answers.employee_id), function (err, results) {
                        console.table('you have successfully updated your employee');
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(results);
                        }
                    })

                });
        })
    })
}

//uses a map function to create a role 
//This function should be done 
function createRole() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        } 
            const department = results.map(({ id, nameof }) => (
                {
                    value: id,
                    name: `${nameof}`
                }
            ))
        inquirer.prompt([
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
                choices: department

            }
        ]).then(function (answers) {
            //const { title, salary, department } = answers;
            console.log(answers);
            //query to populate the role table with the role data that the user inputs
            //There is going to be an error here because the answers gives a string for department but we need the department_id which is an INT 
            const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, "${answers.department}");`;
            db.query(sql, function (err, results) {
                console.log(answers.title);
                console.table(results);
                if (err) {
                    console.log(err)
                } else {
                    console.log(`You have successfully added ${title} in your database.`)
                }
            });
            appMenu();
        });
    });
};

//function that creates employee
function createEmployee() {
    db.query('SELECT * FROM role', function (err, results) {
        const roles = results.map(({ id, title }) => (
            {
                value: id,
                name: `${title}`
            }
        ))
        db.query('SELECT * FROM employee', function (err, results) {
            const employees = results.map(({ id, first_name, last_name }) => (
                {
                    value: id,
                    name: `${first_name} ${last_name}`
                }
            ))
            inquirer.prompt([
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
                    choices: roles

                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    choices: employees
                }
            ]).then(function (answers) {
                const sqlquery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.firstName}", ${answers.lastName}, "${answers.role}, ${answers.manager}");`;
                db.query(sqlquery, function(err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(answers);
                    appMenu();
                });
            });

        });
    });
};

//function to create a department in the department table. 
//function should be finished
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
            db.query('INSERT INTO department (nameof) VALUES (?)', [newDept.name], function (err, results) {
                console.table(results);
                if (err) {
                    console.log(err);
                } else {
                    console.log(`You have added ${newDept.name} into your database`);
                }
                appMenu();
            })
        });
}

function showRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.nameof FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
        if (err) {
            console.log(err);
        }
        appMenu();
    });
}