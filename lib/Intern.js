const Employee = require('./Employee');

class Intern extends Employee {
    constructor(id, name, email, role, school) {
        super(id, name, email, role)
        this.school = school;
    }

}


module.exports = Intern;