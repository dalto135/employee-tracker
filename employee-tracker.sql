drop database if exists employee_trackerdb;
create database employee_trackerdb;
use employee_trackerdb;

create table department (
	id int not null,
	name varchar(30),
    primary key (id)
);
create table role (
	id int not null,
	title varchar(30),
    salary decimal,
    department_id int,
	primary key (id)
);
create table employee (
	id int not null,
	first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
);

insert into department (id, name) values (234, 'Dalton');
select * from department;

insert into role (id, title, salary, department_id) values (555, 'Engineer', 75000, 234);
select * from role;

insert into employee (id, first_name, last_name, role_id, manager_id) values (111, 'Dalton', 'Wilkins', 555, 0);
select * from employee;

delete from employee where id = 111;
select * from employee;