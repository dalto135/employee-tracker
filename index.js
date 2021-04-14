//Imported classes
const Department = require('./develop/department');
const Role = require('./develop/role');
const Employee = require('./develop/employee');

const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const cTable = require('console.table');

//mysql functionality
const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'biscuitbill',
  database : 'employee_trackerdb'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

//Clears database
connection.query('drop table employee', function (error, results, fields) {
  if (error) throw error;
  console.log('Employee Table Dropped');
});
connection.query('drop table role', function (error, results, fields) {
  if (error) throw error;
  console.log('Role Table Dropped');
});
connection.query('drop table department', function (error, results, fields) {
  if (error) throw error;
  console.log('Department Table Dropped');
});

//Creates new tables
connection.query('create table department (id int not null, name varchar(30), primary key (id))', function (error, results, fields) {
  if (error) throw error;
  console.log('Department Table Created');
});
connection.query('create table role (id int not null, title varchar(30), salary decimal, department_id int, primary key (id))', function (error, results, fields) {
  if (error) throw error;
  console.log('Role Table Created');
});
connection.query('create table employee (id int not null, first_name varchar(30), last_name varchar(30), role_id int, manager_id int, primary key (id))', function (error, results, fields) {
  if (error) throw error;
  console.log('Employee Table Created');
});

//Department, Role and Employee objects created using imported classes
let marketing = new Department(Math.floor(Math.random() * 10000), 'Marketing');
let finance = new Department(Math.floor(Math.random() * 10000), 'Finance');
let management = new Department(Math.floor(Math.random() * 10000), 'Management');
let departments = [marketing, finance, management];

let engineer = new Role(Math.floor(Math.random() * 10000), 'Engineer', 75000.00, departments[0].id);
let intern = new Role(Math.floor(Math.random() * 10000), 'Intern', 75000.00, departments[1].id);
let manager = new Role(Math.floor(Math.random() * 10000), 'Manager', 75000.00, departments[2].id);
let roles = [engineer, intern, manager];

let dalton = new Employee(Math.floor(Math.random() * 10000), 'Dalton', 'Wilkins', roles[2].id, Math.floor(Math.random() * 10000));
let barb = new Employee(Math.floor(Math.random() * 10000), 'Barb', 'Walters', roles[0].id, dalton.id);
let steve = new Employee(Math.floor(Math.random() * 10000), 'Steve', 'Steverson', roles[1].id, dalton.id);
let employees = [dalton, barb, steve];

//Departments added to database
connection.query(`insert into department (id, name) values (${marketing.id}, '${marketing.name}')`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into department (id, name) values (${finance.id}, '${finance.name}')`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into department (id, name) values (${management.id}, '${management.name}')`, function (error, results, fields) {
  if (error) throw error;
});

connection.query('select * from department', function (error, results, fields) {
  if (error) throw error;
  console.table('Department Table: ', results);
});

//Roles added to database
connection.query(`insert into role (id, title, salary, department_id) values (${engineer.id}, '${engineer.title}', ${engineer.salary}, ${engineer.department})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into role (id, title, salary, department_id) values (${intern.id}, '${intern.title}', ${intern.salary}, ${intern.department})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into role (id, title, salary, department_id) values (${manager.id}, '${manager.title}', ${manager.salary}, ${manager.department})`, function (error, results, fields) {
  if (error) throw error;
});

connection.query('select * from role', function (error, results, fields) {
  if (error) throw error;
  console.table('Role Table: ', results);
});

//Employees added to database
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${dalton.id}, '${dalton.firstName}', '${dalton.lastName}', ${dalton.role}, ${dalton.manager})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${barb.id}, '${barb.firstName}', '${barb.lastName}', ${barb.role}, ${barb.manager})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${steve.id}, '${steve.firstName}', '${steve.lastName}', ${steve.role}, ${steve.manager})`, function (error, results, fields) {
  if (error) throw error;
});

connection.query('select * from employee', function (error, results, fields) {
  if (error) throw error;
  console.table('Employee Table: ', results);
});

//Validates user input for strings and ints
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

//Prompts
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
  departments.forEach(i => 
    console.log(i.name)
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
  roles.forEach(i => 
    console.log(i.title)
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
  employees.forEach(i => 
    console.log(i.firstName + ' ' + i.lastName)
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
      // let theRole;
      // roles.forEach(i => {
      //     if (i.id === employees[j].role) {
      //         theRole = i.id;
      //     }
      // })
      for (let k = 0; k < roles.length; k++) {
        if (employees[j].role === roles[k].id && roles[k].department === departments[i].id) {
            console.log(employees[j].firstName + ' ' + employees[j].lastName);
        }
      }
      
      // if (employees[j].role.department === departments[i].id) {
      // }
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
  let managers = [];
  employees.forEach(i => {
      if (i.role === roles[2].id) {
        managers.push(i);
      }
  })
  // console.log(managers);

  for (let i = 0; i < managers.length; i++) {
    console.log(managers[i].firstName + ' ' + managers[i].lastName + ':');

    for (let j = 0; j < employees.length; j++) {
      if (employees[j].manager === managers[i].id) {
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
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the department\'s name?',
      validate: stringValidator,
    },
  ])
  .then(answers => {
    let newDepartment = new Department(Math.random(), answers.name);
    departments.push(newDepartment);
    console.log(departments);
    starterPrompt()
  })
}

//Add roles
function addRole() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?',
      validate: stringValidator,
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?',
      validate: numberValidator,
    },
    {
      type: 'list',
      name: 'department',
      message: 'What is the department of the role?',
      choices: departments,
    },
  ])
  .then(answers => {
    let departmentId;
    for (let i = 0; i < departments.length; i++) {
      if (answers.department === departments[i].name) {
        departmentId = departments[i].id
      }
    }

    let newRole = new Role(Math.random(), answers.title, parseInt(answers.salary), departmentId);
    roles.push(newRole);
    console.log(roles);
    starterPrompt()
  })
}

//Add employees
function addEmployee() {
  let roleTitles = [];
  roles.forEach(i =>
    roleTitles.push(i.title)
  )
  // roleTitles.forEach(i => 
  //   console.log(i)
  // )
  let managers = [];
  employees.forEach(i => {
      if (i.role === roles[2].id) {
        managers.push(i.firstName + ' ' + i.lastName);
      }
  })

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
        getRole = roles[i].id;
      }
    }

    let chosenManager;
    for (let j = 0; j < employees.length; j++) {
      if (employees[j].firstName + ' ' + employees[j].lastName === answers.manager) {
        chosenManager = employees[j].id;
      }
    }

    // let newEmployee = {
    //   id: Math.random(),
    //   firstName: answers.firstname,
    //   lastName: answers.lastname,
    //   role: getRole,
    //   manager: answers.manager,
    // };

    let newEmployee = new Employee(Math.random(), answers.firstname, answers.lastname, getRole, chosenManager);
    employees.push(newEmployee);
    console.log(newEmployee);
    starterPrompt()
  })
}

//Remove departments
function removeDept() {
  let deptNames = [];
  departments.forEach(i =>
    deptNames.push(i.name)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'What is the department\'s name?',
      choices: deptNames
    },
  ])
  .then(answers => {
    let newDepts = [];
    departments.forEach(i => {
      if (i.name !== answers.department) {
        newDepts.push(i);
      }
    })
    departments = newDepts;
    starterPrompt()
  })
}

//Remove roles
function removeRole() {
  let roleTitles = [];
  roles.forEach(i =>
    roleTitles.push(i.title)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is the role title?',
      choices: roleTitles
    },
  ])
  .then(answers => {
    let newRoles = [];
    roles.forEach(i => {
      if (i.title !== answers.role) {
        newRoles.push(i);
      }
    })
    roles = newRoles;
    starterPrompt()
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
  let deptNames = [];
  departments.forEach(i =>
    deptNames.push(i.name)
  )
  return inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'What is the department\'s name?',
      choices: deptNames
    },
  ])
  .then(answers => {
    let budget = 0;
    let dept;
    departments.forEach(i => {
        if (i.name === answers.department) {
          dept = i;
        }
    })

    employees.forEach(i =>
      roles.forEach(j => {
          if (i.role === j.id) {
            if (j.department === dept.id) {
              budget += j.salary;
            }
          }

      })
    )
    console.log('$' + budget);
    starterPrompt()
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
connection.end();
