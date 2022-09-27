const inquirer = require('inquirer');
const consoletable = require('console.table');
const mysql = require('mysql2');
const { devNull } = require('os');
const { brotliDecompress } = require('zlib');

//how do I call on the USE e

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

console.log('------------------------------------------')

function appMenu() {
    inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What would you like to do?',
            name: 'userchoice',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
        },
    ]).then((choice) => {
        switch (choice.userchoice) {
            case 'View all Departments':
                //query to show all Departments or query the department table 
                db.query("SELECT * from department;", function (err, results) {
                    console.table(results);
                });
                break;
            case 'View all Roles':
                //query to show the roles table 
                db.query('SELECT * from role;', function (err, results) {
                    console.table(results);
                });
                break;
            case 'View all Employees':
                // query to show the employees table 
                db.query("SELECT * from employee;", function (err, results){
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
                //query the database to update the Employee's role 
                // db.query('UPDATE employee set  ', function (err, results) {
                // console.log(results);
                // });
                break;
            default:
                console.log(working); 
                return;
        }
    });
}

function createRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'department',
                message: 'What department does this role belong to?'
            },

        ])
        .then(function (answers) {
            //query to populate the role table with the role data that the user inputs 
            //
        });
};

function createEmployee() {
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
                type: 'input',
                name: 'role',
                message: 'What is the role of the employee?'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the employees manager?'
            },
        ])
        .then(function (answers) {
            //query to populate the employee table with the role data that the user inputs 
            //db.query('SHOW ', function (err, results) {
            //console.log(results);
        });
}

function createDepartment() {
    inquirer
    .prompt ([
        {
            type:'input', 
            name:'name', 
            message: 'What is the name of the department?'
        },
    ])
    .then(function(input) {
        //query to populate the employee table with the role data that the user inputs 
        //db.query('SHOW ', function (err, results) {
        //console.log(results);
    });
}