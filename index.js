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
    firstName: 'Dalton',
    lastName: 'Wilkins',
    role: roles[0],
    manager: managers[0],
  },
  {
    id: Math.random(),
    firstName: 'Steve',
    lastName: 'Steverson',
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
    names.push(i.firstName + ' ' + i.lastName)
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
    // switch(answers.return) {
    //   default:
    //     starterPrompt()
    //   break;
    // }
    starterPrompt()
  })
}

//View all employees by department
function viewAllByDept() {
  for (let i = 0; i < departments.length; i++) {
    console.log(departments[i].name + ':');

    for (let j = 0; j < employees.length; j++) {
      if (employees[j].role.department === departments[i]) {
        console.log(employees[j].firstName + ' ' + employees[j].lastName);
      }
    }
    console.log();
  }

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
  for (let i = 0; i < managers.length; i++) {
    console.log(managers[i] + ':');

    for (let j = 0; j < employees.length; j++) {
      if (employees[j].manager === managers[i]) {
        console.log(employees[j].firstName + ' ' + employees[j].lastName);
      }
    }
    console.log();
  }

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
  let roleTitles = [];
  roles.forEach(i =>
    roleTitles.push(i.title)
  )
  roleTitles.forEach(i => 
    console.log(i)
  )

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
      choices: roleTitles,
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's manager?",
      choices: managers,
    },
  ])
  .then(answers => {
    let getRole;

    for (let i = 0; i < roles.length; i++) {
      if (roleTitles[i] === answers.role) {
        getRole = roles[i];
        // console.log('getRole: ' + getRole);
      }
    }


    let newEmployee = {
      id: Math.random(),
      firstName: answers.firstname,
      lastName: answers.lastname,
      role: getRole,
      manager: answers.manager,
    };
    employees.push(newEmployee);
    console.log(newEmployee);
    console.log(newEmployee.role.title);

    starterPrompt()
    .catch(function(err) {
        console.error(err);
    });
  })
}

//Remove employees
function removeEmployee() {
  let employeeNames = [];
  employees.forEach(i =>
    employeeNames.push(i.firstName + ' ' + i.lastName)
  )

  return inquirer.prompt([
    {
      type: 'list',
      name: 'remove',
      message: 'Which employee do you want to remove?',
      choices: employeeNames,
    },
  ])
  .then(answers => {
    let newList = [];
    for (let i = 0; i < employees.length; i++) {
      if (employeeNames[i] !== answers.remove) {
        newList.push(employees[i]);
      }
    }
    employees = newList;
    console.log(employees);
    // console.log(departments[0]);
    // console.log(employees[0].role.department);

    starterPrompt();
  })
}

//Update role
function updateRole() {
  let employeeNames = [];
  employees.forEach(i =>
    employeeNames.push(i.firstName + ' ' + i.lastName)
  )

  let roleTitles = [];
  roles.forEach(i =>
    roleTitles.push(i.title)
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
    // let getEmployee;
    let getRole;

    for (let i = 0; i < roles.length; i++) {
      if (roleTitles[i] === answers.role) {
        getRole = roles[i];
      }
    }

    for (let i = 0; i < employees.length; i++) {
      if (employeeNames[i] === answers.employee) {
        employees[i].role = getRole;
      }
    }

    // switch(answers.role) {
    //   default:
    //     console.log(employees[1].role.title);
    //     starterPrompt()
    //   break;
    // }
    starterPrompt();
  })
}

//Update manager
function updateManager() {
  let employeeNames = [];
  employees.forEach(i =>
    employeeNames.push(i.firstName + ' ' + i.lastName)
  )

  // let managerNames = [];
  // managers.forEach(i =>
  //   managerNames.push(i)
  // )
  // managerNames.forEach(i => 
  //   console.log(i)
  // )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: "Choose an employee",
      choices: employeeNames,
    },
    {
      type: 'list',
      name: 'manager',
      message: "Who is the employee's new manager?",
      choices: managers,
    },
  ])
  .then(answers => {
    // let getEmployee;
    let getManager;

    for (let i = 0; i < managers.length; i++) {
      if (managers[i] === answers.manager) {
        getManager = managers[i];
      }
    }

    for (let i = 0; i < employees.length; i++) {
      if (employeeNames[i] === answers.employee) {
        employees[i].manager = getManager;
      }
    }

    switch(answers.role) {
      default:
        console.log(employees[0].manager);
        starterPrompt()
      break;
    }
  
  })
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
