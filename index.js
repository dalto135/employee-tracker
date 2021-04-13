//Global variables
// const Manager = require('./lib/manager');
// const Engineer = require('./lib/engineer');
// const Intern = require('./lib/intern');
// const emailValidatorRegex = require("email-validator");
//npm i email-validator

let departments = [
  {
    id: Math.random(),
    name: 'Marketing'
  },
  {
    id: Math.random(),
    name: 'Finance',
  },
];

let roles = [
  {
    id: Math.random(),
    title: 'Engineer',
    salary: 75000.00,
    department: departments[0],
  }, 
  {
    id: Math.random(),
    title: 'Intern',
    salary: 75000.00,
    department: departments[1],
  },
];

let managers = ['Barb Walters', 'Alex Bog'];

let employees = [
  {
    id: Math.random(),
    firstname: 'Dalton',
    lastname: 'Wilkins',
    role: roles[0],
    manager: managers[0],
  },
  {
    id: Math.random(),
    firstname: 'Steve',
    lastname: 'Steverson',
    role: roles[1],
    manager: managers[1],
  },
];

const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const stringValidator = async (input) => {
  const nameValid = /^[A-Za-z]+$/.test(input);
  if (!nameValid) {
    return 'Input must only contain letters'; 
  }
  return true;
};
const numberValidator = async (input) => {
  const idValid = /^[0-9]+$/.test(input);
  if (!idValid) {
    return 'Input must only contain numbers'; 
  }
  return true;
};

function starterPrompt() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee',
    'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Exit'],
    },
  ])
  .then(answers => {
      switch(answers.start) {
        case 'View All Employees':
          viewAll()
          // .catch(function(err) {
          //   console.error(err);
          // });
        break;
        case 'View All Employees By Department':
          viewAllByDept()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'View All Employees By Manager':
          viewAllByManager()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'Add Employee':
          addEmployee()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'Remove Employee':
          removeEmployee()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'Update Employee Role':
          updateRole()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'Update Employee Manager':
          updateManager()
          .catch(function(err) {
            console.error(err);
          });
        break;
        case 'View All Roles':
          viewAllRoles()
          .catch(function(err) {
            console.error(err);
          });
        break;
        default:
          // writeFileAsync('dist/index.html', generateHTML());
          // console.log('Wrote to index.html');
        break;
      }
  })
}

//View all employees
function viewAll() {
  let names = [];
  employees.forEach(i =>
    names.push(i.firstname + ' ' + i.lastname)
  )
  names.forEach(i => 
    console.log(i)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'return',
      message: 'Hit enter to return home',
      choices: [''],
    },
  ])
  .then(answers => {
    switch(answers.return) {
      default:
        starterPrompt()
      break;
    }
  })
}

//View all employees by department
function viewAllByDept() {
  employees.forEach(i =>
    console.log(i)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'return',
      message: 'Hit enter to return home',
      choices: [''],
    },
  ])
  .then(answers => {
    switch(answers.return) {
      default:
        starterPrompt()
      break;
    }
  })
}

//View all employees by manager
function viewAllByManager() {
  employees.forEach(i =>
    console.log(i)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'return',
      message: 'Hit enter to return home',
      choices: [''],
    },
  ])
  .then(answers => {
    switch(answers.return) {
      default:
        starterPrompt()
      break;
    }
  })
}

//Add employees
function addEmployee() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'firstname',
      message: "What is the employee's first name?",
      validate: stringValidator,
    },
    {
      type: 'input',
      name: 'lastname',
      message: "What is the employee's last name?",
      validate: stringValidator,
    },
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's role?",
      choices: roles,
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: managers,
    },
  ])
  .then(answers => {
    let newEmployee = {
      id: Math.random(),
      firstName: answers.firstname,
      lastName: answers.lastname,
      role: answers.role,
      manager: answers.manager,
    };
    employees.push(newEmployee);

    starterPrompt()
    .catch(function(err) {
        console.error(err);
    });
  })
}

//Remove employees
function removeEmployee() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'remove',
      message: 'Which employee do you want to remove?',
      choices: ['hello', 'world'],
    },
  ])
}

//Update role
function updateRole() {
  

  let roleTitles = [];
  employees.forEach(i =>
    roleTitles.push(i.firstname + ' ' + i.lastname)
  )
  roleTitles.forEach(i => 
    console.log(i)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: "Choose an employee",
      choices: employeeNames,
    },
    {
      type: 'list',
      name: 'role',
      message: "What is the employee's new role?",
      choices: roleTitles,
    },
  ])
  .then(answers => {
    let getEmployee;
    let employeeIds = [];
    employees.forEach(i =>
      employeeIds.push(i.id)
    )
    employeeNames.forEach(i => 
      console.log(i)
    )


  let employeeNames = [];
  employees.forEach(i =>
    employeeNames.push(i.firstname + ' ' + i.lastname)
  )
  employeeNames.forEach(i => 
    console.log(i)
  )
  })
}

//Update manager
function updateManager() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'firstname',
      message: "What is the employee's first name?",
      choices: managers,
    },
  ])
}

//View all roles
function viewAllRoles() {
  let names = [];
  roles.forEach(i =>
    names.push(i.title)
  )
  names.forEach(i => 
    console.log(i)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'roles',
      message: 'Hit enter to return home',
      choices: [''],
    },
  ])
  .then(answers => {
    switch(answers.roles) {
      default:
        starterPrompt()
      break;
    }
  })
}

const generateHTML = () =>
`
<!DOCTYPE html>
<html>
    <head>
        <title>My Team</title>
        <link rel="stylesheet" href="reset.css"/>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <header>
            <h1>My Team</h1>
        </header>

        <section id="teammanager">
            <h2>Team Manager</h2>
            ${managerDiv}
            
            
        </section>

        <section id="employees">
            <section id="engineers">
                <h2>Engineers</h2>
                <section>
                  ${engineerDiv}
                </section>
                
            </section>
    
            <section id="interns">
                <h2>Interns</h2>
                <section>
                  ${internDiv}
                </section>
                
            </section>
        </section>

    </body>
</html>
`;

function init() {
  starterPrompt()
    .catch(function(err) {
        console.error(err);
    });
};

init();
