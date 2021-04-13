//Global variables
const Department = require('./develop/department');
const Role = require('./develop/role');
const Employee = require('./develop/employee');

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
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View All Employees By Department',
      'View All Employees By Manager', 'Add Department', 'Add Role', 'Add Employee', 'Remove Department',
      'Remove Role', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager',
      'View a Department\'s Utilized Budget', 'Exit'],
    },
  ])
  .then(answers => {
      switch(answers.start) {
        case 'View All Departments':
          viewAllDept()
        break;

        case 'View All Roles':
          viewAllRoles()
        break;

        case 'View All Employees':
          viewAll()
        break;

        case 'View All Employees By Department':
          viewAllByDept()
        break;

        case 'View All Employees By Manager':
          viewAllByManager()
        break;

        case 'Add Department':
          addDept()
        break;

        case 'Add Role':
          addRole()
        break;

        case 'Add Employee':
          addEmployee()
        break;

        case 'Remove Department':
          removeDept()
        break;

        case 'Remove Role':
          removeRole()
        break;

        case 'Remove Employee':
          removeEmployee()
        break;

        case 'Update Employee Role':
          updateRole()
        break;

        case 'Update Employee Manager':
          updateManager()
        break;

        case 'View a Department\'s Utilized Budget':
          viewBudget()
        break;

        default:
          // writeFileAsync('./employee-tracker.sql', generateHTML());
          // console.log('Wrote to employee-tracker.sql');
        break;
      }
  })
}

//View all departments
function viewAllDept() {
  let names = [];
  departments.forEach(i =>
    names.push(i.name)
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
    starterPrompt()
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
      name: 'return',
      message: 'Hit enter to return home',
      choices: [''],
    },
  ])
  .then(answers => {
    starterPrompt()
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
    starterPrompt();
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
    starterPrompt();
  })
}

//Add departments
function addDept() {

}

//Add roles
function addRole() {

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
      message: 'What is the employee\'s first name?',
      validate: stringValidator,
    },
    {
      type: 'input',
      name: 'lastname',
      message: 'What is the employee\'s last name?',
      validate: stringValidator,
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the employee\'s role?',
      choices: roleTitles,
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is the employee\'s manager?',
      choices: managers,
    },
  ])
  .then(answers => {
    let getRole;

    for (let i = 0; i < roles.length; i++) {
      if (roleTitles[i] === answers.role) {
        getRole = roles[i];
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

    starterPrompt()
  })
}

//Remove departments
function removeDept() {

}

//Remove roles
function removeRole() {

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
      message: 'What is the employee\'s new role?',
      choices: roleTitles,
    },
  ])
  .then(answers => {
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

    starterPrompt();
  })
}

//Update manager
function updateManager() {
  let employeeNames = [];
  employees.forEach(i =>
    employeeNames.push(i.firstName + ' ' + i.lastName)
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
      name: 'manager',
      message: 'Who is the employee\'s new manager?',
      choices: managers,
    },
  ])
  .then(answers => {
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

    starterPrompt();
  })
}

//View utilized budget of a department
function viewBudget() {

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
