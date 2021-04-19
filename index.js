//Imported classes
const Department = require('./assets/department');
const Role = require('./assets/role');
const Employee = require('./assets/employee');

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

//Departments
let management = new Department(Math.floor(Math.random() * 10000), 'Management');
let marketing = new Department(Math.floor(Math.random() * 10000), 'Marketing');
let finance = new Department(Math.floor(Math.random() * 10000), 'Finance');
let departments = [management, marketing, finance];

//Roles
let manager = new Role(Math.floor(Math.random() * 10000), 'Manager', 75000.00, departments[0].id);
let engineer = new Role(Math.floor(Math.random() * 10000), 'Engineer', 75000.00, departments[1].id);
let coder = new Role(Math.floor(Math.random() * 10000), 'Coder', 420069.69, departments[1].id);
let intern = new Role(Math.floor(Math.random() * 10000), 'Intern', 75000.00, departments[2].id);
let architect = new Role(Math.floor(Math.random() * 10000), 'Architect', 75000.00, departments[2].id);
let roles = [manager, engineer, coder, intern, architect];

//Managers
let managerId = Math.floor(Math.random() * 10000);
let dalton = new Employee(managerId, 'Dalton', 'Wilkins', roles[0].id, null);
let james = new Employee(Math.floor(Math.random() * 10000), 'James', 'Burns', roles[0].id, managerId);
let kyle = new Employee(Math.floor(Math.random() * 10000), 'Kyle', 'Claassen', roles[0].id, managerId);
let woody = new Employee(Math.floor(Math.random() * 10000), 'Woody', 'Walton', roles[0].id, managerId);

//Employees
let barb = new Employee(Math.floor(Math.random() * 10000), 'Barb', 'Walters', roles[1].id, dalton.id);
let steve = new Employee(Math.floor(Math.random() * 10000), 'Steve', 'Steverson', roles[1].id, dalton.id);
let josh = new Employee(Math.floor(Math.random() * 10000), 'Josh', 'Johnson', roles[2].id, james.id);
let alison = new Employee(Math.floor(Math.random() * 10000), 'Alison', 'Wonderland', roles[2].id, james.id);
let bob = new Employee(Math.floor(Math.random() * 10000), 'Bob', 'Roberts', roles[3].id, kyle.id);
let alex = new Employee(Math.floor(Math.random() * 10000), 'Alex', 'Anderson', roles[3].id, kyle.id);
let david = new Employee(Math.floor(Math.random() * 10000), 'David', 'Smith', roles[4].id, woody.id);
let caitlyn = new Employee(Math.floor(Math.random() * 10000), 'Caitlyn', 'Springfield', roles[4].id, woody.id);
let employees = [dalton, james, kyle, woody, barb, steve, josh, alison, bob, alex, david, caitlyn];

//Inserts data into SQL database
departments.forEach(i => {
  connection.query(`insert into department (id, name) values (${i.id}, '${i.name}')`, function (error, results, fields) {
    if (error) throw error;
  });
})

roles.forEach(i => {
  connection.query(`insert into role (id, title, salary, department_id) values (${i.id}, '${i.title}', ${i.salary}, ${i.department_id})`, function (error, results, fields) {
    if (error) throw error;
  });
})

employees.forEach(i => {
  connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${i.id}, '${i.first_name}', '${i.last_name}', ${i.role_id}, ${i.manager_id})`, function (error, results, fields) {
    if (error) throw error;
  });
})

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
    starterPrompt();
  })
}
//View all roles
function viewAllRoles() {
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
// function viewAll() {
//   connection.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN employee AS manager ON manager.id = employee.manager_id`, function (error, results, fields) {
//     if (error) throw error;
//     console.table('Employees:', results);
//   });

//   return inquirer.prompt([
//     {
//       type: 'list',
//       name: 'return',
//       message: 'Hit enter to return home',
//       choices: [''],
//     },
//   ])
//   .then(answers => {
//     starterPrompt()
//   })
// }

function viewAll() {
  connection.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id AS manager_id FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id`, function (error, results, fields) {
  if (error) throw error;
    console.table('Employees:', results);
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

// function viewAll() {
//   connection.query(`select employee.manager_id AS manager_id from employee WHERE EXITS (select concat(manager.first_name, ' ', manager.last_name) AS manager from employee INNER JOIN manager ON employee.manager_id)`, function (error, results, fields) {
//     if (error) throw error;
//     console.table('Employees:', results);
//   });

//   return inquirer.prompt([
//     {
//       type: 'list',
//       name: 'return',
//       message: 'Hit enter to return home',
//       choices: [''],
//     },
//   ])
//   .then(answers => {
//     starterPrompt()
//   })
// }

//View all employees by department
function viewAllByDept() {
  connection.query("SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN employee AS manager ON manager.id = employee.manager_id ORDER BY department.name ASC", function (error, results, fields) {
    if (error) throw error;
    console.table('Employees by Department:', results);
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
    starterPrompt();
  })
}

//View all employees by manager
function viewAllByManager() {
  connection.query("SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN employee AS manager ON manager.id = employee.manager_id ORDER BY employee.manager_id ASC", function (error, results, fields) {
    if (error) throw error;
    console.table('Employees by Manager:', results);
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
    starterPrompt();
  })
}

//Add department
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
    let newDepartment = new Department(Math.floor(Math.random() * 10000), answers.name);

    connection.query(`insert into department (id, name) values (${newDepartment.id}, '${newDepartment.name}')`, function (error, results, fields) {
      if (error) throw error;
    });
    starterPrompt()
  })
}

//Add role
function addRole() {
  connection.query('select * from department', function (error, results, fields) {
    if (error) throw error;

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
        choices: results,
      },
    ])
    .then(answers => {
      let departmentId;
      connection.query(`select id from department where department.name = '${answers.department}'`, function (error, results, fields) {
        if (error) throw error;
        departmentId = results[0].id;   

        let newRole = new Role(Math.floor(Math.random() * 10000), answers.title, parseInt(answers.salary), departmentId);

        connection.query(`insert into role (id, title, salary, department_id) values (${newRole.id}, '${newRole.title}', ${newRole.salary}, ${newRole.department_id})`, function (error, results, fields) {
          if (error) throw error;
        });
      })
      starterPrompt();
    });
  });
}

//Add employee
function addEmployee() {
  let roleTitles = [];
  connection.query('select * from role', function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      roleTitles.push(results[i].title);
    }
  
    // let managers = [];
    let employeeNames = [];  
    connection.query(`select * from employee`, function (error, results, fields) {
      if (error) throw error;
      for (let i = 0; i < results.length; i++) {
        employeeNames.push(results[i].first_name + ' ' + results[i].last_name);
      }
      employeeNames.push('None');

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
          choices: employeeNames,
        },
      ])
      .then(answers => {
        let getRole;
        connection.query(`select * from role where title = '${answers.role}'`, function (error, results, fields) {
          if (error) throw error;
          getRole = results[0].id;

          let chosenManager;
          connection.query(`select * from employee`, function (error, results, fields) {
            if (error) throw error;
            if (answers.manager === 'None') {
              chosenManager = null;
            } else {
              for (let i = 0; i < results.length; i++) {
                if (employeeNames[i] === answers.manager) {
                  chosenManager = results[i].id;
                }
              }
            }
              
            let newEmployee = new Employee(Math.floor(Math.random() * 10000), answers.first_name, answers.last_name, getRole, chosenManager);

            connection.query(`insert into employee (id, first_name, last_name, role_id, manager_id) values (${newEmployee.id}, '${newEmployee.first_name}', '${newEmployee.last_name}', ${newEmployee.role_id}, ${newEmployee.manager_id})`, function (error, results, fields) {
              if (error) throw error;
            });
          })
        });
        starterPrompt();
      });
    });
  });
}

//Remove department
function removeDept() {
  connection.query(`select * from department`, function (error, results, fields) {
    if (error) throw error;
    let deptNames = [];
    for (let i = 0; i < results.length; i++) {
      deptNames.push(results[i].name);
    }
    
    return inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'What is the department\'s name?',
        choices: deptNames
      },
    ])
    .then(answers => {
      let deptId;
      connection.query(`select * from department`, function (error, results, fields) {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
          if (deptNames[i] === answers.department) {
            deptId = results[i].id;
          }
        }

        connection.query(`delete from department where id = ${deptId}`, function (error, results, fields) {
          if (error) throw error;
        });
      })
      starterPrompt();
    });
  });
}

//Remove role
function removeRole() {
  let roleTitles = [];
  connection.query(`select title from role`, function (error, results, fields) {
    if (error) throw error;
    results.forEach(i =>
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
      connection.query(`select * from role`, function (error, results, fields) {
        if (error) throw error;
        let chosenRole;
        for (let i = 0; i < results.length; i++) {
          if (roleTitles[i] === answers.role) {
            chosenRole = results[i].id;
          }
        }

        connection.query(`delete from role where id = ${chosenRole}`, function (error, results, fields) {
          if (error) throw error;
        });
      })
      starterPrompt();
    });
  });
}

//Remove employee
function removeEmployee() {
  let employeeNames = [];

  connection.query(`select * from employee`, function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      employeeNames.push(results[i].first_name + ' ' + results[i].last_name)
    }

    return inquirer.prompt([
      {
        type: 'list',
        name: 'remove',
        message: 'Which employee do you want to remove?',
        choices: employeeNames,
      },
    ])
    .then(answers => {
      let deletedEmployee;
      connection.query(`select * from employee`, function (error, results, fields) {
        if (error) throw error;
        for (let i = 0; i < results.length; i++) {
          if (employeeNames[i] === answers.remove) {
            deletedEmployee = results[i].id;
          }
        }

        connection.query(`delete from employee where id = ${deletedEmployee}`, function (error, results, fields) {
          if (error) throw error;
        });
      })
      starterPrompt();
    });
  });
}

//Update role
function updateRole() {
  let employeeNames = [];
  connection.query('select * from employee', function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      employeeNames.push(results[i].first_name + ' ' + results[i].last_name)
    }

    let roleTitles = [];
    connection.query('select * from role', function (error, results, fields) {
      if (error) throw error;
      
      for (let i = 0; i < results.length; i++) {
        roleTitles.push(results[i].title);
      }
    });

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

      connection.query('select * from role', function (error, results, fields) {
        if (error) throw error;
        
        for (let i = 0; i < results.length; i++) {
          if (answers.role === results[i].title) {
            getRole = results[i];
          }
        }

        let chosenEmployee;
        connection.query('select * from employee', function (error, results, fields) {
          if (error) throw error;
          for (let i = 0; i < results.length; i++) {
            if (employeeNames[i] === answers.employee) {
              chosenEmployee = results[i];
            }
          }

          connection.query(`update employee set role_id = ${getRole.id} where employee.id = ${chosenEmployee.id}`, function (error, results, fields) {
            if (error) throw error;
          });
        });
      });
      starterPrompt();
    })
  });
}

//Update manager
function updateManager() {
  let employeeNames = [];
  
  connection.query('select * from employee', function (error, results, fields) {
    if (error) throw error;
    for (let i = 0; i < results.length; i++) {
      employeeNames.push(results[i].first_name + ' ' + results[i].last_name)
    }

    let managers = [];
    connection.query(`select * from employee`, function (error, results, fields) {
      if (error) throw error;
      for (let i = 0; i < results.length; i++) {
        managers.push(results[i].first_name + ' ' + results[i].last_name);
      }
      managers.push('None');

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
        let chosenEmployee;
        let chosenManager;
        connection.query('select * from employee', function (error, results, fields) {
          if (error) throw error;
          for (let i = 0; i < results.length; i++) {
            if (employeeNames[i] === answers.employee) {
              chosenEmployee = results[i].id;
            }
          }
          connection.query(`select * from employee`, function (error, results, fields) {
            if (error) throw error;
            if (answers.manager === 'None') {
              chosenManager = null;
              console.log(chosenManager);
            } else {
              for (let i = 0; i < results.length; i++) {
                if (managers[i] === answers.manager) {
                  chosenManager = results[i].id;
                }
              }
            }
              
            connection.query(`update employee set manager_id = ${chosenManager} where employee.id = ${chosenEmployee}`, function (error, results, fields) {
              if (error) throw error;
                
            })
          });
        });
        starterPrompt();
      });
    });
  });
}

//View utilized budget of a department
function viewBudget() {
  connection.query(`select * from department`, function (error, results, fields) {
    if (error) throw error;
    
    return inquirer.prompt([
      {
        type: 'list',
        name: 'department',
        message: 'What is the department\'s name?',
        choices: results
      },
    ])
    .then(answers => {
      connection.query(`select id from department where name = '${answers.department}'`, function (error, results, fields) {
        if (error) throw error;
        let deptId = results[0].id;

        connection.query(`select * from role where department_id = ${deptId}`, function (error, results, fields) {
          if (error) throw error;
          let deptRoles = results;

          let totalBudget = 0;
        
          connection.query(`select * from employee`, function (error, results, fields) {
            if (error) throw error;
            for (let i = 0; i < results.length; i++) {
              for (let j = 0; j < deptRoles.length; j++) {
                if (results[i].role_id === deptRoles[j].id) {
                  totalBudget += deptRoles[j].salary;
                }
              }
            }
            console.log('Total Budget: $' + totalBudget);

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
          })
        });
      });
    });
  });
}

starterPrompt();
