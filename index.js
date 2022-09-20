const inquirer = require('inquirer'); 
const consoletable = require('console.table'); 

console.log('---------------------------')


inquirer
.prompt([
    {
    type: 'checkbox', 
    message: 'What would you like to do?', 
    name: 'userchoice',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
    }
])
