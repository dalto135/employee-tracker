class Role {
    constructor(id, title, salary, department) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }


    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getSalary() {
        return this.salary;
    }
    getDepartment() {
        return this.department;
    }
}

module.exports = Role;