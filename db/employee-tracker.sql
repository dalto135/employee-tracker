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