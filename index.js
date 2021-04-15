//Imported classes
const Department = require('./develop/department');
const Role = require('./develop/role');
const Employee = require('./develop/employee');

//Require statements
const inquirer = require('inquirer');
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
});
connection.query('drop table role', function (error, results, fields) {
  if (error) throw error;
});
connection.query('drop table department', function (error, results, fields) {
  if (error) throw error;
});

//Creates new tables
connection.query('create table department (id int not null, name varchar(30), primary key (id))', function (error, results, fields) {
  if (error) throw error;
});
connection.query('create table role (id int not null, title varchar(30), salary decimal, department_id int, primary key (id))', function (error, results, fields) {
  if (error) throw error;
});
connection.query('create table employee (id int not null, first_name varchar(30), last_name varchar(30), role_id int, manager_id int, primary key (id))', function (error, results, fields) {
  if (error) throw error;
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

//Roles added to database
connection.query(`insert into role (id, title, salary, department_id) values (${engineer.id}, '${engineer.title}', ${engineer.salary}, ${engineer.department_id})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into role (id, title, salary, department_id) values (${intern.id}, '${intern.title}', ${intern.salary}, ${intern.department_id})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into role (id, title, salary, department_id) values (${manager.id}, '${manager.title}', ${manager.salary}, ${manager.department_id})`, function (error, results, fields) {
  if (error) throw error;
});

//Employees added to database
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${dalton.id}, '${dalton.first_name}', '${dalton.last_name}', ${dalton.role_id}, ${dalton.manager_id})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${barb.id}, '${barb.first_name}', '${barb.last_name}', ${barb.role_id}, ${barb.manager_id})`, function (error, results, fields) {
  if (error) throw error;
});
connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${steve.id}, '${steve.first_name}', '${steve.last_name}', ${steve.role_id}, ${steve.manager_id})`, function (error, results, fields) {
  if (error) throw error;
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
          connection.end();
        break;
      }
  })
}

//View all departments
function viewAllDept() {
  connection.query('select * from department', function (error, results, fields) {
    if (error) throw error;
    console.table('Departments:', results);
  });
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
  
  // connection.query('select * from role', function (error, results, fields) {
  //   if (error) throw error;
  //   console.table('Roles:', results);
  // });
  connection.query("SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id", function (error, results, fields) {
    if (error) throw error;
    console.table('Roles:', results);
  });

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

  // connection.query('select * from employee', function (error, results, fields) {
  //   if (error) throw error;
  //   console.table('Employees:', results);
  // });
  connection.query("SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS role FROM employee JOIN role ON employee.role_id = role.id", function (error, results, fields) {
    if (error) throw error;
    console.table('Employees:', results);
    // console.log(results);
  });

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
      for (let k = 0; k < roles.length; k++) {
        if (employees[j].role === roles[k].id && roles[k].department === departments[i].id) {
            console.log(employees[j].firstName + ' ' + employees[j].lastName);
        }
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
  let managers = [];
  employees.forEach(i => {
      if (i.role === roles[2].id) {
        managers.push(i);
      }
  })

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

  let managers = [];
  employees.forEach(i => {
      if (i.role_id === roles[2].id) {
        managers.push(i.first_name + ' ' + i.last_name);
      }
  })

  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?',
      validate: stringValidator,
    },
    {
      type: 'input',
      name: 'last_name',
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
      if (employees[j].first_name + ' ' + employees[j].last_name === answers.manager) {
        chosenManager = employees[j].id;
      }
    }

    let newEmployee = new Employee(Math.floor(Math.random() * 10000), answers.first_name, answers.last_name, getRole, chosenManager);
    console.log(newEmployee);

    connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${newEmployee.id}, '${newEmployee.first_name}', '${newEmployee.last_name}', ${newEmployee.role_id}, ${newEmployee.manager_id})`, function (error, results, fields) {
      if (error) throw error;
    });

    // employees.push(newEmployee);
    // console.log(newEmployee);
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

function init() {
  starterPrompt()
};

init();
